"use client"
import CategoryRibbon from "./CategoryRibbon";

export default function CategoryFilter() {

  return (
    <div className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex w-full items-center gap-2 overflow-x-auto overflow-hidden whitespace-nowrap py-2 scrollbar-hide">
      <CategoryRibbon/>
    </div>
  );
}