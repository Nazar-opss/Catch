import useSearchParamSetter from "@/hooks/useSearchParamSetter";
import { Button } from "../ui/button";

export function SortButton({ paramKey = "sort", value, active, label }: { paramKey?: string, value: string, active: boolean, label: string }) {
    const setParam = useSearchParamSetter()

    return (
        <Button onClick={() => setParam(paramKey, value)} className={`items-center justify-center px-5 py-2 ${active ? "bg-card-foreground text-background hover:bg-foreground" : "bg-background text-muted-foreground hover:bg-card hover:text-foreground"} h-full text-[14px] font-medium rounded-full cursor-pointer border border-border transition-all duration-300`}>
            {label}
        </Button>
    )
}