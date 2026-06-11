import dayjs from "@/lib/dayjs";
import { ChevronDown, ChevronUp, Minus, MoveRight } from "lucide-react";
import Link from "next/link";

interface CommentCardProps {
    createdAt: Date;
    content: string;
    id: string;
    authorId: string;
    dealId: string;
    parentId: string | null;
    rating: number;
    userVote: number | null;
    dealTitle: string;
}

export default function CommentCard({ comment, isOwnProfile }: { comment: CommentCardProps; isOwnProfile: boolean }) {
    // TODO: add comment tree and indent comments based on their level in the tree, add link straight to comment using comment id and scroll to it on click

    return (
        <article className="bg-card border border-secondary rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-1 text-sm mb-2">
                <div className="flex items-center">
                    <div className="text-muted-foreground">
                        {
                            isOwnProfile ? "Ви прокоментували знижку:" : `Коментар до знижки:`
                        }
                        <span className="font-semibold text-foreground"> {comment.dealTitle}</span>
                    </div>
                </div>
                <span className="text-slate-400"> • </span>
                <div className="text-sm text-muted-foreground">{dayjs(comment.createdAt).fromNow()}</div>
            </div>
            <p className="mt-3 leading-relaxed text-secondary-foreground text-[16px]">{comment.content}</p>
            <div className="flex items-center justify-between gap-4 mt-5">
                <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 text-muted-foreground rounded-full">
                    { comment.rating > 0 ? <ChevronUp className={`w-4 h-4 ${comment.rating > 0 ? "text-green-500" : comment.rating < 0 ? "text-red-500" : ""}`} /> : comment.rating < 0 ? <ChevronDown className={`w-4 h-4 ${comment.rating > 0 ? "text-green-500" : comment.rating < 0 ? "text-red-500" : ""}`} /> : <Minus className="w-4 h-4" /> }
                    <span className={"font-semibold text-sm text-secondary-foreground"}>
                        {comment.rating > 0 ? `+${comment.rating}` : comment.rating}
                    </span>
                </div>
                <Link className="text-sm text-orange-600 font-medium hover:underline inline-flex items-center gap-1" href={`/deal/${comment.dealId}`}>
                    Перейти до коментаря
                    <MoveRight className="w-4 h-4" />
                </Link>
            </div>
        </article>
    );
}