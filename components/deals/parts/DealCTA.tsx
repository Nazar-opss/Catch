import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DealCTA({ link, layout }: { link: string, layout: "grid" | "list" }) {
    return (
        <Link href={link} target="_blank" rel="noopener noreferrer" >
            <Button variant="outline" className={`rounded-lg shadow-sm bg-white px-4 py-2.5 cursor-pointer border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-[13px] h-[41.5px] w-full text-slate-800 gap-2 font-semibold transition-colors flex justify-center items-center ${layout === "grid" ? "mt-3" : "mt-auto"}`}>
                До знижки
                <ExternalLink className="w-3 h-3 text-slate-400" />
            </Button>
        </Link>
    )
}