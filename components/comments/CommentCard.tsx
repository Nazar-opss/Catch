import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import { ChevronDown, ChevronUp, Minus, MoveRight } from "lucide-react";
import Link from "next/link";

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "за %s",
        past: "%s",
        s: 'декілька секунд тому',
        m: "1 хв тому",
        mm: "%d хв тому",
        h: "1 год тому",
        hh: "%d год тому",
        d: "1 дн тому",
        dd: "%d дн тому",
        M: "1 міс тому",
        MM: "%d міс тому",
        y: "1 р",
        yy: "%d р"
    }
})

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
        <article className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-1 text-sm mb-2">
                <div className="flex items-center">
                    <div className=" text-slate-500">
                        {
                            isOwnProfile ? "Ви прокоментували знижку:" : `Коментар до знижки:`
                        }
                        <span className="font-semibold text-gray-900"> {comment.dealTitle}</span>
                    </div>
                </div>
                <span className="text-slate-400"> • </span>
                <div className="text-sm text-gray-500">{dayjs(comment.createdAt).fromNow()}</div>
            </div>
            <p className="mt-3 leading-relaxed text-gray-700 text-[16px]">{comment.content}</p>
            <div className="flex items-center justify-between gap-4 mt-5">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 text-slate-500 rounded-full">
                    { comment.rating > 0 ? <ChevronUp className="w-4 h-4" /> : comment.rating < 0 ? <ChevronDown className="w-4 h-4" /> : <Minus className="w-4 h-4" /> }
                    <span className={"font-semibold text-sm text-slate-700"}>
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