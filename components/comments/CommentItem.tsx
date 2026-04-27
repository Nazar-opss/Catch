import dayjs from "dayjs";
import { Selectable } from "kysely";
import Image from "next/image";
import { Comment } from "@/prisma/types/types";
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

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
};

interface CommentItemProps {
    comment: CommentWithAuthor;
}

export default function CommentItem({ comment }: CommentItemProps) {
    return (
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
                <p className="text-slate-700 text-[15px] leading-relaxed mb-2.5">{comment.text}</p>
            </div>
        </div>
    )
}