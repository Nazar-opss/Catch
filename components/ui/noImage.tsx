import { SquarePercent } from "lucide-react";

export default function NoImage() {
    return (
        <div className="flex flex-col items-center">
            <SquarePercent className="w-12 h-12 text-slate-500" />
            <span className="text-slate-500 font-medium">Зображення відсутнє</span>
        </div>
    )
}