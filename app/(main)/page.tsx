import DealEmpty from "@/components/deals/DealEmpty";
import DealsFeed from "@/components/deals/DealsFeed";
import DealsList from "@/components/deals/DealsList";
import { FilterBar } from "@/components/filters/FilterBar";
import { getDealsPage } from "@/lib/actions/deals";
import { auth } from "@/lib/auth";
import { Deal } from "@/prisma/types/types";
import { db } from "@/server/db";
import { Selectable } from "kysely";
import { headers } from "next/headers";

export type DealWithAuthor = Selectable<Deal> & {
  authorName: string
  authorImage: string | null
  commentCount: number | string | null
  userVote: number | null
}

export default async function Home({ searchParams }: { searchParams: { view?: string, sort?: string | "hot" } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUserId = session?.user.id;

  const { view, sort }: { view?: string, sort?: string } = await searchParams
  const layout = view === "list" ? "list" : "grid"

  const firstPage = await getDealsPage({sort, currentUserId, cursor: null})
  

  return (
    <main className="flex flex-1 w-full max-w-7xl items-center flex-col mx-auto py-8 sm:px-6 px-4">
      <FilterBar />
      {/* {
        dealsArray.length === 0 && <DealEmpty/>
      }
      <DealsList deals={dealsArray} layout={layout} /> */}
      <DealsFeed 
        key={sort ?? "hot"}
        initialPage={firstPage}
        layout={layout}
        sort={sort ?? "hot"}
      />

    </main>
  );
}
