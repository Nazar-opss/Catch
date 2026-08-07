"use client"
import { CldImage } from "next-cloudinary"
import Link from "next/link"
import NoImage from "../ui/noImage"
import RatingButton from "../ui/rating-button"
import { dealPercentCalculate, isDealExpired } from "@/lib/utils"
import { DealWithAuthor } from "@/app/(main)/page"
import DealPrice from "./parts/DealPrice"
import DealCTA from "./parts/DealCTA"
import DealMeta from "./parts/DealMeta"
import { Clock } from "lucide-react"
import { useState } from "react"

export interface DealCardProps {
    deal: DealWithAuthor;
    layout: "grid" | "list"
}

export default function DealCard({ deal, layout }: DealCardProps) {
    const [imageError, setImageError] = useState(false);
    const dealPercent = dealPercentCalculate(deal.oldPrice, deal.newPrice)
    const expired = isDealExpired(deal)
    const imageUrl = deal.imageUrls[0];
    const isExternalImage = imageUrl && !imageUrl.includes("res.cloudinary.com");
    return (
        <>
            <article data-layout={layout} key={deal.id} className="flex w-full items-center bg-card p-5 border border-border rounded-[16px] data-[layout=list]:flex-row data-[layout=list]:gap-5 data-[layout=grid]:flex-col data-[layout=grid]:h-full ">
                <div data-layout={layout} key={deal.imageUrls[0]} className="relative flex aspect-4/3 overflow-hidden p-4 justify-center items-center rounded-lg border border-border bg-background w-57.5 h-[172.5px] shrink-0 data-[layout=list]:w-[256px] data-[layout=list]:h-full data-[layout=grid]:h-[172.5px] data-[layout=grid]:w-full">
                    {
                        deal.imageUrls[0] && !imageError ? (
                            <CldImage
                                width={230}
                                height={230}
                                loading="eager"
                                deliveryType={isExternalImage ? "fetch" : undefined}
                                src={deal.imageUrls[0]}
                                alt={deal.title}
                                className={`object-contain h-full w-full ${expired ? "opacity-60" : ""}`}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <NoImage layout={layout}/>
                        )
                    }
                    <div className="absolute left-3 top-3 flex items-center">
                        <RatingButton rating={Number(deal.temperature)} dealId={deal.id} reply={false} isExpired={deal.isExpired} userVote={deal.userVote} />
                    </div>
                    {expired && (
                        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            <Clock className="h-3.5 w-3.5" />
                            Закінчилася
                        </div>
                    )}
                </div>
                <div className={`flex flex-col flex-1 gap-3 w-full ${layout === "list" ? "mt-0 md:gap-5 " : "mt-4"} `}>
                    {
                        layout === "list" ? (
                            <>
                                <Link href={`/deal/${deal.id}`} className="text-[16px] text-card-foreground font-semibold line-clamp-2 hover:text-primary transition-colors">{deal.title}</Link>
                                <DealPrice oldPrice={deal.oldPrice} newPrice={deal.newPrice} dealPercent={dealPercent} textSize={["text-[26px]", "text-[16px]", "text-[13px]"]} />
                            </>
                        ) : (
                            <>
                                <DealPrice oldPrice={deal.oldPrice} newPrice={deal.newPrice} dealPercent={dealPercent} />
                                <Link href={`/deal/${deal.id}`} className="text-[16px] text-card-foreground font-semibold line-clamp-2 hover:text-primary transition-colors">{deal.title}</Link>
                            </>
                        )
                    }

                    <DealMeta deal={deal} layout={layout} />
                    {
                        layout === "grid" && deal.link &&
                        <DealCTA link={deal.link} layout={layout} />
                    }
                </div >
            </article >
        </ >
    )
}