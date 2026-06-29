import { useState } from "react";
import { useCreateComment } from "../hooks/useComments";

interface Props {
  announcementId: number;
}

export function CreateComment({ announcementId }: Props) {
  const [content, setContent] = useState("");

  const createComment = useCreateComment();

  const handleSubmit = () => {
    if (!content.trim()) return;

    createComment.mutate(
      {
        announcementId,
        content,
      },
      {
        onSuccess: () => setContent(""),
      }
    );
  };

  return (
    <div className="mt-4 border-t pt-4">
      <textarea
        rows={3}
        className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Şərh yazın..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={createComment.isPending}
        className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {createComment.isPending
          ? "Göndərilir..."
          : "Göndər"}
      </button>
    </div>
  );
}