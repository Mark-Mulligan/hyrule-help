// react
import { type FC, type FormEvent, useState } from "react";

// trpc
import { api } from "~/utils/api";

interface IProps {
  handleClose: () => void;
  isOpen: boolean;
  questionId: string | undefined;
  onCommentAdd: () => void;
}

const CommentModal: FC<IProps> = ({
  isOpen,
  handleClose,
  questionId,
  onCommentAdd,
}) => {
  const [content, setContent] = useState("");

  const commentMutation = api.comments.addComment.useMutation({
    onSuccess: () => onCommentAdd(),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!questionId) return;
    commentMutation.mutate({ content, questionId });
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <button
          className="btn-sm btn-circle btn absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>

        <form onSubmit={handleSubmit}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">Comment</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea-bordered textarea h-24"
              placeholder="Bio"
              required
            ></textarea>
            <div className="mt-6 flex items-center justify-between">
              <button
                className="btn-error btn"
                type="submit"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button className="btn-success btn">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
