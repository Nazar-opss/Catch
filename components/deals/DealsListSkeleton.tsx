import DealCardSkeleton from "./DealCardSkeleton";

export default function DealsListSkeleton({layout, count = 8}: { layout: "grid" | "list"; count?: number }) {
    return (
         <div className={`w-full ${layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" : "flex flex-col gap-6"}`}>
            {Array.from({ length: count }, (_, i) => (
                <DealCardSkeleton key={i} layout={layout} />
            ))}
        </div>
    )
}