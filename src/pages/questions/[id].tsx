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
      </div>
    </main>
  );
};

export default QuestionPage;
