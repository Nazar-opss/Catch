import CommentCard from "@/components/comments/CommentCard";
import DealCard from "@/components/deals/DealCard";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabs from "@/components/profile/ProfileTabs";

import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type Params = { username: string };

export default async function UserPage({ params, searchParams }: { params: Promise<Params>; searchParams: { tab: string | "userDeals" } }) {
    const session = await auth.api.getSession({ headers: await headers() });
    const { username } = await params;
    const searchParam = await searchParams;
    console.log(searchParam)

    const user = await db
        .selectFrom("user")
        .selectAll("user")
        .where("user.username", "=", username)
        .executeTakeFirst();
    if (!user) {
        notFound();
    }

    const deals = await db.selectFrom("deal").innerJoin("user", "user.id", "deal.authorId").selectAll("deal").where("deal.authorId", "=", user.id).select((eb) => [
        "user.name as authorName",
        "user.image as authorImage",
        eb.selectFrom("comment")
            .select(eb.fn.count<number>("id").as("count"))
            .whereRef("comment.dealId", "=", ("deal.id"))
            .as("commentCount"),
        eb.selectFrom("vote")
            .select("value")
            .whereRef("vote.dealId", "=", "deal.id")
            .where("vote.userId", "=", session?.user?.id ?? "")
            .as("userVote")
    ]).execute()

    const saved = await db.selectFrom("saved_deal").innerJoin("deal", "deal.id", "saved_deal.dealId").innerJoin("user", "user.id", "deal.authorId").selectAll("deal").where("saved_deal.userId", "=", user.id).select((eb) => [
        "user.name as authorName",
        "user.image as authorImage",
        eb.selectFrom("comment")
            .select(eb.fn.count<number>("id").as("count"))
            .whereRef("comment.dealId", "=", ("deal.id"))
            .as("commentCount"),
        eb.selectFrom("vote")
            .select("value")
            .whereRef("vote.dealId", "=", "deal.id")
            .where("vote.userId", "=", session?.user?.id ?? "")
            .as("userVote")
    ]).execute();
    
    const comments = await db.selectFrom("comment").innerJoin("deal", "deal.id", "comment.dealId").innerJoin("user", "user.id", "deal.authorId").selectAll("comment").where("comment.authorId", "=", user.id).select((eb) => [
        "user.name as authorName",
        "user.image as authorImage",
        "deal.title as dealTitle",
        eb.selectFrom("comment_vote")
            .select((sqb) => sqb.fn.coalesce(sqb.fn.sum<number>("comment_vote.value"), sqb.val(0)).as("rating"))
            .whereRef("comment_vote.commentId", "=", "comment.id")
            .as("rating"),
        eb.selectFrom("vote")
            .select("value")
            .whereRef("vote.dealId", "=", "deal.id")
            .where("vote.userId", "=", session?.user?.id ?? "")
            .as("userVote")
    ]).execute();

    console.log(saved)
    console.log(comments)

    let content: (typeof deals[number] | typeof comments[number])[] = deals;
    switch (searchParam.tab) {
        case "userBookmarks":
            content = saved;
            break;
        case "userComments":
            content = comments;
            break;
    }

    const profileId = user.id;
    const isOwnProfile = session?.user?.id === profileId;

    console.log(isOwnProfile)

    // Make profile tabs content dynamic, by fetching, and use it in wrapper component

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-28">
                    <ProfileCard user={user} isOwnProfile={isOwnProfile} />
                </aside>
                <div className="flex-1 min-w-0 w-full">
                    <ProfileTabs isOwnProfile={isOwnProfile} />
                    <div className={`${searchParam.tab === "userComments" ? "flex flex-col gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }`}>
                        {content.map((item) => (
                            "newPrice" in item 
                            ? <DealCard key={item.id} deal={item} layout="grid" />
                            : <CommentCard key={item.id} isOwnProfile={isOwnProfile} comment={{ ...item, rating: item.rating ?? 0 }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}