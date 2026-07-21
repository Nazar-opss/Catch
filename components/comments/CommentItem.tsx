"use client"
import dayjs from "@/lib/dayjs";
import Image from "next/image";
import RatingButton from "../ui/rating-button";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import CommentInput from "./CommentInput";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import Link from "next/link";
import type { CommentWithAuthor } from "@/lib/buildCommentTree";

interface CommentItemProps {
    comment: CommentWithAuthor;
    userVote?: number | null;
    dealAuthorId: string;
}

export default function CommentItem({ comment, userVote, dealAuthorId }: CommentItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [collapsibleState, setCollapsibleState] = useState(false)

    return (
        <div>
            <div className="flex gap-2 md:gap-4 pt-4.5" key={comment.id}>
                {comment.authorImage ? (
                    <Image src={comment.authorImage} alt={comment.authorName} width={40} height={40} unoptimized quality={90} className=" shrink-0 h-10 w-10 rounded-full object-cover border border-border" />
                ) : (
                    <div className="shrink-0 rounded-full w-10 h-10 bg-primary text-primary-foreground  flex items-center justify-center">
                        {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 items-center mb-1">
                        <Link href={`/user/${comment.authorUsername}`} className="font-semibold text-card-foreground hover:text-primary transition-colors text-[15px]">
                            {comment.authorName}
                        </Link>
                        {
                            comment.authorId === dealAuthorId && (
                                <span className="bg-orange-300/25 rounded-full text-primary text-[13px] px-2">Автор</span>
                            )
                        }
                        <span className="text-muted-foreground text-[13px]">•</span>
                        <span className="text-muted-foreground text-[13px]">{dayjs(comment.createdAt).fromNow()}</span>
                    </div>
                    <p className="text-secondary-foreground text-[15px] leading-relaxed mb-2.5">{comment.content}</p>
                    <Collapsible open={isOpen} onOpenChange={setIsOpen} >
                        <div className="flex items-center gap-2">
                            <RatingButton commentId={comment.id} dealId={comment.dealId} userVote={userVote} rating={Number(comment.rating ?? 0)} reply />
                            <CollapsibleTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-medium text-[13px] cursor-pointer">
                                <MessageSquare size={16} />
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
                    <div className="ml-2 md:ml-14 pl-3 md:pl-4 border-l border-border">
                        {comment.replies.slice(0, 1).map((reply) => (
                            <CommentItem key={reply.id} comment={reply} userVote={reply.userVote} dealAuthorId={dealAuthorId} />
                        ))}

                        {comment.replies.length > 1 && (
                            <Collapsible open={collapsibleState} onOpenChange={setCollapsibleState} className="gap-4">
                                <CollapsibleContent className="flex flex-col">
                                    {comment.replies.slice(1).map((reply) => (
                                        <CommentItem key={reply.id} comment={reply} userVote={reply.userVote} dealAuthorId={dealAuthorId} />
                                    ))}
                                </CollapsibleContent>
                                <CollapsibleTrigger className="flex items-center gap-1.5 text-sm text-primary hover:text-orange-700 transition-colors font-medium cursor-pointer mt-2" >
                                    
                                    {collapsibleState === false ? <>
                                    <ChevronDown size={16} /> Показати ще {comment.replies.length - 1} відповідей
                                    </> : <>
                                      <ChevronUp size={16} />
                                      Сховати відповіді
                                    </>
                                    }
                                </CollapsibleTrigger>
                            </Collapsible>
                        )}
                    </div>
                    {/* <div className="w-full h-px bg-secondary my-6" /> */}
                </>
            )}
        </div>
    )
}