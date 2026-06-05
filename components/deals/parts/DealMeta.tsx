import dayjs from "dayjs"
import { Clock, MessageCircleMore } from "lucide-react"
import Image from "next/image"
import { getShopIcon, getShopName } from "@/lib/utils"
import DealCTA from "./DealCTA"
import { DealWithAuthor } from "@/app/(main)/page"

export default function DealMeta({ deal, layout }: { deal: DealWithAuthor, layout: "grid" | "list" }) {
    const authorImage = deal.authorImage || "/icons/avatar-default.svg";

    const iconSize = layout === "list" ? "w-4.5 h-4.5" : "w-3 h-3";
    const imageSize = layout === "list" ? 56 : 32;
    const metaSize = layout === "list" ? "text-sm" : "text-xs";

    return (
        <div className="flex flex-col gap-2.5 mt-auto">
            <div className={`flex items-center gap-2 text-slate-500 ${metaSize} font-medium`}>
                <Image src={getShopIcon(deal.link)} alt={getShopName(deal.link)} width={imageSize} height={imageSize} />
                {getShopName(deal.link)}
            </div>
            <div className="w-full h-px bg-secondary my-2"></div>
            <div className={`flex relative items-center text-slate-500 ${metaSize} ${layout === "list" ? "gap-2" : "justify-between"} font-medium`}>
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full overflow-hidden`}>
                        <Image src={authorImage} alt={deal.authorName} className="rounded-full object-cover w-full h-full" width={imageSize} height={imageSize} unoptimized quality={90} />
                    </div>

                    <span>{deal.authorName}</span>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1">
                        <Clock className={iconSize} />
                        <span>{dayjs(deal.createdAt).fromNow()}</span>
                    </div>
                </div>
                {layout === "list" && <span className="text-slate-300">•</span>}
                <div className="flex items-center gap-1">
                    <MessageCircleMore className={iconSize} />
                    {deal.commentCount}
                </div>
                {
                    layout === "list" &&
                    <div className="absolute right-0">
                        <DealCTA link={deal.link} layout={layout} />
                    </div>
                }
            </div>
        </div>
    )
}