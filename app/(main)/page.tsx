import DealsList from "@/components/deals/DealsList";
import { FilterBar } from "@/components/filters/FilterBar";
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

export default async function Home({ searchParams }: { searchParams: { view?: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUserId = session?.user.id;

  const { view } = await searchParams

  const layout = view === "list" ? "list" : "grid"

  const deals = await db.selectFrom("deal").innerJoin("user", "user.id", "deal.authorId").selectAll("deal").select((eb) => [
    "user.name as authorName",
    "user.image as authorImage",
    eb.selectFrom("comment")
      .select(eb.fn.count<number>("id").as("count"))
      .whereRef("comment.dealId", "=", ("deal.id"))
      .as("commentCount"),
    eb.selectFrom("vote")
      .select("value")
      .whereRef("vote.dealId", "=", "deal.id")
      .where("vote.userId", "=", currentUserId ?? "")
      .as("userVote")
  ]).execute()

  return (
    <main className="flex flex-1 w-full max-w-7xl flex-col mx-auto py-8 sm:px-6 px-4">
      <FilterBar />
      <DealsList deals={deals} layout={layout} />
    </main>
  );
}
