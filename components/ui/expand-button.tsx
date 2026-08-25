"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Maximize, Minimize } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
export default function ExpandButton() {
  // const isDesktop = useMediaQuery("(min-width: 1440px)");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    document.cookie = `ui_expanded=${!isExpanded}; path=/; max-age=31536000`;
    router.refresh();
  };
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center">
        <div
          className="hidden min-[1440px]:flex items-center text-muted-foreground hover:text-foreground pr-2 cursor-pointer"
          onClick={handleToggle}
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
