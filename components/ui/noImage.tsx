import { SquarePercent } from "lucide-react";

export default function NoImage({ layout, dealPage }: {layout?: string, dealPage?: boolean}) {
    return (
        <div className={`flex flex-col justify-center items-center ${layout === "grid" ? "w-55" : "w-[256px]"} `}>
            <SquarePercent className={`w-12 h-12 ${dealPage && "w-20 h-20"} text-slate-500`} />
            <span className={`text-slate-500 ${dealPage && "text-2xl"} font-medium`}>Зображення відсутнє</span>
        </div>
    )
}