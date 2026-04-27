import CommentItem from "@/components/comments/CommentItem";
import CommentInput from "@/components/comments/CommentInput";
import { DealsCarousel } from "@/components/deals/DealsCarousel";
import NoImage from "@/components/ui/noImage";
import { db } from "@/server/db";

import { Info } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface DealPageProps {
    params: Promise<{ id: string }>;
}

const imageStyle = "rounded-lg object-contain w-full h-full"

export default async function DealPage({ params }: DealPageProps) {
    const { id } = await params;

    const deal = await db
        .selectFrom("deal")
        .selectAll().select((eb) => [
            eb.selectFrom("comment")
                .whereRef("comment.dealId", "=", "deal.id")
                .select(eb.fn.count<number>("id").as("count"))
                .as("commentCount")
        ])
        .where("id", "=", id)
        .executeTakeFirst();

    if (!deal) {
        notFound();
    }

    const comments = await db
        .selectFrom("comment")
        .innerJoin("user", "user.id", "comment.userId")
        .selectAll("comment")
        .select([
            "user.name as authorName",
            "user.image as authorImage"
        ])
        .where("comment.dealId", "=", deal.id)
        .orderBy("comment.createdAt", "desc")
        .execute();



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
                        <CommentInput />
                        <div className="space-y-8">
                            {comments.map((comment) => {
                                return (
                                    <CommentItem key={comment.id} comment={comment} />
                                )
                            })}
                        </div>
                    </div>
                </div>


                <div className="lg:col-span-4 sticky top-24">

                </div>
            </div>
        </main>
    )
}