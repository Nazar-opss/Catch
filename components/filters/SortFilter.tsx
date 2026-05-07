"use client"
import { useSearchParams } from "next/navigation";
import { SortButton } from "./SortButton";

export function SortFilter() {
    const searchParams = useSearchParams()
    const currentSort = searchParams.get("sort") || "hot"

    const sortOptions = [
        { value: "hot", label: "Гарячі" },
        { value: "new", label: "Нові" },
        { value: "discussed", label: "Обговорювані" },
    ];

    return (
        <div className="flex flex-wrap items-center gap-2">
            {sortOptions.map((sort) => {
                const isActive = currentSort === sort.value
                return (
                    <SortButton key={sort.value} label={sort.label} category={sort.value} active={isActive} />
                )
            })}
        </div>
    )
}