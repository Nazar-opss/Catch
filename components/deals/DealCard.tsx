"use client"
import { CldImage } from "next-cloudinary"
import { Selectable } from "kysely"
import { Deal } from "@/prisma/types/types"
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronUp, ExternalLink, MessageCircleMore, MinusIcon, PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
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
type DealWithAuthor = Selectable<Deal> & {
    authorName: string
    authorImage: string | null
    commentCount: number | string | null
}

interface DealCardProps {
    deal: DealWithAuthor;
}

export default function DealCard({ deal }: DealCardProps) {
    const authorImage = deal.authorImage || "/placeholder.jpg";
    return (
        <div>
            <article key={deal.id} className="flex flex-col h-full bg-white p-5 border border-slate-200 rounded-[16px] ">
                <div key={deal.imageUrls[0]} className="w-full aspect-4/3 overflow-hidden p-4 justify-center flex items-center rounded-lg border border-slate-200 bg-slate-50 relative">
                    <CldImage
                        width={320}
                        height={230}
                        loading="eager"
                        crop={{
                            type: 'fit',
                            source: true,
                        }}
                        src={deal.imageUrls[0]}
                        alt={deal.title}
                        className="object-contain w-full h-full"
                    />
                </div>
                <div className="flex flex-col flex-1 mt-4 gap-3">
                    <div className="gap-1.5 flex items-center h-[36px]">
                        <div className="flex items-center bg-slate-50 px-1.5 py-1 border border-slate-100 rounded-full">
                            <ButtonGroup
                                orientation="horizontal"
                                // aria-label="Media controls"

                                // continue work here with buttons

                                className="justify-center items-center "
                            >
                                <Button variant="ghost" className="p-1.5 cursor-pointer hover:bg-slate-200/50">
                                    <ChevronUp width={14} height={14} strokeWidth={3} className="text-slate-400 " />
                                </Button>
                                <span className="text-[14px] font-bold text-slate-900 px-1">
                                    {deal.temperature}
                                </span>
                                <Button variant="ghost" className="p-1.5 cursor-pointer hover:bg-slate-200/50">
                                    <ChevronDown width={14} height={14} strokeWidth={3} className=" text-slate-400" />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[22px] text-slate-900 font-bold tracking-tight leading-none">{deal.newPrice} грн</span>
                        <span className="text-[14px] text-slate-500 line-through font-medium">{deal.oldPrice ? `${deal.oldPrice} грн` : ""}</span>
                        {deal.oldPrice ? <span className="text-[12px] bg-red-50 text-red-600 px-2.5 py-0.5 rounded font-bold tracking-wide border border-red-200">{`${Math.round(((deal.oldPrice - deal.newPrice) / deal.oldPrice) * 100)}%`}</span> : null}
                    </div>
                    <Link href={''} className="text-[16px]  text-slate-900 font-semibold line-clamp-2 hover:text-orange-600 transition-colors">{deal.title}</Link>
                    <div className="flex flex-col gap-2.5 mt-auto pt-3">
                        <div className="text-xs text-slate-500 font-medium">
                            {deal.link.split("/")[2].charAt(0).toUpperCase() + deal.link.split("/")[2].slice(1)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <Image src={authorImage} alt={deal.authorName} className="rounded-full" width={20} height={20} />
                            <span>{deal.authorName}</span>
                            <span className="text-slate-300">•</span>
                            <span>{dayjs(deal.createdAt).fromNow()}</span>
                            <span className="text-slate-300">•</span>
                            <span className="flex items-center gap-1">
                                <MessageCircleMore className="w-3 h-3" />
                                {deal.commentCount}
                            </span>
                        </div>
                    </div>
                    <Link href={deal.link} className=" ">
                        <Button variant="outline" className="rounded-lg mt-3 shadow-sm bg-white px-4 py-2.5 cursor-pointer border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-[13px] h-[41.5px] w-full text-slate-800 gap-2 font-semibold transition-colors flex justify-center items-center">
                            До знижки
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                        </Button>
                    </Link>
                </div>
            </article>
        </div>
    )
}