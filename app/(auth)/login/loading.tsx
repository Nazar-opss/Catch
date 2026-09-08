function Placeholder({ className }: { className: string }) {
    return <div aria-hidden="true" className={`rounded-lg bg-secondary ${className}`} />
}

export default function LoginLoading() {
    return (
        <main
            className="flex items-center justify-center w-full"
            aria-busy="true"
            aria-label="Завантаження сторінки входу"
        >
            <section className="w-full max-w-120 rounded-[24px] bg-card shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex flex-col items-center animate-pulse">


                    <div className="mb-8 flex w-full flex-col gap-3.5">
                        <Placeholder className="h-9 w-full rounded-2xl!" />
                        <Placeholder className="h-9 w-full rounded-2xl!" />
                    </div>

                    <div className="mb-8 flex w-full items-center gap-4">
                        <div className="h-px flex-1 bg-secondary" />
                        <Placeholder className="h-4 w-8" />
                        <div className="h-px flex-1 bg-secondary" />
                    </div>

                    <div className="flex w-full flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Placeholder className="h-4 w-32" />
                            <Placeholder className="h-11 w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between ">
                                <Placeholder className="h-4 w-16" />
                                <Placeholder className="h-4 w-28 bg-primary/30!" />
                            </div>
                            <Placeholder className="h-11 w-full " />
                        </div>
                        <div className="flex w-full justify-center mt-3">
                            <Placeholder className="h-9 w-full rounded-2xl! bg-primary/30!" />
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}
