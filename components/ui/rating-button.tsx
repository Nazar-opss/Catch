"use client"
import { ButtonGroup } from "./button-group";
import { Button } from "./button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { voteDealAction } from "@/lib/actions/votes";

export default function RatingButton({ dealId, authorId, rating, reply, fontSize, iconSize, deal }: { dealId: string, authorId: string, rating: number, reply?: boolean, fontSize?: string, iconSize?: string, deal?: boolean }) {

    const buttonSize = reply ? "p-1" : "p-1.5";
    const buttonStyle = `cursor-pointer hover:bg-slate-200/50 text-slate-400 transition-colors bg-transparent  rounded-full! ${deal ? "w-10 h-10" : "w-6 h-6"}`
    return (
        <ButtonGroup
            orientation="horizontal"
            // TODO: Redesign this buttons

            className={` flex justify-center items-center bg-slate-50 gap-1 border border-slate-200 rounded-full px-1 py-0.5 ${deal ? "h-12.5!" : "h-7.5!"}`}
        >
            <Button onClick={() => voteDealAction(dealId, authorId, 1)} className={`${buttonSize} ${buttonStyle} hover:text-green-600 `}>
                <ChevronUp width={iconSize || 14} height={iconSize || 14} strokeWidth={3} />
            </Button>
            <span className={`${fontSize ? fontSize : "text-sm"} font-bold text-slate-900 ${deal ? "px-3" : "px-1"}`}>
                {rating}{reply ? "" : "°"}
            </span>
            <Button onClick={() => voteDealAction(dealId, authorId, -1)} className={`${buttonSize} ${buttonStyle} hover:text-red-600 `}>
                <ChevronDown width={iconSize || 14} height={iconSize || 14} strokeWidth={3} />
            </Button>
        </ButtonGroup>
    )
}