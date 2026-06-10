interface DealPriceProps {
    oldPrice: number | null
    newPrice: number
    dealPercent: number
    textSize?: [string, string, string]
}

export default function DealPrice({ oldPrice, newPrice, dealPercent, textSize }: DealPriceProps) {
    
    return (
        <div className="flex items-center gap-2">
            <span className={`text-card-foreground font-bold tracking-tight leading-none ${textSize ? textSize[0] : "text-[22px]"}`}>{newPrice} грн</span>
            <span className={`text-slate-500 line-through font-medium ${textSize ? textSize[1] : "text-[14px]"}`}>{oldPrice ? `${oldPrice} грн` : ""}</span>
            {dealPercent ? <span className={`bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2.5 py-0.5 rounded font-bold tracking-wide border border-red-200 dark:border-red-500/30 ${textSize ? textSize[2] : "text-[12px]"}`}>{dealPercent > 0 ? `-${dealPercent}%` : `+${dealPercent.toString().split('-')[1]}%`}</span> : null}
        </div>
    )
}