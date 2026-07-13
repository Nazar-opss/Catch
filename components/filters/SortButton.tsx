import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { Button } from "../ui/button";

export function SortButton({ paramKey = "sort", value, active, label }: { paramKey?: string, value: string, active: boolean, label: string }) {
    const setParam = useSearchParamSetter()

    return (
        <Button onClick={() => setParam(paramKey, value)} className={`items-center justify-center px-5 py-2 ${active ? "bg-foreground shadow-sm text-background hover:bg-foreground/90 hover:text-background" : "bg-transparent text-muted-foreground hover:bg-border/50 hover:text-foreground"} h-full text-[14px] font-medium border-0 rounded-full cursor-pointer transition-all`}>
            {label}
        </Button>
    )
}