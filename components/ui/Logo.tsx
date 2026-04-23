function Logo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#ea580c] transition-transform group-hover:scale-105">
                <path d="M12 2C12 2 8 6 8 11C8 14 10 16 10 16C10 16 9 14 10 12C10 12 14 16 13 20C13 20 18 16 18 11C18 6 12 2 12 2Z"></path>
                <path d="M11.5 22C9 22 7 20 7 17.5C7 16 8.5 13 8.5 13C8.5 13 7.5 15 8.5 17.5C8.5 17.5 12 21 15.5 18C15.5 18 14 22 11.5 22Z" opacity="0.4"></path>
            </svg>
            <span className="text-[22px] font-bold tracking-tight text-slate-900">
                Catch
            </span>
        </div>
    )
}

export { Logo }