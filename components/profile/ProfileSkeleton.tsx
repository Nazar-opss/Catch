export default function ProfileSkeleton() {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start animate-pulse">
                <aside className="w-full lg:w-[320px] shrink-0">
                    <div className="bg-card rounded-[24px] border min-h-150 border-border shadow-sm p-8 flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-secondary" />
                            <div className="h-5 w-32 rounded-md bg-secondary" />
                            <div className="h-4 w-24 rounded-md bg-secondary" />
                        </div>
                        <div className="w-full h-px bg-secondary" />
                        <div className="h-40 w-full mt-5 rounded-2xl bg-primary/20" />
                        <div className="w-full h-10 mt-10 rounded-md bg-secondary" />
                        <div className="w-full h-10 rounded-md bg-secondary" />
                        <div className="w-full h-10 mt-20 rounded-md bg-secondary" />
                    </div>
                </aside>
                <div className="flex-1 min-w-0 w-full">
                    <div className="flex gap-3 mb-6">
                        <div className="h-12 w-48 rounded-xl bg-secondary" />
                        <div className="h-12 w-48 rounded-xl bg-secondary" />
                        <div className="h-12 w-48 rounded-xl bg-secondary" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-100 rounded-[24px] border border-border bg-card">
                                <div className="h-40 rounded-t-[24px] bg-secondary" />
                                <div className="p-4 flex flex-col gap-2">
                                    <div className="p-4 flex flex-col gap-3">
                                        <div className="h-4 w-3/4 rounded-md bg-secondary" />
                                        <div className="h-4 w-1/2 rounded-md bg-secondary" />
                                    </div>
                                    <div className="p-4 flex flex-col gap-3">
                                        <div className="h-4 w-3/4 rounded-md bg-secondary" />
                                        <div className="h-4 w-1/2 rounded-md bg-secondary" />
                                    </div>
                                    <div className="w-full h-10 rounded-md bg-secondary" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
