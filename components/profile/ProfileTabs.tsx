"use client"
import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { Button } from "../ui/button";
import { Bookmark, Flame, MessageCircle } from "lucide-react";

export default function ProfileTabs({ isOwnProfile, currentTab }: { isOwnProfile: boolean; currentTab: string }) {
    const setParams = useSearchParamSetter()
    
    const changeTab = (tab: string) => {
        setParams({
            tab: tab === "userDeals" ? null : tab,
            page: null
        })
    }
    return (
        <div className="flex flex-wrap items-center gap-1.5 bg-border/50 p-1.5 rounded-[20px] w-fit mb-8 overflow-x-auto shadow-sm border border-border/50">
            <Button
                className={`rounded-[14px] px-5 py-2.5 h-full cursor-pointer gap-2 font-semibold transition-all ${currentTab === "userDeals" ? "bg-card hover:bg-card hover:text-foreground text-foreground shadow-sm dark:bg-slate-700" : "bg-transparent text-muted-foreground hover:bg-card hover:text-foreground dark:hover:bg-slate-700 dark:hover:text-foreground"} whitespace-nowrap text-sm`}
                variant={"default"}
                onClick={() => changeTab('userDeals')}
            >
                <Flame className="h-5 w-5" />
                {isOwnProfile ? "Мої знахідки" : "Знахідки користувача"}
            </Button>
            {isOwnProfile && <Button
                className={`rounded-[14px] px-5 py-2.5 h-full cursor-pointer gap-2 font-semibold transition-all ${currentTab === "userBookmarks" ? "bg-card hover:bg-card hover:text-foreground text-foreground shadow-sm  dark:bg-slate-700"  : "bg-transparent text-muted-foreground hover:bg-card hover:text-foreground  dark:hover:bg-slate-700 dark:hover:text-foreground"} whitespace-nowrap text-sm`}
                variant={"default"}
                onClick={() => changeTab("userBookmarks")}
            >
                <Bookmark className="h-5 w-5" />
                Збережене
            </Button>
            }
            <Button
                className={`rounded-[14px] px-5 py-2.5 h-full cursor-pointer gap-2 font-semibold transition-all ${currentTab === "userComments" ? "bg-card text-foreground shadow-sm hover:bg-card hover:text-foreground dark:bg-slate-700" : "bg-transparent text-muted-foreground hover:bg-card hover:text-foreground dark:hover:bg-slate-700 dark:hover:text-foreground"} whitespace-nowrap text-sm`}
                variant={"default"}
                onClick={() => changeTab("userComments")}
            >
                <MessageCircle className="h-5 w-5" />
                {isOwnProfile ? "Мої коментарі" : "Коментарі користувача"}
            </Button>
        </div>
    )
}