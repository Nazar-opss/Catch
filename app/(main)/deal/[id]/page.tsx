import CommentItem from "@/components/comments/CommentItem";
import CommentInput from "@/components/comments/CommentInput";
import { DealsCarousel } from "@/components/deals/DealsCarousel";
import NoImage from "@/components/ui/noImage";
import { db } from "@/server/db";
import { Info } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildCommentTree } from "@/lib/buildCommentTree";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import DealAsideInfo from "@/components/deals/DealAsideInfo";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface DealPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{page? : string}>;
}
const COMMENTS_PAGE_SIZE = 10;
const imageStyle = "rounded-lg object-contain w-full h-full bg-card"

export default async function DealPage({ params, searchParams }: DealPageProps) {
    const session = await auth.api.getSession({ headers: await headers() });
    const currentUserId = session?.user.id;
    const { id } = await params;
    
    const deal = await db
    .selectFrom("deal")
    .innerJoin("user", "user.id", "deal.authorId")
    .selectAll("deal").select((eb) => [
        "user.username as authorUsername",
        "user.name as authorName",
        "user.image as authorImage",
        eb.selectFrom("comment")
        .whereRef("comment.dealId", "=", "deal.id")
        .select(eb.fn.count<number>("id").as("count"))
        .as("commentCount"),
        eb.selectFrom("vote")
        .select("value")
            .whereRef("vote.dealId", "=", "deal.id")
            .where("vote.userId", "=", currentUserId ?? "")
            .as("userVote"),
            eb.exists(
                eb.selectFrom("saved_deal")
                .select("id")
                .whereRef("saved_deal.dealId", "=", "deal.id")
                .where("saved_deal.userId", "=", currentUserId ?? "")
            ).as("isSaved")
        ])
        .where("deal.id", "=", id)
        .executeTakeFirst();
        
        if (!deal) {
            notFound();
        }
        
        const { count: rootCount } = await db
        .selectFrom("comment")
        .where("comment.dealId", "=", deal.id)
        .where("comment.parentId", "is", null)
        .select((eb) => eb.fn.countAll<number>().as("count"))
        .executeTakeFirstOrThrow();
        
        const totalPages = Math.max(1, Math.ceil(rootCount / COMMENTS_PAGE_SIZE))

        const { page } = await searchParams;
        const currentPage = Math.min(totalPages, Math.max(1, Number(page) || 1))
        
    const rootComments = await db
        .selectFrom("comment")
        .innerJoin("user", "user.id", "comment.authorId")
        .selectAll("comment")
        .select((eb) => [
            "user.name as authorName",
            "user.image as authorImage",
            "user.username as authorUsername",

            eb.selectFrom("comment_vote")
                .select((sqb) => sqb.fn.coalesce(sqb.fn.sum<number>("comment_vote.value"), sqb.val(0)).as("rating"))
                .whereRef("comment_vote.commentId", "=", "comment.id")
                .as("rating"),
            eb.selectFrom("comment_vote")
                .select("value")
                .whereRef("comment_vote.commentId", "=", "comment.id")
                .where("comment_vote.userId", "=", currentUserId ?? "")
                .as("userVote")
        ])
        .where("comment.dealId", "=", deal.id)
        .where("comment.parentId", "is", null)
        .orderBy("comment.createdAt", "desc")
        .limit(COMMENTS_PAGE_SIZE)
        .offset((currentPage - 1) * COMMENTS_PAGE_SIZE)
        .execute();

    const rootIds = rootComments.map((c) => c.id);

    const replies = rootIds.length === 0 ? [] : await db
        .withRecursive("reply_tree(id)", (qb) =>
            qb.selectFrom("comment")
                .select("id")
                .where("parentId", "in", rootIds)
                .unionAll((qb2) =>
                    qb2.selectFrom("comment")
                        .innerJoin("reply_tree", "reply_tree.id", "comment.parentId")
                        .select("comment.id")
                )
        )
        .selectFrom("comment")
        .innerJoin("user", "user.id", "comment.authorId")
        .innerJoin("reply_tree", "reply_tree.id", "comment.id")
        .selectAll("comment")
        .select((eb) => [
            "user.name as authorName",
            "user.image as authorImage",
            "user.username as authorUsername",

            eb.selectFrom("comment_vote")
                .select((sqb) => sqb.fn.coalesce(sqb.fn.sum<number>("comment_vote.value"), sqb.val(0)).as("rating"))
                .whereRef("comment_vote.commentId", "=", "comment.id")
                .as("rating"),
            eb.selectFrom("comment_vote")
                .select("value")
                .whereRef("comment_vote.commentId", "=", "comment.id")
                .where("comment_vote.userId", "=", currentUserId ?? "")
                .as("userVote")
        ])
        .orderBy("comment.createdAt", "desc")
        .execute();

    const threadComments = buildCommentTree([...rootComments, ...replies])
    const isAuthor = currentUserId === deal.authorId;
    

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="order-1 lg:col-start-1 lg:row-start-1 lg:col-span-8 flex flex-col gap-6">
                    {deal.imageUrls.length > 1 ? (
                        <DealsCarousel images={deal.imageUrls} imageStyle={imageStyle} />
                    ) :
                        deal.imageUrls[0] ? (
                            <div className="w-full flex items-center justify-center p-8 relative border bg-card border-border rounded-2xl overflow-hidden shadow-sm aspect-video sm:aspect-21/9 lg:aspect-16/10">
                                <Image
                                    loading="eager"
                                    src={deal.imageUrls[0]!}
                                    alt={deal.title}
                                    width={400}
                                    height={400}
                                    className={imageStyle}
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <NoImage />
                            </div>
                        )
                    }
                    <h1 className="text-3xl sm:text-[34px] font-extrabold tracking-tight leading-[1.2] ">
                        {deal.title}
                    </h1>
                </div>
                <div className="order-2 lg:col-start-1 lg:row-start-2 lg:col-span-8 bg-card rounded-[20px] border border-border p-6 sm:p-8 mt-2 shadow-sm">
                    <h2 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2" >
                        <Info className="w-5 h-5 text-orange-600" />
                        Про знижку
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg " >
                        {deal.description}
                    </p>
                </div>
                <div className="order-3 lg:col-start-9 lg:row-start-1 lg:row-span-3 lg:col-span-4 md:sticky top-24">
                    <DealAsideInfo deal={{...deal, isSaved: !!deal.isSaved}} isAuthor={isAuthor} />
                </div>
                <div id="comments" className="order-4 lg:col-start-1 lg:row-start-3 lg:col-span-8 md:bg-card rounded-[20px] md:border md:border-border md:p-6 mt-2 md:shadow-sm">
                    <h2 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2" >
                        Коментарі
                        <span className="text-slate-500 font-normal text-lg">
                            ({deal.commentCount})
                        </span>
                    </h2>
                    <CommentInput dealId={deal.id} />
                    <div>
                        {threadComments.map((comment) => {
                            return (
                                <CommentItem key={comment.id} userVote={comment.userVote} comment={comment} dealAuthorId={deal.authorId} />
                            )
                        })}
                        {threadComments.length === 0 && (
                            <p className="text-slate-500 text-sm">Коментарів поки що немає.</p>
                        )}
                    </div>
                    {
                        totalPages > 1 && (
                            <Pagination className="flex items-center justify-center gap-4 mt-6">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious 
                                            href={`?page=${currentPage - 1}#comments`}
                                            text="Попередні"
                                            aria-disabled={currentPage <= 1} 
                                            className={currentPage <= 1 ? "pointer-events-none opacity-40" : "rounded-full"}
                                        />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <span className="text-sm text-muted-foreground">
                                            {currentPage} / {totalPages}
                                        </span>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext 
                                            href={`?page=${currentPage + 1}#comments`}
                                            text="Наступні"
                                            aria-disabled={currentPage >= totalPages} 
                                            className={currentPage >= totalPages ? "pointer-events-none opacity-40 " : "rounded-full"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )
                    }
                </div>
            </div>
        </main>
    );
}
