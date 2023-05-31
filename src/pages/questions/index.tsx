// react
import { useState } from "react";

// next
import Image from "next/image";

// Moment JS
import moment from "moment";

// TRPC
import { api } from "~/utils/api";

// Components
import MultiSelect from "~/components/MultiSelect";
import QuestionModal from "~/components/QuestionModal";
import LoadingModal from "~/components/LoadingModal";

// Types
import type { SelectOption } from "~/types/customTypes";

// Utils
import { categoryOptions, gameOptions } from "~/utils/selects";

const Questions = () => {
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState<SelectOption[]>([]);
  const [gameFilter, setGameFilter] = useState<SelectOption[]>([]);

  const questionQuery = api.questions.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const onQuestionAdd = () => {
    setShowAddQuestionModal(false);
    void questionQuery.refetch();
  };

  console.log(questionQuery.data);

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
        onQuestionAdd={onQuestionAdd}
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
              selectedOptions={categoriesFilter}
              setSelectedOptions={setCategoriesFilter}
              name="categoryFilters"
            />
            <MultiSelect
              options={gameOptions}
              placeholder="Filter By Game"
              selectedOptions={gameFilter}
              setSelectedOptions={setGameFilter}
              name="gameFilters"
            />
          </div>
        </div>
      </div>

      <ul className="mx-auto max-w-4xl">
        {questionQuery.data?.map((question) => {
          return (
            <li
              key={question.id}
              className="card card-side mb-4 cursor-pointer bg-base-100 shadow-xl"
            >
              <figure>
                <Image
                  src={question.game === "botw" ? "/botw.jpeg" : "/totk.jpeg"}
                  alt={
                    question.game === "botw"
                      ? "Breath of the wild cover photo"
                      : "Tears of the kingdom cover photo"
                  }
                  className="h-full w-36"
                  width={100}
                  height={100}
                />
              </figure>
              <div className="card-body">
                <div className="flex w-full flex-row items-center justify-between">
                  <h2 className="card-title">{question.title}</h2>
                  <p className="flex-none font-light">
                    {moment(question.createdAt).format("MMMM Do YYYY, h:mm a")}
                  </p>
                </div>

                <p>{question.user.name}</p>
                <p>{question.content}</p>
                <ul>
                  {question.categories.split(",").map((category) => {
                    return (
                      <li className="badge-outline badge mr-2" key={category}>
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
      {questionQuery.isLoading && (
        <LoadingModal loadingText="Loading Questions..." />
      )}
    </main>
  );
};

export default Questions;
