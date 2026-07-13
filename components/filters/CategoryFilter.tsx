"use client"
import { CATEGORIES } from "@/lib/constants";
import { SortButton } from "./SortButton";
import { useSearchParams } from "next/navigation";

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("category") ?? "all";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <SortButton
        paramKey="category"
        value="all"
        label="Усі"
        active={currentSort === "all"}
      />
      {CATEGORIES.map((c) => {
        return (
          <SortButton
            key={c.value}
            paramKey="category"
            label={`${c.icon} ${c.label}`}
            value={c.value}
            active={currentSort === c.value}
          />
        );
      })}
    </div>
  );
}
