"use client"
import DealCard from "./DealCard";
import { DealWithAuthor } from "@/app/(main)/page";

interface DealsListProps {
    deals: DealWithAuthor[]
    layout: "grid" | "list"
}

export default function DealsList({ deals, layout }: DealsListProps) {
    return (
        <div className={`w-full ${layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" : "flex flex-col gap-6"} `}>
            {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} layout={layout} />
            ))}
        </div>
    )
}