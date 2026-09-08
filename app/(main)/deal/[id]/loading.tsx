function Placeholder({ className }: { className: string }) {
    return <div aria-hidden="true" className={`rounded-lg bg-secondary ${className}`} />
}

export default function DealLoading() {
    return (
        <main
            className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
            aria-busy="true"
            aria-label="Завантаження пропозиції"
        >
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                <div className="order-1 flex flex-col gap-6 lg:col-span-8 lg:col-start-1 lg:row-start-1">
                    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm sm:aspect-21/9 lg:aspect-16/10">
                        <div className="h-full w-full animate-pulse rounded-lg bg-secondary" />
                    </div>
                    <div className="animate-pulse flex justify-center flex-wrap gap-2" >
                        <Placeholder className="h-16 w-16" />
                        <Placeholder className="h-16 w-16" />
                        <Placeholder className="h-16 w-16" />
                        <Placeholder className="h-16 w-16" />
                        <Placeholder className="h-16 w-16" />
                    </div>


                    <div className="flex animate-pulse flex-col gap-3">
                        <Placeholder className="h-10 w-4/5 max-w-150" />
                    </div>
                </div>

                <aside className="order-3 lg:col-span-4 lg:col-start-9 lg:row-span-3 lg:row-start-1">
                    <div className="flex flex-col gap-4 rounded-[24px] border border-border bg-card p-6 shadow-sm sm:p-7 animate-pulse">
                        <div className="flex items-center justify-between">
                            <Placeholder className="h-4 w-32" />
                            <Placeholder className="h-8 w-16" />
                        </div>
                        <div className="h-px w-full bg-secondary" />
                        <Placeholder className="h-11 w-40" />
                        <div className="flex gap-3">
                            <Placeholder className="h-5 w-20" />
                            <Placeholder className="h-5 w-14" />
                        </div>
                        <Placeholder className="h-14 w-full rounded-xl! bg-primary/30!" />
                        <Placeholder className="mx-auto h-4 w-40" />
                        <div className="h-px w-full bg-secondary" />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Placeholder className="h-10 w-10 rounded-full!" />
                                <div className="flex flex-col gap-2">
                                    <Placeholder className="h-3 w-20" />
                                    <Placeholder className="h-4 w-28" />
                                </div>
                            </div>
                            <Placeholder className="h-6 w-18" />
                        </div>
                        <Placeholder className="h-9 w-full" />
                    </div>
                </aside>

                <section className="order-2 mt-2 rounded-[20px] border border-border bg-card p-6 shadow-sm sm:p-8 lg:col-span-8 lg:col-start-1 lg:row-start-2">
                    <div className="mb-4 flex items-center gap-2 animate-pulse">
                        <Placeholder className="h-5 w-5 rounded-full! bg-primary/30!" />
                        <Placeholder className="h-5 w-32" />
                    </div>
                    <div className="flex animate-pulse flex-col gap-3">
                        <Placeholder className="h-5 w-full" />
                        <Placeholder className="h-5 w-full" />
                        <Placeholder className="h-5 w-2/3" />
                    </div>
                </section>

                <section className="order-4 mt-2 rounded-[20px] md:border md:border-border md:bg-card md:p-6 md:shadow-sm lg:col-span-8 lg:col-start-1 lg:row-start-3">
                    <div className="mb-4 flex items-center gap-2 animate-pulse">
                        <Placeholder className="h-5 w-28" />
                        <Placeholder className="h-5 w-8" />
                    </div>
                    <div className="flex animate-pulse flex-col gap-4">
                        <Placeholder className="h-24 w-full" />
                        <div className="border-t border-secondary pt-4">
                            <div className="flex gap-3">
                                <Placeholder className="h-10 w-10 rounded-full!" />
                                <div className="flex flex-1 flex-col gap-2">
                                    <Placeholder className="h-4 w-28" />
                                    <Placeholder className="h-4 w-full" />
                                    <Placeholder className="h-4 w-3/4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
