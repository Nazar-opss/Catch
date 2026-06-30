"use client"
import { ButtonGroup } from "./button-group";
import { Button } from "./button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { voteCommentAction, voteDealAction } from "@/lib/actions/votes";
import { QueryClientContext } from "@tanstack/react-query";
import { useRouter } from "next/navigation"
import { useContext } from "react";
import type { DealsPage } from "@/lib/actions/deals";

type DealsInfiniteData = {pages: DealsPage[]; pageParams: unknown[]}

export default function RatingButton({ userVote, commentId, dealId, authorId, rating, reply, fontSize, iconSize, deal }: { userVote?: number | null, commentId?: string, dealId: string, authorId: string, rating: number, reply?: boolean, fontSize?: string, iconSize?: string, deal?: boolean }) {

    const queryClient = useContext(QueryClientContext)
    const router = useRouter()

    const buttonSize = reply ? "p-1" : "p-1.5";
    const buttonStyle = `cursor-pointer transition-colors bg-transparent  rounded-full! ${deal ? "w-10 h-10" : "w-6 h-6"}`

    function handleDealVote(voteValue: number) {
        queryClient?.setQueriesData<DealsInfiniteData>({
            queryKey: ["deals"] }, (old) => {
                if (!old) return old
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        items: page.items.map((item) => {
                            if (item.id !== dealId) return item
                            const current = item.userVote ?? 0
                            const newVote = current === voteValue ? 0 : voteValue
                            const delta = newVote - current
                            return {
                                ...item,
                                userVote: newVote === 0 ? null : newVote,
                                temperature: Number(item.temperature) + delta
                            }
                        })
                    }))
                }
            })
        voteDealAction(dealId, authorId, voteValue).then((res) => {
            if (res?.error) {
                queryClient?.invalidateQueries({queryKey: ["deals"]})
            }
            router.refresh()
        })
    }


    return (
        <ButtonGroup
            orientation="horizontal"

            className={` flex justify-center items-center bg-background gap-1 border border-border rounded-full px-1 py-0.5 ${deal ? "h-12.5!" : "h-7.5!"}`}
        >
            <Button onClick={() => { if (commentId) { voteCommentAction(dealId, commentId, 1) } else { handleDealVote(1) } }} className={`${buttonSize} ${buttonStyle} hover:bg-green-600/50 hover:text-green-600 ${userVote === 1 ? "text-green-600 bg-green-600/50" : "text-slate-400"}`}>
                <ChevronUp width={iconSize || 14} height={iconSize || 14} strokeWidth={3} />
            </Button>
            <span className={`${fontSize ? fontSize : "text-sm"} font-bold text-foreground ${deal ? "px-3" : "px-1"}`}>
                {rating > 0 ? `+${rating}` : rating}
                {/* {reply ? "" : "°"} -- return this if decide to keep temperature as concept */} 
                {reply}
            </span>
            <Button onClick={() => { if (commentId) { voteCommentAction(dealId, commentId, -1) } else { handleDealVote(-1) } }} className={`${buttonSize} ${buttonStyle} hover:bg-red-600/50 hover:text-red-600 ${userVote === -1 ? "text-red-600 bg-red-600/50" : "text-slate-400"}`}>
                <ChevronDown width={iconSize || 14} height={iconSize || 14} strokeWidth={3} />
            </Button>
        </ButtonGroup>
    )
}