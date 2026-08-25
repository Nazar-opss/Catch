import DealsFeed from "@/components/deals/DealsFeed";
import DealsListSkeleton from "@/components/deals/DealsListSkeleton";
import { FilterBar } from "@/components/filters/FilterBar";
import { getDealsPage } from "@/lib/actions/deals";
import { auth } from "@/lib/auth";
import { Deal } from "@/prisma/types/types";
import { Selectable } from "kysely";
import { cookies, headers } from "next/headers";
import { Suspense } from "react";

export type DealWithAuthor = Selectable<Deal> & {
  authorName: string
  authorImage: string | null
  commentCount: number | string | null
  userVote: number | null
}

async function DealsFeedLoader({ sort, q, currentUserId, layout, category, isExpanded }: {
  sort?: string; q: string; currentUserId?: string; layout: "grid" | "list", category?: string, isExpanded: boolean
}) {
  const firstPage = await getDealsPage({ sort, q: q ?? null, currentUserId, cursor: null, category })
  return <DealsFeed initialPage={firstPage} layout={layout} sort={sort ?? "hot"} q={q} category={category} isExpanded={isExpanded} />
}

export default async function Home({ searchParams }: { searchParams: Promise<{ view?: string, sort?: string | "hot", q?: string, category?: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUserId = session?.user.id;

  const cookieStore = await cookies()
  const isExpanded = cookieStore.get("ui_expanded")?.value === "true";

  const { view, sort, q, category } = await searchParams
  const layout = view === "list" ? "list" : "grid"  
  
  return (
    <main className={`flex flex-1 w-full items-center flex-col mx-auto py-8 sm:px-6 px-4 transition-all duration-500 ease-in-out ${isExpanded ? "min-[1440px]:max-w-[1920px]" : "max-w-7xl"}`}>
      <h1 className="sr-only">Спільнота найкращих знижок та акцій України — Catch</h1>
      <FilterBar />
      <Suspense fallback={<DealsListSkeleton layout={layout} />}>
          <DealsFeedLoader sort={sort} q={q ?? ""} currentUserId={currentUserId} layout={layout} category={category} isExpanded={isExpanded} />
      </Suspense>
    </main>
  );
}
