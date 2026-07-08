"use client"
import dayjs from "@/lib/dayjs";
import Image from "next/image";
import RatingButton from "../ui/rating-button";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import CommentInput from "./CommentInput";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { CommentWithAuthor } from "@/lib/buildCommentTree";

interface CommentItemProps {
    comment: CommentWithAuthor;
    userVote?: number | null;
}

export default function CommentItem({ comment, userVote }: CommentItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="flex gap-4" key={comment.id}>
                {comment.authorImage ? (
                    <Image src={comment.authorImage} alt={comment.authorName} width={40} height={40} unoptimized quality={90} className=" shrink-0 h-10 w-10 rounded-full object-cover border border-border" />
                ) : (
                    <div className="shrink-0 rounded-full w-10 h-10 bg-primary text-primary-foreground  flex items-center justify-center">
                        {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex gap-2 items-center mb-1">
                        <Link href={`/user/${comment.authorUsername}`} className="font-semibold text-card-foreground hover:text-primary transition-colors text-[15px]">
                            {comment.authorName}
                        </Link>
                        <span className="text-muted-foreground text-[13px]">•</span>
                        <span className="text-muted-foreground text-[13px]">{dayjs(comment.createdAt).fromNow()}</span>
                    </div>
                    <p className="text-secondary-foreground text-[15px] leading-relaxed mb-2.5">{comment.content}</p>
                    <Collapsible open={isOpen} onOpenChange={setIsOpen} >
                        <div className="flex items-center gap-2">
                            <RatingButton commentId={comment.id} dealId={comment.dealId} userVote={userVote} authorId={comment.authorId} rating={Number(comment.rating ?? 0)} reply />
                            <CollapsibleTrigger className="text-muted-foreground hover:text-card-foreground transition-colors font-medium text-[13px] cursor-pointer">
                                Відповісти
                            </CollapsibleTrigger>

                        </div>
                        <CollapsibleContent className="mt-4">
                            <CommentInput dealId={comment.dealId} reply={true} parentName={comment.authorName} parentId={comment.id} onSuccess={() => setIsOpen(false)} />
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
                    <div className="ml-5 pl-6 mt-4 border-l-2 border-border">
                        {comment.replies.slice(0, 1).map((reply) => (
                            <CommentItem key={reply.id} comment={reply} userVote={reply.userVote} />
                        ))}

                        {comment.replies.length > 1 && (
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-card-foreground transition-colors font-medium cursor-pointer mb-4">
                                    <ChevronDown className="w-4 h-4" />
                                    Показати ще {comment.replies.length - 1} відповідей
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col">
                                    {comment.replies.slice(1).map((reply) => (
                                        <CommentItem key={reply.id} comment={reply} userVote={reply.userVote} />
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        )}
                    </div>
                    <div className="w-full h-px bg-secondary my-6" />
                </>
            )}

        </div>
    )
}