// React
import { useState } from "react";

// Next
import { useRouter } from "next/router";

// Moment JS
import moment from "moment";

// TRPC
import { api } from "~/utils/api";

// components
import CommentModal from "~/components/CommentModal";

const QuestionPage = () => {
  const router = useRouter();
  const questionId = router?.query?.id as string | undefined;

  const [showCommentModal, setShowCommentModal] = useState(false);

  const questionQuery = api.questions.getQuestion.useQuery(
    { id: questionId || "" },
    { enabled: !!questionId }
  );

  const commentsQuery = api.comments.getAllForQuestion.useQuery(
    {
      questionId: questionId || "",
    },
    { enabled: !!questionId }
  );

  const onCommentAdd = () => {
    setShowCommentModal(false);
    void commentsQuery.refetch();
  };

  return (
    <main className="container mx-auto min-h-screen max-w-4xl bg-base-100 bg-opacity-80 px-4 pb-16 pt-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-center text-5xl font-bold">
          {questionQuery.data?.title}
        </h1>
        <ul>
          <div className="grid grid-cols-2">
            <li className="mb-2">
              <h2 className="text-lg font-bold">Categories</h2>
              <ul>
                {questionQuery.data?.categories.split(",").map((category) => {
                  return (
                    <li className="badge-outline badge mr-2" key={category}>
                      {category}
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="mb-2">
              <h2 className="text-lg font-bold">Game</h2>
              <p>
                {questionQuery.data?.game === "botw"
                  ? "Breath of the Wild"
                  : "Tears of the Kingdom"}
              </p>
            </li>
          </div>
          <li className="mb-2">
            <h2 className="text-lg font-bold">Question</h2>
            <p>{questionQuery.data?.content}</p>
          </li>
        </ul>
        <button
          className="btn-primary btn"
          onClick={() => setShowCommentModal(true)}
        >
          Comment
        </button>
        <CommentModal
          isOpen={showCommentModal}
          handleClose={() => setShowCommentModal(false)}
          questionId={questionId}
          onCommentAdd={onCommentAdd}
        />
        <div className="divider" />
        <ul>
          {commentsQuery?.data?.map((comment) => {
            return (
              <li key={comment.id} className="chat chat-start mb-2">
                <div className="chat-header">
                  <span className="mr-4">{comment.user.name}</span>
                  <time className="text-xs opacity-50">
                    {moment(comment.createdAt).format("MM-D-YYYY, h:mm a")}
                  </time>
                </div>
                <div className="chat-bubble">{comment.content}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default QuestionPage;
