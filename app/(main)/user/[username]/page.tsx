import CommentCard from "@/components/comments/CommentCard";
import DealCard from "@/components/deals/DealCard";
import DealEmpty from "@/components/deals/DealEmpty";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileSettings from "@/components/profile/ProfileSettings";
import ProfileTabs from "@/components/profile/ProfileTabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { ComponentProps } from "react";

type Params = { username: string };

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: {
    tab: string | "userDeals";
    settings: string | "true";
    emailChanged: string;
    page?: string;
  };
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { username } = await params;
  const searchParam = await searchParams;

  const PAGE_SIZE = 12;

  const rawPage = Number(searchParam.page);
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const offset = (page - 1) * PAGE_SIZE;

  const isOwnProfile = session?.user?.username === username;

  let hasPassword = false;

  const user = await db
    .selectFrom("user")
    .select(["id", "name", "username", "image", "karma", "createdAt"])
    .where("user.username", "=", username)
    .executeTakeFirst();
  if (!user) {
    notFound();
  }

  if (searchParam.settings === "true" && !isOwnProfile) {
    const query = searchParam.tab ? `?tab=${searchParam.tab}` : "";
    redirect(`/user/${username}${query}`);
  }

  if (searchParam.tab === "userBookmarks" && !isOwnProfile) {
    redirect(`/user/${username}`);
  }

  let totalPages = 1;
  const dealsBaseQuery = db
    .selectFrom("deal")
    .innerJoin("user", "user.id", "deal.authorId")
    .where("deal.authorId", "=", user.id);

  const savedBaseQuery = db
    .selectFrom("saved_deal")
    .innerJoin("deal", "deal.id", "saved_deal.dealId")
    .innerJoin("user", "user.id", "deal.authorId")
    .where("saved_deal.userId", "=", user.id);

  const commentsBaseQuery = db
    .selectFrom("comment")
    .innerJoin("deal", "deal.id", "comment.dealId")
    .innerJoin("user", "user.id", "deal.authorId")
    .where("comment.authorId", "=", user.id);

  type Deal = ComponentProps<typeof DealCard>["deal"];
  type Comment = ComponentProps<typeof CommentCard>["comment"];

  let content: Array<Deal | Comment>;
  switch (searchParam.tab) {
    case "userBookmarks": {
      const [{ total }, savedDeals] = await Promise.all([
        savedBaseQuery
          .select((eb) => eb.fn.countAll<number>().as("total"))
          .executeTakeFirstOrThrow(),

        savedBaseQuery
          .selectAll("deal")
          .select((eb) => [
            "user.name as authorName",
            "user.image as authorImage",
            eb
              .selectFrom("comment")
              .select(eb.fn.count<number>("id").as("count"))
              .whereRef("comment.dealId", "=", "deal.id")
              .as("commentCount"),
            eb
              .selectFrom("vote")
              .select("value")
              .whereRef("vote.dealId", "=", "deal.id")
              .where("vote.userId", "=", session?.user?.id ?? "")
              .as("userVote"),
          ])
          .orderBy("saved_deal.createdAt", "desc")
          .limit(PAGE_SIZE)
          .offset(offset)
          .execute(),
      ]);
      content = savedDeals;
      totalPages = Math.max(1, Math.ceil(Number(total) / PAGE_SIZE));
      break;
    }

    case "userComments": {
      const [{ total }, comments] = await Promise.all([
        commentsBaseQuery
          .select((eb) => eb.fn.countAll<number>().as("total"))
          .executeTakeFirstOrThrow(),

        commentsBaseQuery
          .selectAll("comment")
          .select((eb) => [
            "user.name as authorName",
            "user.image as authorImage",
            "deal.title as dealTitle",
            eb
              .selectFrom("comment_vote")
              .select((sqb) =>
                sqb.fn
                  .coalesce(
                    sqb.fn.sum<number>("comment_vote.value"),
                    sqb.val(0),
                  )
                  .as("rating"),
              )
              .whereRef("comment_vote.commentId", "=", "comment.id")
              .as("rating"),
            eb
              .selectFrom("vote")
              .select("value")
              .whereRef("vote.dealId", "=", "deal.id")
              .where("vote.userId", "=", session?.user?.id ?? "")
              .as("userVote"),
          ])
          .orderBy("comment.createdAt", "desc")
          .limit(PAGE_SIZE)
          .offset(offset)
          .execute(),
      ]);

      content = comments.map((comment) => ({
        ...comment,
        rating: comment.rating ?? 0,
      }));
      totalPages = Math.max(1, Math.ceil(Number(total) / PAGE_SIZE));
      break;
    }
    default:
      const [{ total }, deals] = await Promise.all([
        dealsBaseQuery
          .select((eb) => eb.fn.countAll<number>().as("total"))
          .executeTakeFirstOrThrow(),

        dealsBaseQuery
          .selectAll("deal")
          .select((eb) => [
            "user.name as authorName",
            "user.image as authorImage",
            eb
              .selectFrom("comment")
              .select(eb.fn.count<number>("id").as("count"))
              .whereRef("comment.dealId", "=", "deal.id")
              .as("commentCount"),
            eb
              .selectFrom("vote")
              .select("value")
              .whereRef("vote.dealId", "=", "deal.id")
              .where("vote.userId", "=", session?.user?.id ?? "")
              .as("userVote"),
          ])
          .orderBy("deal.createdAt", "desc")
          .limit(PAGE_SIZE)
          .offset(offset)
          .execute(),
      ]);

      content = deals;
      totalPages = Math.max(1, Math.ceil(Number(total) / PAGE_SIZE));
    //   content = await dealsQuery();
  }

  const showSettings = searchParam.settings === "true" && isOwnProfile;

  if (showSettings) {
    const linkedAccounts = await auth.api.listUserAccounts({
      headers: await headers(),
    });
    hasPassword = linkedAccounts.some((acc) => acc.providerId === "credential");
  }

  const makePageHref = (targetPage: number) => {
    const params = new URLSearchParams();

    if (searchParam.tab && searchParam.tab !== "userDeals") {
      params.set("tab", searchParam.tab);
    }

    if (targetPage > 1) {
      params.set("page", String(targetPage));
    }

    const query = params.toString();
    return `/user/${username}${query ? `?${query}` : ""}`;
  };

  const getVisiblePages = (current: number, total: number) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 2)
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-28">
          <ProfileCard user={user} isOwnProfile={isOwnProfile} />
        </aside>
        <div className="flex-1 min-w-0 w-full">
          {showSettings ? (
            <ProfileSettings
              name={user.name}
              userName={user.username}
              email={session!.user.email}
              emailVerified={session!.user.emailVerified}
              emailChanged={searchParam.emailChanged}
              hasPassword={hasPassword}
            />
          ) : (
            <>
              <ProfileTabs
                isOwnProfile={isOwnProfile}
                currentTab={searchParam.tab || "userDeals"}
              />
              <div
                className={
                  content.length === 0
                    ? "flex items-center justify-center"
                    : searchParam.tab === "userComments"
                      ? "flex flex-col gap-6"
                      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                }
              >
                {content.length === 0 ? (
                  <DealEmpty tab={searchParam.tab} isAuthor={isOwnProfile} />
                ) : (
                  content.map((item) =>
                    "newPrice" in item ? (
                      <DealCard key={item.id} deal={item} layout="grid" />
                    ) : (
                      <CommentCard
                        key={item.id}
                        isOwnProfile={isOwnProfile}
                        comment={{ ...item, rating: item.rating ?? 0 }}
                      />
                    ),
                  )
                )}
              </div>
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious className="rounded-md" text="Попередня" href={makePageHref(page - 1)} />
                      </PaginationItem>
                    )}
                    {visiblePages.map((pageItem, index) => (
                      <PaginationItem key={index}>
                        {pageItem === "..." ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href={makePageHref(pageItem as number)}
                            isActive={pageItem === page}
                            className={`${pageItem === page ? "bg-primary dark:bg-primary text-white!" : "" } w-10 h-10 text-card-foreground font-medium text-[16px] rounded-md`}
                          >
                            {pageItem}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationNext className="rounded-md" text="Наступна" href={makePageHref(page + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
