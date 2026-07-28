import CommentCard from "@/components/comments/CommentCard";
import DealCard from "@/components/deals/DealCard";
import DealEmpty from "@/components/deals/DealEmpty";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileSettings from "@/components/profile/ProfileSettings";
import ProfileTabs from "@/components/profile/ProfileTabs";

import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

type Params = { username: string };

export default async function UserPage({ params, searchParams }: { params: Promise<Params>; searchParams: { tab: string | "userDeals", settings: string | "true", emailChanged: string } }) {
    const session = await auth.api.getSession({ headers: await headers() });
    const { username } = await params;
    const searchParam = await searchParams;
    
    const isOwnProfile = session?.user?.username === username;
    
    let hasPassword = false

    const user = await db
        .selectFrom("user")
        .select(["id", "name", "username", "image", "karma", "createdAt"])
        .where("user.username", "=", username)
        .executeTakeFirst();
    if (!user) {
        notFound();
    }

    if (searchParam.settings === "true" && !isOwnProfile) {
        const query = searchParam.tab ? `?tab=${searchParam.tab}` : "";
        redirect(`/user/${username}${query}`);
    }

    if (searchParam.tab === "userBookmarks" && !isOwnProfile) {
        redirect(`/user/${username}`)
    }


    const dealsQuery = () => db.selectFrom("deal").innerJoin("user", "user.id", "deal.authorId").selectAll("deal").where("deal.authorId", "=", user.id).select((eb) => [
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

    const savedQuery = () => db.selectFrom("saved_deal").innerJoin("deal", "deal.id", "saved_deal.dealId").innerJoin("user", "user.id", "deal.authorId").selectAll("deal").where("saved_deal.userId", "=", user.id).select((eb) => [
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

    const commentsQuery = () => db.selectFrom("comment").innerJoin("deal", "deal.id", "comment.dealId").innerJoin("user", "user.id", "deal.authorId").selectAll("comment").where("comment.authorId", "=", user.id).select((eb) => [
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

    type Deal = Awaited<ReturnType<typeof dealsQuery>>[number];
    type Comment = Awaited<ReturnType<typeof commentsQuery>>[number];
    
    let content: (Deal | Comment)[];
    switch (searchParam.tab) {
        case "userBookmarks":
            content = isOwnProfile ? await savedQuery() : [];
            break;
        case "userComments":
            content = await commentsQuery();
            break;
        default:
            content = await dealsQuery();
    }

    const showSettings = searchParam.settings === "true" && isOwnProfile;

    if(showSettings) {
        const linkedAccounts = await auth.api.listUserAccounts({
            headers: await headers(),
        });
        hasPassword = linkedAccounts.some(acc => acc.providerId === "credential");
    }

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-28">
                    <ProfileCard user={user} isOwnProfile={isOwnProfile} />
                </aside>
                <div className="flex-1 min-w-0 w-full">
                    {showSettings
                    ? <ProfileSettings name={user.name} userName={user.username} email={session!.user.email} emailVerified={session!.user.emailVerified} emailChanged={searchParam.emailChanged} hasPassword={hasPassword} />
                    : <>
                        <ProfileTabs isOwnProfile={isOwnProfile} currentTab={searchParam.tab || "userDeals"} />
                        <div className={content.length === 0 ? "flex items-center justify-center" : searchParam.tab === "userComments" ? "flex flex-col gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                            {content.length === 0 ? <DealEmpty tab={searchParam.tab} isAuthor={isOwnProfile}/> : content.map((item) => (
                                "newPrice" in item 
                                ? <DealCard key={item.id} deal={item} layout="grid" />
                                : <CommentCard key={item.id} isOwnProfile={isOwnProfile} comment={{ ...item, rating: item.rating ?? 0 }} />
                            ))}
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}