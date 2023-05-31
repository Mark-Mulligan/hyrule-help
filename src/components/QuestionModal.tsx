// react
import { type FC, type FormEvent, useState } from "react";

// TRPC
import { api } from "~/utils/api";

// Components
import MultiSelect from "./MultiSelect";

// Types
import type { SelectOption } from "~/types/customTypes";

interface IProps {
  handleClose: () => void;
  isOpen: boolean;
  onQuestionAdd: () => void;
}

const categoryOptions = [
  { label: "Shrines", value: "shrines" },
  { label: "Side Quests", value: "side-quests" },
  { label: "Loot", value: "loot " },
];

const gameOptions = [
  { label: "TOTK", value: "totk" },
  {
    label: "BOTW",
    value: "botw",
  },
];

const QuestionModal: FC<IProps> = ({ handleClose, isOpen, onQuestionAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<SelectOption[]>(
    []
  );
  const [selectedGame, setSelectedGame] = useState<string | undefined>(
    gameOptions[0]?.value
  );

  const questionMutation = api.questions.addQuestion.useMutation({
    onSuccess: () => onQuestionAdd(),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!selectedGame) {
      return;
    }
    console.log({ title, content, selectedCategories, selectedGame });
    const categories = selectedCategories
      .map((category) => category.value)
      .join(",");
    const game = selectedGame;
    questionMutation.mutate({ title, content, categories, game });
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          htmlFor="my-modal-3"
          className="btn-sm btn-circle btn absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">New Question</h3>
        <form onSubmit={handleSubmit}>
          <ul>
            <li className="form-control w-full">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input-bordered input w-full"
                required
              />
            </li>
            <li className="form-control w-full">
              <label className="label">
                <span className="label-text">Question</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea-bordered textarea h-24"
                placeholder="Bio"
                required
              ></textarea>
            </li>
            <li className="form-control w-full">
              <label className="label">
                <span className="label-text">Categories</span>
              </label>
              <MultiSelect
                options={categoryOptions}
                placeholder="select..."
                selectedOptions={selectedCategories}
                setSelectedOptions={setSelectedCategories}
                name="categorySelect"
              />
            </li>
            <li className="form-control w-full">
              <label className="label">
                <span className="label-text">Game</span>
              </label>
              <select
                className="select-bordered select"
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                required
              >
                {gameOptions.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </li>
          </ul>

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
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
