import DealCard from "@/components/deals/DealCard";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

interface UserPageProps {
    params: Promise<{ userName: string }>;
}



export default async function UserPage({ params }: UserPageProps) {
    // const [activeTab, setActiveTab] = useState<ActiveTab>("deals");
    const session = await auth.api.getSession({ headers: await headers() });
    const { userName } = await params;
    const user = await db
        .selectFrom("user")
        .selectAll("user")
        .where("user.name", "=", userName)
        .executeTakeFirst();
    if (!user) {
        notFound();
    }

    // const deals = await db.selectFrom("deal")
    //     .selectAll("deal")
    //     .where("deal.authorId", "=", user.id)
    //     .execute();


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

    const profileId = user.id;
    const isOwnProfile = session?.user?.id === profileId;

    console.log(isOwnProfile)

    // Make profile tabs content dynamic, by fetching, and use it in wrapper component

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-[112px]">
                    <ProfileCard user={user} isOwnProfile={isOwnProfile} />
                </aside>
                <div className="flex-1 min-w-0 w-full">

                    <ProfileTabs isOwnProfile={isOwnProfile} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deals.map((deal) => (
                            <DealCard key={deal.id} deal={deal} layout="grid" />
                        ))}
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}