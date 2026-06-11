"use server"

import { Deal } from "@/prisma/types/types";
import { db } from "@/server/db";

const pageSize = 20

export type DealsCursor = {
    createdAt: string;
    id: string;
}

export type DealsPage = {
    deals: Promise<Deal[]>;
    nextCursor: DealsCursor | null;
}

export function getDealsPage({cursor, filter, sort}: {cursor?: DealsCursor, filter?: "hot" | "new" | "discussed", sort?: string}) {
    let query = db.selectFrom("deal")
                  .leftJoin
}