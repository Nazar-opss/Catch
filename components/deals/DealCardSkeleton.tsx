export default function DealCardSkeleton({layout}: {layout: "grid" | "list"}) {
    return (
        <article 
            data-layout={layout} 
            className="flex items-center bg-card p-5 border border-border rounded-[16px] animate-pulse data-[layout=list]:flex-row data-[layout=list]:gap-5 data-[layout=grid]:flex-col data-[layout=grid]:h-full">
                <div className="aspect-4/3 w-full rounded-lg bg-muted data-[layout=list]:max-w-60 data-[layout=list]:max-h-69" data-layout={layout} />
            <div className={`flex flex-col flex-1 w-full ${layout === "list" ? "gap-5" : "mt-4 gap-3"}`}>
                <div className="h-7 w-1/3 rounded bg-muted" />     {/* ціна */}
                <div className="h-4 w-full rounded bg-muted" />     {/* заголовок */}
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />     {/* meta */}
            </div>
        </article>
    )
}