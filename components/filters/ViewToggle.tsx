"use client"
import { LayoutGrid, LayoutList } from "lucide-react";
import { useState } from "react";

export function ViewToggle() {
    const [view, viewToggle] = useState<"list" | "grid">("grid")

    return (
        <div className="flex items-center gap-4 lg:ml-auto bg-white pl-5 pr-2 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <span className="uppercase font-bold text-[12px] text-slate-500 tracking-wider ">оберіть вигляд стрічки:</span>
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
                <button onClick={() => viewToggle("list")} className={`flex cursor-pointer transition-all duration-200 gap-2 px-4 p-1.5 font-medium items-center text-[13px] rounded-lg ${view === "list" ? "bg-[#ea580c] text-white shadow-sm" : ""} text-slate-600`}>
                    <LayoutList size={16} />
                    List
                    <span className="hidden sm:inline">
                        (Горизонтальні)
                    </span>
                </button>
                <button onClick={() => viewToggle("grid")} className={`flex cursor-pointer gap-2 px-4 transition-all duration-200 p-1.5 font-medium items-center text-[13px] rounded-lg ${view === "grid" ? "bg-[#ea580c] text-white shadow-sm" : ""} text-slate-600`}>
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