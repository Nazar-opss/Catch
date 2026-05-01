import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { Camera } from "lucide-react";
import { notFound } from "next/navigation";

interface UserPageProps {
    params: Promise<{ userName: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
    const { userName } = await params;
    const user = await db.selectFrom("user").selectAll("user").where("user.name", "=", userName).executeTakeFirst();
    if (!user) {
        notFound();
    }
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-[112px]">
                    <div className=" bg-white rounded-[24px] border border-slate-200 shadow-sm p-8 flex flex-col items-center gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-5 group">
                                <div className="w-28 h-28 rounded-full p-1 bg-white border border-slate-200 group-hover:border-orange-200 transition-colors shadow-sm">
                                    <img className="rounded-full w-full h-full object-cover" src={user.image ?? undefined} alt={user.name ?? undefined} />
                                </div>
                                <Button className="absolute cursor-pointer bottom-0 right-0 p-2 bg-white border border-slate-200 shadow-sm hover:text-orange-600 hover:border-orange-200 transition-colors opacity-0 group-hover:opacity-100 rounded-full" variant={"outline"} size={"icon"}>
                                    <Camera />
                                </Button>
                            </div>
                            <span className="text-lg font-bold">{user.name}</span>
                        </div>
                    </div>
                </aside>
                User Page
            </div>
        </div>
    )
}