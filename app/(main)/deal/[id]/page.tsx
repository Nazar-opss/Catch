import CommentItem from "@/components/comments/CommentItem";
import CommentInput from "@/components/comments/CommentInput";
import { DealsCarousel } from "@/components/deals/DealsCarousel";
import NoImage from "@/components/ui/noImage";
import { db } from "@/server/db";
import { Clock, ExternalLink, Info } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildCommentTree } from "@/lib/buildCommentTree";
import RatingButton from "@/components/ui/rating-button";
import { dealPercentCalculate, getShopIcon, getShopName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "за %s",
        past: "%s",
        s: 'декілька сек тому',
        m: "1 хв тому",
        mm: "%d хв тому",
        h: "1 год тому",
        hh: "%d год тому",
        d: "1 дн тому",
        dd: "%d дн тому",
        M: "1 міс тому",
        MM: "%d міс тому",
        y: "1 р тому",
        yy: "%d р тому"
    }
})
interface DealPageProps {
    params: Promise<{ id: string }>;
}

const imageStyle = "rounded-lg object-contain w-full h-full"

export default async function DealPage({ params }: DealPageProps) {
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
                .as("userVote")
        ])
        .where("deal.id", "=", id)
        .executeTakeFirst();

    if (!deal) {
        notFound();
    }

    const comments = await db
        .selectFrom("comment")
        .innerJoin("user", "user.id", "comment.authorId")
        .selectAll("comment")
        .select((eb) => [
            "user.name as authorName",
            "user.image as authorImage",

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
        .orderBy("comment.createdAt", "desc")
        .execute();


    const threadComments = buildCommentTree(comments)

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {deal.imageUrls.length > 1 ? (
                        <DealsCarousel images={deal.imageUrls} imageStyle={imageStyle} />
                    ) :
                        deal.imageUrls[0] ? (
                            <div className="w-full flex items-center justify-center p-8 relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm aspect-video sm:aspect-21/9 lg:aspect-16/10">
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
                    <h1 className="text-3xl sm:text-[34px] font-extrabold tracking-tight leading-[1.2] text-balance ">
                        {deal.title}
                    </h1>
                    <div className="bg-white rounded-[20px] border border-slate-200 p-6 sm:p-8 mt-2 shadow-sm">
                        <h2 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2" >
                            <Info className="w-5 h-5 text-orange-600" />
                            Про знижку
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg " >
                            {deal.description}
                        </p>
                    </div>
                    <div className="bg-white rounded-[20px] border border-slate-200 p-6 sm:p-8 mt-2 shadow-sm">
                        <h2 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2" >
                            Коментарі
                            <span className="text-slate-500 font-normal text-lg">
                                ({deal.commentCount})
                            </span>
                        </h2>
                        <CommentInput dealId={deal.id} />
                        <div className="space-y-8">
                            {threadComments.map((comment) => {
                                return (
                                    <CommentItem key={comment.id} userVote={comment.userVote} comment={comment} />
                                )
                            })}
                            {threadComments.length === 0 && (
                                <p className="text-slate-500 text-sm">Коментарів поки що немає.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 sticky top-24">
                    <div className="sticky top-[92px] flex flex-col gap-4">
                        <div className="bg-white rounded-[24px] border border-slate-200 p-6 sm:p-7 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <span className="uppercase text-sm font-bold text-slate-400">
                                    рейтинг знижки
                                </span>
                                <RatingButton dealId={deal.id} authorId={deal.authorId} rating={(deal.temperature)} userVote={deal.userVote} fontSize="text-2xl" iconSize="20" deal />
                            </div>
                            <div className="w-full h-px bg-slate-100 mb-6"></div>
                            <div className="mb-6 flex flex-col gap-2">
                                <span className="font-extrabold text-[40px] leading-none text-slate-900 tracking-tight">{deal.newPrice} <span className="font-bold text-3xl">грн</span></span>
                                {deal.oldPrice && (
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-lg text-slate-400 line-through font-medium decoration-slate-300">{deal.oldPrice} грн</span>
                                        <span className="text-[14px] bg-red-50 text-red-600 px-2.5 py-0.5 rounded font-extrabold tracking-wide border border-red-200">-{dealPercentCalculate(deal.oldPrice, deal.newPrice)}%</span>
                                    </div>
                                )}
                            </div>
                            <Link href={deal.link} target="_blank" rel="noopener noreferrer">
                                <Button className="relative w-full h-full group overflow-hidden bg-[#ea580c] text-white font-bold text-[17px] py-4 rounded-xl! shadow-[0_4px_14px_0_rgba(234,88,12,0.39)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.23)] cursor-pointer group hover:-translate-y-0.5 transition-all  items-center justify-center gap-2 mb-4">
                                    <div className="absolute inset-0 bg-linear-to-t from-orange-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                                    </div>
                                    <span className="flex items-center z-10 gap-2 relative">

                                        Перейти до магазину
                                        <ExternalLink strokeWidth={3} className="w-5 h-5 transition-colors" />
                                    </span>
                                </Button>
                            </Link>
                            <div className="flex items-center justify-center gap-2 text-slate-500 text-[14px] font-medium">
                                Продавець:
                                <span className="text-slate-900 font-semibold gap-1.5 flex  ">
                                    <Image src={getShopIcon(deal.link)} alt={getShopName(deal.link)} width={20} height={20} />
                                    {getShopName(deal.link)}
                                </span>
                            </div>
                            <div className="w-full h-px bg-slate-100 my-6"></div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Link href={`/user/${deal.authorUsername}`} className="relative">
                                        <Image src={deal.authorImage ?? "/logo.png"} alt={deal.authorName} className="rounded-full w-10 h-10" width={20} height={20} />
                                    </Link>
                                    <div className="flex flex-col ">
                                        <span className="text-xs text-slate-500 mb-0.5 leading-tight">Опублікував</span>
                                        <Link href={`/user/${deal.authorUsername}`}>
                                            <span className="text-[14px] font-bold text-slate-900 hover:text-orange-600 transition-colors leading-tight">{deal.authorName}</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md border text-slate-400 border-slate-200 bg-slate-50 text-xs font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{dayjs(deal.createdAt).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}