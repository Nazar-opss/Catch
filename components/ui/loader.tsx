export default function Loader({ color = "white", gap = 2 }: { color?: string, gap?: number }) {
    return (
        <div className={`flex gap-${gap}`}>
            <div className={`w-1.5 h-1.5 bg-${color} rounded-full animate-bounce delay-100`}></div>
            <div className={`w-1.5 h-1.5 bg-${color} rounded-full animate-bounce delay-200`}></div>
            <div className={`w-1.5 h-1.5 bg-${color} rounded-full animate-bounce delay-300`}></div>
        </div>
    )
}