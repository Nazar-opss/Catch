"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
// import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { LayoutGrid, LayoutList } from "lucide-react";
// import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ExpandButton from "../ui/expand-button";
import { useUIStore } from "@/lib/store/uiStore";

export function ViewToggle() {
  const { layout, setLayout } = useUIStore();

  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  useEffect(() => {
    if (isDesktop === false && layout === "list") {
      setLayout('grid')
    }
  }, [isDesktop]);
  return (
    <div className="hidden md:flex items-center gap-4 lg:ml-auto bg-card pl-5 pr-2 py-2 rounded-2xl border border-border shadow-xs">
      <span className="uppercase font-bold text-[12px] text-muted-foreground tracking-wider ">
        оберіть вигляд стрічки:
      </span>
      <div className="flex items-center bg-background rounded-xl p-1">
        <button
          onClick={() => setLayout("list")}
          className={`flex cursor-pointer transition-all duration-200 gap-2 px-4 p-1.5 font-medium items-center text-[13px] rounded-lg ${layout === "list" ? "bg-[#ea580c] text-white shadow-sm" : "text-muted-foreground"} `}
        >
          <LayoutList size={16} />
          List
          <span className="hidden sm:inline">(Горизонтальні)</span>
        </button>
        <button
          onClick={() => setLayout("grid")}
          className={`flex cursor-pointer gap-2 px-4 transition-all duration-200 p-1.5 font-medium items-center text-[13px] rounded-lg ${layout === "grid" ? "bg-[#ea580c] text-white shadow-sm" : "text-muted-foreground"} `}
        >
          <LayoutGrid size={16} />
          Grid
          <span className="hidden sm:inline">(Вертикальні)</span>
        </button>
        <div className="hidden min-[1440px]:flex h-6 w-px bg-border my-1 mx-2"></div>
        <ExpandButton />
      </div>
    </div>
  );
}
