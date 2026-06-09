'use client'
import Link from "next/link"
import RatingButton from "../ui/rating-button"
import { Button } from "../ui/button"
import { Bookmark, Clock, ExternalLink } from "lucide-react"
import { dealPercentCalculate, getShopIcon, getShopName } from "@/lib/utils"
import Image from "next/image"
import { saveDealAction } from "@/lib/actions/saved"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

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

interface DealAsideInfoProps {
    id: string;
    createdAt: Date;
    link: string;
    title: string;
    newPrice: number;
    oldPrice: number | null;
    description: string | null;
    imageUrls: string[];
    temperature: number;
    authorId: string;
    authorUsername: string;
    authorName: string;
    authorImage: string | null;
    commentCount: number | null;
    userVote: number | null;
}

export default function DealAsideInfo({deal}: { deal: DealAsideInfoProps }) {

    return (
        <div className="sticky top-23 flex flex-col gap-4">
            <div className="bg-card rounded-[24px] border border-border p-6 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <span className="uppercase text-sm font-bold text-slate-400">
                        рейтинг знижки
                    </span>
                    <RatingButton dealId={deal.id} authorId={deal.authorId} rating={(deal.temperature)} userVote={deal.userVote} fontSize="text-2xl" iconSize="20" deal />
                </div>
                <div className="w-full h-px bg-secondary mb-6"></div>
                <div className="mb-6 flex flex-col gap-2">
                    <span className="font-extrabold text-[40px] leading-none text-card-foreground tracking-tight">{deal.newPrice} <span className="font-bold text-3xl">грн</span></span>
                    {deal.oldPrice && (
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-lg text-muted-foreground line-through font-medium decoration-slate-300">{deal.oldPrice} грн</span>
                            <span className="text-[14px] bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2.5 py-0.5 rounded font-extrabold tracking-wide border border-red-200 dark:border-red-500/30">-{dealPercentCalculate(deal.oldPrice, deal.newPrice)}%</span>
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
                    <span className="text-card-foreground items-center font-semibold gap-1.5 flex  ">
                        <Image src={getShopIcon(deal.link)} alt={getShopName(deal.link)} width={32} height={32} />
                        {getShopName(deal.link)}
                    </span>
                </div>
                <div className="w-full h-px bg-secondary my-6"></div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={`/user/${deal.authorUsername}`} className="relative">
                            <Image src={deal.authorImage ?? "/logo.png"} alt={deal.authorName} className="rounded-full w-10 h-10" width={20} unoptimized quality={90} height={20} />
                        </Link>
                        <div className="flex flex-col ">
                            <span className="text-xs text-muted-foreground mb-0.5 leading-tight">Опублікував</span>
                            <Link href={`/user/${deal.authorUsername}`}>
                                <span className="text-[14px] font-bold text-card-foreground hover:text-orange-600 transition-colors leading-tight">{deal.authorName}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md border text-muted-foreground border-secondary bg-secondary text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{dayjs(deal.createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>
            <Button onClick={() => saveDealAction({ dealId: deal.id })} className="flex items-center bg-transparent text-[13px] text-muted-foreground hover:text-card-foreground transition-colors gap-1.5 w-full justify-center hover:bg-card border cursor-pointer border-transparent hover:border-border hover:shadow-sm flex-1 rounded-lg py-2 px-3">
                <Bookmark className="w-4 h-4" />
                Зберегти
            </Button>
        </div>
    )
}