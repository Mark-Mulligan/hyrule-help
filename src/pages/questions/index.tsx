// react
import { useState } from "react";

// Components
import MultiSelect from "~/components/MultiSelect";
import QuestionModal from "~/components/QuestionModal";

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

const categoryOptions = [
  { label: "Shrines", value: "shrines" },
  { label: "Side Quests", value: "side-quests" },
  { label: "Loot", value: "loot " },
];

const gameOptions = [
  {
    label: "BOTW",
    value: "botw",
  },
  { label: "TOTK", value: "totk" },
];

const Questions = () => {
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  return (
    <main className="container mx-auto pb-16 pt-24">
      <h1 className="relative mx-auto mb-4 max-w-4xl text-center text-5xl font-bold">
        Questions
        <button
          className="btn-primary btn absolute right-0"
          onClick={() => setShowAddQuestionModal(true)}
        >
          Ask Question
        </button>
      </h1>

      <QuestionModal
        isOpen={showAddQuestionModal}
        handleClose={() => setShowAddQuestionModal(false)}
      />

      <div className="card mx-auto mb-8 max-w-4xl bg-base-300">
        <div className="card-body">
          <h2 className="text-center">Filters</h2>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="input-bordered input w-full"
            />

            <MultiSelect
              options={categoryOptions}
              placeholder="Filter By Category"
            />
            <MultiSelect options={gameOptions} placeholder="Filter By Game" />
          </div>
        </div>
      </div>

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
