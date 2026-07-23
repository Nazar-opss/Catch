"use client"
import useMediaQuery from "@/hooks/useMediaQuery";
import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function ViewToggle() {
    const searchParams = useSearchParams()
    const view = searchParams.get("view") || "grid"

    const setParam = useSearchParamSetter()
    const isDesktop = useMediaQuery("(min-width: 768px)")
    useEffect(() => {
        if(isDesktop === false && view === "list") {
            setParam("view", "grid")
        }
    }, [isDesktop, view, setParam])
    return (
        <div className="hidden md:flex items-center gap-4 lg:ml-auto bg-card pl-5 pr-2 py-2 rounded-2xl border border-border shadow-xs">
            <span className="uppercase font-bold text-[12px] text-muted-foreground tracking-wider ">оберіть вигляд стрічки:</span>
            <div className="flex items-center bg-secondary rounded-xl p-1">
                <button onClick={() => setParam("view", "list")} className={`flex cursor-pointer transition-all duration-200 gap-2 px-4 p-1.5 font-medium items-center text-[13px] rounded-lg ${view === "list" ? "bg-[#ea580c] text-white shadow-sm" : "text-muted-foreground"} `}>
                    <LayoutList size={16} />
                    List
                    <span className="hidden sm:inline">
                        (Горизонтальні)
                    </span>
                </button>
                <button onClick={() => setParam("view", "grid")} className={`flex cursor-pointer gap-2 px-4 transition-all duration-200 p-1.5 font-medium items-center text-[13px] rounded-lg ${view === "grid" ? "bg-[#ea580c] text-white shadow-sm" : "text-muted-foreground"} `}>
                    <LayoutGrid size={16} />
                    Grid
                    <span className="hidden sm:inline">
                        (Вертикальні)
                    </span>
                </button>
            </div>
        </div>
    )
} 