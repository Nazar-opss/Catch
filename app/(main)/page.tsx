import DealsFeed from "@/components/deals/DealsFeed";
import DealsListSkeleton from "@/components/deals/DealsListSkeleton";
import { FilterBar } from "@/components/filters/FilterBar";
import { getDealsPage } from "@/lib/actions/deals";
import { auth } from "@/lib/auth";
import { Deal } from "@/prisma/types/types";
import { Selectable } from "kysely";
import { headers } from "next/headers";
import { Suspense } from "react";

export type DealWithAuthor = Selectable<Deal> & {
  authorName: string
  authorImage: string | null
  commentCount: number | string | null
  userVote: number | null
}

async function DealsFeedLoader({ sort, q, currentUserId, layout, category }: {
  sort?: string; q: string; currentUserId?: string; layout: "grid" | "list", category?: string
}) {
  const firstPage = await getDealsPage({ sort, q: q ?? null, currentUserId, cursor: null, category })
  return <DealsFeed initialPage={firstPage} layout={layout} sort={sort ?? "hot"} q={q} category={category} />
}

export default async function Home({ searchParams }: { searchParams: Promise<{ view?: string, sort?: string | "hot", q?: string, category?: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUserId = session?.user.id;

  const { view, sort, q, category } = await searchParams
  const layout = view === "list" ? "list" : "grid"  

  return (
    <main className="flex flex-1 w-full max-w-7xl items-center flex-col mx-auto py-8 sm:px-6 px-4">
      <FilterBar />
      {/* {
        dealsArray.length === 0 && <DealEmpty/>
      }
      <DealsList deals={dealsArray} layout={layout} /> */}
      <Suspense fallback={<DealsListSkeleton layout={layout} />}>
          <DealsFeedLoader sort={sort} q={q ?? ""} currentUserId={currentUserId} layout={layout} category={category} />
      </Suspense>
    </main>
  );
}
