import DealCard from "./DealCard";
import { db } from "@/server/db";

export default async function DealsList() {
    const deals = await db.selectFrom("deal").innerJoin("user", "user.id", "deal.authorId").selectAll("deal").select((eb) => [
        "user.name as authorName",
        "user.image as authorImage",
        eb.selectFrom("comment")
            .select(eb.fn.count<number>("id").as("count"))
            .whereRef("comment.dealId", "=", ("deal.id"))
            .as("commentCount")
    ]).execute()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
            ))}
        </div>
    )
}