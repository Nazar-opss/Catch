"use client";
import { Maximize, Minimize } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { useUIStore } from "@/lib/store/uiStore";
export default function ExpandButton() {

  const { isExpanded, toggleExpanded } = useUIStore();
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center">
        <div
          className="hidden min-[1440px]:flex items-center text-muted-foreground hover:text-foreground pr-2 cursor-pointer"
          onClick={toggleExpanded}
        >
          {isExpanded === true ? (
            <Minimize size={16} />
          ) : (
            <Maximize size={16} />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="">
        {isExpanded === true ? "Звузити стрічку" : "Розширити стрічку"}
      </TooltipContent>
    </Tooltip>
  );
}
