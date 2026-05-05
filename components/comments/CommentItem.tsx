"use client"
import dayjs from "dayjs";
import { Selectable } from "kysely";
import Image from "next/image";
import { Comment } from "@/prisma/types/types";
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import RatingButton from "../ui/rating-button";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import CommentInput from "./CommentInput";
import { ChevronDown } from "lucide-react";

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "за %s",
        past: "%s",
        s: 'декілька сек',
        m: "1 хв",
        mm: "%d хв",
        h: "1 год",
        hh: "%d год",
        d: "1 дн",
        dd: "%d дн",
        M: "1 міс",
        MM: "%d міс",
        y: "1 р",
        yy: "%d р"
    }
})

type CommentWithAuthor = Selectable<Comment> & {
    authorName: string;
    authorImage: string | null;
    rating: number | null;
    replies?: CommentWithAuthor[];
};

interface CommentItemProps {
    comment: CommentWithAuthor;
}

export default function CommentItem({ comment }: CommentItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>

            <div className="flex gap-4" key={comment.id}>
                {comment.authorImage ? (
                    <Image src={comment.authorImage} alt={comment.authorName} width={40} height={40} className=" shrink-0 h-10 w-10 rounded-full object-cover border border-slate-200" />
                ) : (
                    <div className="shrink-0 rounded-full w-10 h-10 bg-orange-600 text-white flex items-center justify-center">
                        {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex gap-2 items-center mb-1">
                        <p className="font-semibold text-slate-900 hover:text-orange-600 transition-colors text-[15px]">{comment.authorName}</p>
                        <span className="text-slate-300 text-[13px]">•</span>
                        <span className="text-slate-500 text-[13px]">{dayjs(comment.createdAt).fromNow()}</span>
                    </div>
                    <p className="text-slate-700 text-[15px] leading-relaxed mb-2.5">{comment.content}</p>
                    <Collapsible open={isOpen} onOpenChange={setIsOpen} >
                        <div className="flex items-center gap-2">
                            <RatingButton commentId={comment.id} dealId={comment.dealId} authorId={comment.authorId} rating={Number(comment.rating ?? 0)} reply />
                            <CollapsibleTrigger className="text-slate-400 hover:text-slate-900 transition-colors font-medium text-[13px] cursor-pointer">
                                Відповісти
                            </CollapsibleTrigger>

                        </div>
                        <CollapsibleContent className="mt-4">
                            <CommentInput dealId={comment.dealId} reply={true} parentName={comment.authorName} parentId={comment.id} />
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
            {/* {
                comment.replies && comment.replies.length > 0 && (
                    <>
                        <div className="ml-5 pl-6 mt-4 border-l-2 border-slate-200">
                            {comment.replies.map((reply) => (
                                <CommentItem key={reply.id} comment={reply} />
                            ))}
                        </div>
                        <div className="w-full h-px bg-slate-100 my-6"></div>
                    </>
                )
            } */}
            {comment.replies && comment.replies.length > 0 && (
                <>
                    <div className="ml-5 pl-6 mt-4 border-l-2 border-slate-200">
                        {comment.replies.slice(0, 1).map((reply) => (
                            <CommentItem key={reply.id} comment={reply} />
                        ))}

                        {comment.replies.length > 1 && (
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium cursor-pointer mb-4">
                                    <ChevronDown className="w-4 h-4" />
                                    Показати ще {comment.replies.length - 1} відповідей
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col">
                                    {comment.replies.slice(1).map((reply) => (
                                        <CommentItem key={reply.id} comment={reply} />
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        )}
                    </div>
                    <div className="w-full h-px bg-slate-100 my-6" />
                </>
            )}

        </div>
    )
}