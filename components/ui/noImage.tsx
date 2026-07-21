import { SquarePercent } from "lucide-react";

export default function NoImage({ layout }: {layout?: string}) {
    return (
        <div className={`flex flex-col justify-center items-center ${layout === "grid" ? "w-55" : "w-[256px]"} `}>
            <SquarePercent className="w-12 h-12 text-slate-500" />
            <span className="text-slate-500 font-medium">Зображення відсутнє</span>
        </div>
    )
}