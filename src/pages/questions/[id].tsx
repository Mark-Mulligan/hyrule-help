// Next
import { useRouter } from "next/router";

// TRPC
import { api } from "~/utils/api";

const QuestionPage = () => {
  const router = useRouter();
  const questionId = router?.query?.id as string | undefined;

  const questionQuery = api.questions.getQuestion.useQuery(
    { id: questionId || "" },
    { enabled: !!questionId }
  );

  console.log(questionQuery.data);

  return (
    <main className="container mx-auto max-w-4xl bg-base-100 pb-16 pt-24">
      <h1 className="text-center text-5xl font-bold">
        {questionQuery.data?.title}
      </h1>
      <p>{questionQuery.data?.content}</p>
    </main>
  );
};

export default QuestionPage;
