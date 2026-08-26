import DealsFeed from "@/components/deals/DealsFeed";
import DealsListSkeleton from "@/components/deals/DealsListSkeleton";
import { FilterBar } from "@/components/filters/FilterBar";
import MainContainer from "@/components/MainContainer";
import { getDealsPage } from "@/lib/actions/deals";
import { auth } from "@/lib/auth";
import { Deal } from "@/prisma/types/types";
import { Selectable } from "kysely";
import { cookies, headers } from "next/headers";
import { Suspense } from "react";
import UIStoreProvider from "@/components/UIStoreProvider";

export const dynamic = 'force-dynamic';

export type DealWithAuthor = Selectable<Deal> & {
  authorName: string;
  authorImage: string | null;
  commentCount: number | string | null;
  userVote: number | null;
};

async function DealsFeedLoader({
  sort,
  q,
  currentUserId,
  category,
  serverLayout,
  serverExpanded,
}: {
  sort?: string;
  q: string;
  currentUserId?: string;
  category?: string;
  serverLayout: "list" | "grid";
  serverExpanded: boolean;
}) {
  const firstPage = await getDealsPage({
    sort,
    q: q ?? null,
    currentUserId,
    cursor: null,
    category,
  });
  return (
    <DealsFeed
      initialPage={firstPage}
      sort={sort ?? "hot"}
      q={q}
      category={category}
      serverExpanded={serverExpanded}
      serverLayout={serverLayout}
    />
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    view?: string;
    sort?: string | "hot";
    q?: string;
    category?: string;
  }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUserId = session?.user.id;

  const cookieStore = await cookies();
  const serverExpanded = cookieStore.get("ui_expanded")?.value === "true";
  const serverLayout = (cookieStore.get("ui_layout")?.value === "list") ? "list" : "grid";

  const { sort, q, category } = await searchParams;


  return (
    <UIStoreProvider initialExpanded={serverExpanded} initialLayout={serverLayout}>
      <MainContainer>
        <h1 className="sr-only">
          Спільнота найкращих знижок та акцій України — Catch
        </h1>
        <FilterBar />
        <Suspense fallback={<DealsListSkeleton layout={serverLayout} />}>
          <DealsFeedLoader
            sort={sort}
            q={q ?? ""}
            currentUserId={currentUserId}
            category={category}
            serverLayout={serverLayout}
            serverExpanded={serverExpanded} 
          />
        </Suspense>
      </MainContainer>
    </UIStoreProvider>
  );
}
