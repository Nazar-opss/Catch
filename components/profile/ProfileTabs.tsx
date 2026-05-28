"use client"
import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { Button } from "../ui/button";
import { Bookmark, Flame, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";


export default function ProfileTabs({ isOwnProfile }: { isOwnProfile: boolean }) {
    const setParam = useSearchParamSetter()
    const searchParams = useSearchParams()
    const currentSort = searchParams.get("tab") || "userDeals"
    return (
        <div className="flex items-center gap-1.5 bg-slate-200/50 p-1.5 rounded-[20px] w-fit mb-8 overflow-x-auto shadow-sm border border-slate-200/50">
            <Button
                className={`rounded-[14px] px-5 py-2.5 h-full text-slate-600 cursor-pointer gap-2 font-semibold transition-all ${currentSort === "userDeals" ? "bg-white hover:bg-white" : "bg-transparent hover:bg-white/70"} whitespace-nowrap text-sm`}
                variant={"default"}
                onClick={() => setParam('tab','userDeals')}
            >
                <Flame className="h-5 w-5" />
                {isOwnProfile ? "Мої знахідки" : "Знахідки користувача"}
            </Button>
            {isOwnProfile && <Button
                className={`rounded-[14px] px-5 py-2.5 h-full text-slate-600 cursor-pointer gap-2 font-semibold transition-all ${currentSort === "userBookmarks" ? "bg-white hover:bg-white" : "bg-transparent hover:bg-white/70"} whitespace-nowrap text-sm`}
                variant={"default"}
                onClick={() => setParam("tab", "userBookmarks")}
            >
                <Bookmark className="h-5 w-5" />
                Збережене
            </Button>
            }
            <Button
                className={`rounded-[14px] px-5 py-2.5 h-full text-slate-600 cursor-pointer gap-2 font-semibold transition-all ${currentSort === "userComments" ? "bg-white hover:bg-white" : "bg-transparent hover:bg-white/70"} whitespace-nowrap text-sm`}
                variant={"default"}
                onClick={() => setParam("tab", "userComments")}
            >
                <MessageCircle className="h-5 w-5" />
                {isOwnProfile ? "Мої коментарі" : "Коментарі користувача"}
            </Button>
        </div>
    )
}