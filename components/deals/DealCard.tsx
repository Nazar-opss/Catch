"use client"
import { CldImage } from "next-cloudinary"
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from "dayjs"
import Link from "next/link"
import NoImage from "../ui/noImage"
import RatingButton from "../ui/rating-button"
import { dealPercentCalculate } from "@/lib/utils"
import { DealWithAuthor } from "@/app/(main)/page"
import DealPrice from "./parts/DealPrice"
import DealCTA from "./parts/DealCTA"
import DealMeta from "./parts/DealMeta"

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "за %s",
        past: "%s",
        s: 'декілька сек',
        m: "1 хв",
        mm: "%d хв",
        h: "1 год",
        hh: "%d год",
        d: "1 дн",
        dd: "%d дн",
        M: "1 міс",
        MM: "%d міс",
        y: "1 р",
        yy: "%d р"
    }
})
interface DealCardProps {
    deal: DealWithAuthor;
    layout: "grid" | "list"
}

export default function DealCard({ deal, layout }: DealCardProps) {


    const dealPercent = dealPercentCalculate(deal.oldPrice, deal.newPrice)

    return (
        <div>
            <article data-layout={layout} key={deal.id} className="flex items-center bg-white p-5 border border-slate-200 rounded-[16px] data-[layout=list]:flex-row data-[layout=list]:gap-5 data-[layout=grid]:flex-col data-[layout=grid]:h-full ">
                <div key={deal.imageUrls[0]} className="relative aspect-4/3 overflow-hidden p-4 justify-center flex items-center rounded-lg border border-slate-200 bg-slate-50 data-[layout=list]:h-full data-[layout=list]:max-w-[240px]  data-[layout=list]:max-h-[276px] data-[layout=grid]:h-full">
                    {
                        deal.imageUrls[0] ? (
                            <CldImage
                                width={230}
                                height={230}
                                loading="eager"
                                src={deal.imageUrls[0]}
                                alt={deal.title}
                                className="object-contain h-full w-full"
                            />
                        ) : (
                            <NoImage />
                        )
                    }
                    <div className="absolute left-3 top-3 gap-1.5 flex items-center h-[36px]">
                        <div className="items-center bg-slate-200 px-0.5 py-0.5 border border-slate-100 rounded-full">
                            <RatingButton rating={Number(deal.temperature)} dealId={deal.id} authorId={deal.authorId} reply={false} userVote={deal.userVote} />
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col flex-1 ${layout === "list" ? "mt-0 gap-5" : "mt-4 gap-3"} `}>
                    {
                        layout === "list" ? (
                            <>
                                <Link href={`/deal/${deal.id}`} className="text-[16px]  text-slate-900 font-semibold line-clamp-2 hover:text-orange-600 transition-colors">{deal.title}</Link>
                                <DealPrice oldPrice={deal.oldPrice} newPrice={deal.newPrice} dealPercent={dealPercent} textSize={["text-[26px]", "text-[16px]", "text-[13px]"]} />
                            </>
                        ) : (
                            <>
                                <DealPrice oldPrice={deal.oldPrice} newPrice={deal.newPrice} dealPercent={dealPercent} />
                                <Link href={`/deal/${deal.id}`} className="text-[16px]  text-slate-900 font-semibold line-clamp-2 hover:text-orange-600 transition-colors">{deal.title}</Link>
                            </>
                        )
                    }

                    <DealMeta deal={deal} layout={layout} />
                    {
                        layout === "grid" &&
                        <DealCTA link={deal.link} layout={layout} />
                    }
                </div >
            </article >
        </div >
    )
}