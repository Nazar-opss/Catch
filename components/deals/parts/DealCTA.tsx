import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DealCTA({ link, layout }: { link: string, layout: "grid" | "list" }) {
    return (
        <Link href={link} target="_blank" rel="noopener noreferrer" >
            <Button variant="outline" className={`rounded-lg shadow-sm bg-card px-4 py-2.5 cursor-pointer border border-border hover:border-slate-300 hover:bg-secondary text-[13px] h-[41.5px] w-full text-muted-foreground gap-2 font-semibold transition-colors flex justify-center items-center ${layout === "grid" ? "mt-3" : "mt-auto"}`}>
                До знижки
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
            </Button>
        </Link>
    )
}