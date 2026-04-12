import { Button } from "../ui/button";

export function CategoryButton({ category, active }: { category: string, active: boolean }) {
    return (
        <Button className={`items-center justify-center px-5 py-2 ${active ? "bg-slate-900 shadow-sm text-white hover:bg-slate-800 hover:text-white" : "bg-transparent text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"} h-full text-[14px] font-medium border-0 rounded-full cursor-pointer transition-all`}>
            {category}
        </Button>
    )
}