import { Modal } from "../../../components/common/Modal";

import { useComments } from "../hooks/useComments";

import { CommentItem } from "./CommentItem";
import { CreateComment } from "./CreateComment";

interface Props {
  open: boolean;
  onClose: () => void;
  announcementId: number;
}

export function CommentsModal({
  open,
  onClose,
  announcementId,
}: Props) {
  const { data: comments, isLoading } =
    useComments(announcementId);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Şərhlər"
    >
      {isLoading ? (
        <p className="text-center py-8 text-slate-500">
          Yüklənir...
        </p>
      ) : comments?.length ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-slate-500">
          Hələ heç bir şərh yoxdur.
        </p>
      )}

      <CreateComment announcementId={announcementId} />
    </Modal>
  );
}