"use client"
import { ButtonGroup } from "./button-group";
import { Button } from "./button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function RatingButton({ rating, comment }: { rating: number, comment: boolean }) {
    return (
        <ButtonGroup
            orientation="horizontal"
            // TODO: Redesign this buttons

            className="justify-center items-center "
        >
            <Button variant="ghost" className="p-1.5 cursor-pointer hover:bg-slate-200/50">
                <ChevronUp width={14} height={14} strokeWidth={3} className="text-slate-400 " />
            </Button>
            <span className="text-[14px] font-bold text-slate-900 px-1">
                {rating}{comment ? "°" : ""}
            </span>
            <Button variant="ghost" className="p-1.5 cursor-pointer hover:bg-slate-200/50">
                <ChevronDown width={14} height={14} strokeWidth={3} className=" text-slate-400" />
            </Button>
        </ButtonGroup>
    )
}