const exampleQuestions = [
  {
    title: "Where is the shrine called Jodifdsk?",
    questionId: "1234",
    user: "Mark Mulligan",
    categories: ["shrines", "loot"],
  },
  {
    title: "Where is the shrine called Jodifdsk?",
    questionId: "1234",
    user: "Mark Mulligan",
    categories: ["shrines", "loot"],
  },
  {
    title: "Where is the shrine called Jodifdsk?",
    questionId: "1234",
    user: "Mark Mulligan",
    categories: ["shrines", "loot"],
  },
  {
    title: "Where is the shrine called Jodifdsk?",
    questionId: "1234",
    user: "Mark Mulligan",
    categories: ["shrines", "loot"],
  },
  {
    title: "Where is the shrine called Jodifdsk?",
    questionId: "1234",
    user: "Mark Mulligan",
    categories: ["shrines", "loot"],
  },
];

const Questions = () => {
  return (
    <main className="container mx-auto">
      <h1 className="mb-4 text-center text-5xl font-bold">Questions</h1>
      <ul className="mx-auto max-w-md">
        {exampleQuestions.map((question) => {
          return (
            <li key={question.questionId} className="card glass mb-4">
              <div className="card-body">
                <h2 className="card-title">{question.title}</h2>
                <p className="mb-4">{question.user}</p>
                <ul className="card-actions">
                  {question.categories.map((category) => {
                    return (
                      <li className="badge-outline badge" key={category}>
                        {category}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Questions;
