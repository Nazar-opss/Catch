import Loader from "./loader";

export default function PageLoader() {
    return (
        <div className="relative w-full h-full bg-slate-50/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="relative flex  items-center justify-center w-32 h-32">
                <div className="absolute -top-2 -right-2 text-orange-600 animate-sparkle-1" >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"></path>
                    </svg>
                </div>
                <div className="absolute -bottom-4 -left-2 text-orange-500 animate-sparkle-2" >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"></path>
                    </svg>
                </div>
                <div className="absolute top-4 -left-6 text-orange-400 animate-sparkle-3" >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"></path>
                    </svg>
                </div>
                <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-orange-600 animate-sparkle-4" >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"></path>
                    </svg>
                </div>
                <div className="absolute bottom-2 right-4 text-orange-500 animate-sparkle-5" >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"></path>
                    </svg>
                </div>
                <div className="animate-pulse-gentle">
                    <div className="animate-spin-slow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className=" lucide lucide-percent-icon  lucide-percent text-slate-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"><line x1="19" x2="5" y1="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-2">
                <span className="text-slate-900 text-xl font-semibold tracking-wide">Завантаження</span>
                <Loader color={"orange-600"} gap={1} />
            </div>
        </div>
    )
}