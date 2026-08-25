"use client"
import { DealsPage } from "@/lib/actions/deals";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef} from "react";
import PageLoader from "../ui/PageLoader";
import DealEmpty from "./DealEmpty";
import DealsList from "./DealsList";

export default function DealsFeed({initialPage, layout, sort, q = "", category, isExpanded} : {initialPage: DealsPage, layout: "grid" | "list", sort: string, q?: string, category?: string, isExpanded: boolean}) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["deals", sort, q, category],
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams({sort})
            if(pageParam) params.set("cursor", pageParam)
            if(q) params.set("q", q)
            if(category) params.set("category", category)
            return fetch(`/api/deals?${params}`).then(r => r.json())
            },

            initialPageParam: null as string | null,
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            initialData: { 
                pages: [initialPage], 
                pageParams: [null] 
        }
    });

    const seen = new Set<string>()
    const deals = data.pages
        .flatMap(page => page.items)
        .filter(deal => {
            if (seen.has(deal.id)) return false
            seen.add(deal.id)
            return true
        })

    const loadMoreRef = useRef<HTMLDivElement>(null)

    const autoLoads = useRef(0)

    const MAX_AUTO = 1

    useEffect(() => {
        const el = loadMoreRef.current
        if (!el || !hasNextPage) return;
        const io = new IntersectionObserver(([entry]) => {
            if(
                entry.isIntersecting && 
                hasNextPage &&
                !isFetchingNextPage &&
                autoLoads.current < MAX_AUTO
            ) {
            autoLoads.current += 1
            fetchNextPage()
            }
        }) 
        io.observe(el);
        return () => io.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


    return (
        <>
            {deals.length === 0 ? <DealEmpty/> : <DealsList deals={deals} layout={layout} isExpanded={isExpanded}/>}
            <div ref={loadMoreRef} />
            {isFetchingNextPage && <PageLoader />}
            {hasNextPage && !isFetchingNextPage && (
                <div className="flex justify-center mt-8">
                <button
                    onClick={() => {
                    fetchNextPage();
                    }}
                    className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
                >
                    Показати ще
                </button>
                </div>
            )}
            {!hasNextPage && initialPage.items.length > 0 && (
                <p className="text-center text-sm text-muted-foreground mt-8 py-4">
                Це все 🔥
                </p>
            )}
        </>
    )
}