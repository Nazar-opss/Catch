import DealCard from "./DealCard";
import { DealWithAuthor } from "@/app/(main)/page";

interface DealsListProps {
  deals: DealWithAuthor[];
  layout: "grid" | "list";
  isExpanded: boolean;
}

export default function DealsList({
  deals,
  layout,
  isExpanded,
}: DealsListProps) {
  const listClasses = isExpanded
    ? "grid-cols-1 min-[1440px]:grid-cols-2"
    : "grid-cols-1";

  const gridClasses = isExpanded
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6"
    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  return (
    <div
      className={`w-full ${layout === "grid" ? `grid ${gridClasses} gap-4` : `grid ${listClasses} gap-6`} `}
    >
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} layout={layout} />
      ))}
    </div>
  );
}
