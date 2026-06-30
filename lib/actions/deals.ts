"use server"

import { DealWithAuthor } from "@/app/(main)/page";
import { DB } from "@/prisma/types/types";
import { db } from "@/server/db";
import { sql, ExpressionBuilder } from "kysely";

const pageSize = 8

export type SortMode = "hot" | "new" | "discussed"

export type DealsCursor = {
    v: string | number;
    id: string;
}

export type DealsPage = {
    items: DealWithAuthor[];
    nextCursor: string | null;
}

function encodeCursor(c: DealsCursor): string {
    return Buffer.from(JSON.stringify(c)).toString("base64url");
}

function decodeCursor(s?: string | null): DealsCursor | null {
    if (!s) return null
    try {
        return JSON.parse(Buffer.from(s, "base64url").toString())
    } catch {
        return null
    }
}

export async function getDealsPage(params: {cursor?: string | null, currentUserId?: string, q: string | null, filter?: "hot" | "new" | "discussed", sort?: string, limit?: number}): Promise<DealsPage> {
    const sortMode: SortMode = params.sort === "new" || params.sort === "discussed" ? params.sort : "hot"

    const limit = params.limit ?? pageSize

    const cursor = decodeCursor(params.cursor)

    const uid = params.currentUserId ?? ""

    const q = params.q?.trim() ? params.q.trim() : null

    const relevance = sql<number>`similarity("deal"."title", ${q})`

    const createdAtMs = sql<Date>`date_trunc('milliseconds', "deal"."createdAt")`;

    const commentCount = (eb: ExpressionBuilder<DB ,"deal" | "user">) =>
        eb
            .selectFrom("comment")
            .select(eb.fn.count("id").as("count"))
            .whereRef("comment.dealId", "=", ("deal.id"));


    let query = db.selectFrom("deal")
                    .innerJoin("user", "user.id", "deal.authorId")
                    .selectAll("deal")
                    .select((eb) => [
                    "user.name as authorName", 
                    "user.image as authorImage", 
                    commentCount(eb).as("commentCount"),
                    eb.selectFrom("vote")
                        .select("vote.value")
                        .whereRef("vote.dealId", "=", ("deal.id"))
                        .where("vote.userId", "=", uid)
                        .as("userVote")
                ])
    if (q) {
        query = query.select(relevance.as("_score"))
        const like = `%${q}%`

        query = query.where((eb) => eb.or([
            eb(sql`"deal"."title"`, "ilike", like),
            eb(sql`"deal"."description"`, "ilike", like),
            eb(relevance, ">", 0.2)
        ]))
        .orderBy(relevance, "desc")
        .orderBy("deal.id", "desc")
        if (cursor) {
            const v = Number(cursor.v)
            query = query.where((eb) => 
            eb.or([
                eb(relevance, "<", v),
                eb.and([eb(relevance, "=", v), eb("deal.id", "<", cursor.id)])
            ]))
        }
    }
    else {

        switch(sortMode) {
            case "new": {
                    query = query.orderBy("deal.createdAt", "desc").orderBy("deal.id", "desc")
                    if(cursor) {
                        const v = new Date(cursor.v)
                        query = query.where((eb) => 
                            eb.or([
                                eb(createdAtMs, "<", v),
                                eb.and([eb(createdAtMs, "=", v), eb("deal.id", "<", cursor.id)])
                            ])
                    )
                }
                break;
            }
            case "discussed": {
                query = query.orderBy((eb) => commentCount(eb), "desc").orderBy("deal.id", "desc")
                if(cursor) {
                    const v = Number(cursor.v)
                    query = query.where((eb) =>
                        eb.or([
                            eb(commentCount(eb), "<", v),
                            eb.and([eb(commentCount(eb), "=", v), eb("deal.id", "<", cursor.id)])
                        ])
                    )
                }
            break;
            }
            case "hot":
            default: {
                query = query.orderBy("deal.temperature", "desc").orderBy("deal.id", "desc")
                if(cursor) {
                    const v = Number(cursor.v)
                    query = query.where((eb) =>
                        eb.or([
                            eb("deal.temperature", "<", v),
                            eb.and([
                                eb("deal.temperature", "=", v),
                                eb("deal.id", "<", cursor.id)
                            ])
                        ])
                    )
                }
                break;
            }
        }
    }
    const rows = (await query.limit(limit + 1).execute()) as DealWithAuthor[]
    const hasMore = rows.length > limit
    const items = hasMore ? rows.slice(0, limit) : rows

    let nextCursor: string | null = null
    if(hasMore && items.length > 0) {
        const last = items[items.length - 1]
        const v = 
        q 
            ? Number((last as DealWithAuthor & {_score?: number})._score ?? 0) 
            : sortMode === "new"
                ? new Date(last.createdAt as unknown as string).toISOString() 
                : sortMode === "discussed"
                    ? Number(last.commentCount ?? 0)
                    : Number(last.temperature)
        nextCursor = encodeCursor({ v, id: last.id }) 
    }
    return {items, nextCursor}
}