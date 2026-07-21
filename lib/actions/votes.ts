"use server"

import { db } from "@/server/db"
import { revalidatePath } from "next/cache";
import { requireSession } from "./require-session";
import { isDealExpired } from "@/lib/utils";

export async function voteDealAction(dealId: string, voteValue: number) {
    // voteValue = 1 to upvote, -1 to downvote

    const sessionResult = await requireSession();
    if (!sessionResult.ok) return { error: sessionResult.error };
    const { session } = sessionResult;

    const userId = session.user.id
    
    if (voteValue !== 1 && voteValue !== -1) {
        return { error: "Недопустиме значення голосу" };
    }

    try {
        await db.transaction().execute(async (trx) => {
            const deal = await trx
                .selectFrom("deal")
                .select(["authorId", "isExpired", "expiresAt"])
                .where("id", "=", dealId)
                .executeTakeFirst()

            if(!deal) throw new Error("DEAL_NOT_FOUND")

            if (isDealExpired(deal)) throw new Error("DEAL_EXPIRED")

            const existingVote = await trx
                .selectFrom("vote")
                .selectAll()
                .where("userId", "=", userId)
                .where("dealId", "=", dealId)
                .executeTakeFirst();

            let karmaDiff = 0

            if (!existingVote) {
                await trx.insertInto("vote").values({ id: crypto.randomUUID(), userId, dealId, value: voteValue, createdAt: new Date() })
                    .execute()

                karmaDiff = voteValue
                // console.log(voteValue, "Не було голосу")

            } else if (existingVote.value === voteValue) {
                await trx.deleteFrom("vote")
                    .where("id", "=", existingVote.id)
                    .execute()

                karmaDiff = -voteValue
                // console.log(voteValue, "Був голос")
            } else {
                await trx.updateTable("vote")
                    .set({ value: voteValue })
                    .where("id", "=", existingVote.id)
                    .execute()

                karmaDiff = voteValue - existingVote.value
                // console.log(voteValue, "Поміняв голос")
            }

            if (karmaDiff !== 0) {

                await trx.updateTable("deal")
                    .set((eb) => ({ temperature: eb("temperature", "+", karmaDiff) }))
                    .where("id", "=", dealId)
                    .execute();

                if(deal.authorId !== userId) {
                    await trx.updateTable("user")
                        .set((eb) => ({
                            karma: eb("karma", "+", karmaDiff)
                        }))
                        .where("id", "=", deal.authorId)
                        .execute()
                }
            }
        })
        revalidatePath(`/deal/${dealId}`);
        return { success: true };
    } catch (error) {
        if (error instanceof Error && error.message === "DEAL_EXPIRED") {
            return { error: "Голосування за завершені знижки недоступне" };
        }
        console.error("Помилка голосування:", error);
        return { error: "Щось пішло не так" };
    }
}

export async function voteCommentAction(dealId: string, commentId: string, voteValue: number) {
    // voteValue = 1 to upvote, -1 to downvote

    const sessionResult = await requireSession();
    if (!sessionResult.ok) return { error: sessionResult.error };
    const { session } = sessionResult;

    const userId = session.user.id

    try {
        await db.transaction().execute(async (trx) => {
            const existingVote = await trx
                .selectFrom("comment_vote")
                .selectAll()
                .where("userId", "=", userId)
                .where("commentId", "=", commentId)
                .executeTakeFirst();

            if (!existingVote) {
                await trx.insertInto("comment_vote").values({ id: crypto.randomUUID(), userId, commentId, value: voteValue })
                    .execute()

            } else if (existingVote.value === voteValue) {
                await trx.deleteFrom("comment_vote")
                    .where("id", "=", existingVote.id)
                    .execute()

            } else {
                await trx.updateTable("comment_vote")
                    .set({ value: voteValue })
                    .where("id", "=", existingVote.id)
                    .execute()

            }
        })
        revalidatePath(`/deal/${dealId}`);
        return { success: true };
    } catch (error) {
        console.error("Помилка голосування:", error);
        return { error: "Щось пішло не так" };
    }
}

