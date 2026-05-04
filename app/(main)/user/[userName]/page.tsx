import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { db } from "@/server/db";
import { notFound } from "next/navigation";

interface UserPageProps {
    params: Promise<{ userName: string }>;
}



export default async function UserPage({ params }: UserPageProps) {
    // const [activeTab, setActiveTab] = useState<ActiveTab>("deals");

    const { userName } = await params;
    const user = await db.selectFrom("user").selectAll("user").where("user.name", "=", userName).executeTakeFirst();
    if (!user) {
        notFound();
    }

    // Make profile tabs content dynamic, by fetching, and use it in wrapper component

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-[112px]">
                    <ProfileCard user={user} />
                </aside>
                <div className="flex-1 min-w-0 w-full">

                    <ProfileTabs />
                    <div>
                        d
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}