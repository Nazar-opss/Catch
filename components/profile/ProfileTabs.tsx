"use client"
import { Button } from "../ui/button";
import { Bookmark, Flame, MessageCircle } from "lucide-react";
import { useState } from "react";

type ActiveTab = "deals" | "bookmarks" | "comments"

export default function ProfileTabs() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("deals");
    return (
        <div className="flex items-center gap-1.5 bg-slate-200/50 p-1.5 rounded-[20px] w-fit mb-8 overflow-x-auto shadow-sm border border-slate-200/50">
            <Button
                className={`rounded-[14px] px-5 py-2.5 h-full text-slate-600 cursor-pointer gap-2 font-semibold transition-all ${activeTab === "deals" ? "bg-white hover:bg-white" : "bg-transparent hover:bg-white/70"} whitespace-nowrap text-sm`}
                variant={"default"}
                onClick={() => setActiveTab("deals")}
            >
                <Flame className="h-5 w-5" />
                Мої знахідки
            </Button>
            <Button
                className={`rounded-[14px] px-5 py-2.5 h-full text-slate-600 cursor-pointer gap-2 font-semibold transition-all ${activeTab === "bookmarks" ? "bg-white hover:bg-white" : "bg-transparent hover:bg-white/70"} whitespace-nowrap text-sm`}
                variant={"default"}
                onClick={() => setActiveTab("bookmarks")}
            >
                <Bookmark className="h-5 w-5" />
                Збережене
            </Button>
            <Button
                className={`rounded-[14px] px-5 py-2.5 h-full text-slate-600 cursor-pointer gap-2 font-semibold transition-all ${activeTab === "comments" ? "bg-white hover:bg-white" : "bg-transparent hover:bg-white/70"} whitespace-nowrap text-sm`}
                variant={"default"}
                onClick={() => setActiveTab("comments")}
            >
                <MessageCircle className="h-5 w-5" />
                Мої коментарі
            </Button>
        </div>
    )
}