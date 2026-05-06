import { Selectable } from "kysely";
import { Comment } from "@/prisma/types/types";

type CommentWithAuthor = Selectable<Comment> & {
    authorName: string;
    authorImage: string | null;
    rating: number | null;
    userVote?: number | null;
    replies?: CommentWithAuthor[];
};

export function buildCommentTree(comments: CommentWithAuthor[]) {
    const commentMap = new Map<string, CommentWithAuthor>();

    comments.forEach(comment => {
        commentMap.set(comment.id, { ...comment, replies: [] });
    });

    const commentTree: CommentWithAuthor[] = [];

    comments.forEach(comment => {
        const mappedComment = commentMap.get(comment.id)!;

        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.replies!.push(mappedComment);
            }
        } else {
            commentTree.push(mappedComment);
        }
    });

    return commentTree;
}