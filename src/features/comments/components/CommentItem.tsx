import type { Comment } from "../types/comment.types";
import { User } from "lucide-react";

interface Props {
  comment: Comment;
}

export function CommentItem({ comment }: Props) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-none">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
          <User size={16} className="text-slate-500" />
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            {comment.userName}
          </p>

          <p className="text-xs text-slate-400">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-700 whitespace-pre-wrap ml-12">
        {comment.content}
      </p>
    </div>
  );
}