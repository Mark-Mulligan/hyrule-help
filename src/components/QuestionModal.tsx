// react
import { FC } from "react";

// Components
import MultiSelect from "./MultiSelect";

interface IProps {
  handleClose: () => void;
  isOpen: boolean;
}

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

const QuestionModal: FC<IProps> = ({ handleClose, isOpen }) => {
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
        <ul>
          <li className="form-control w-full">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full"
            />
          </li>
          <li className="form-control w-full">
            <label className="label">
              <span className="label-text">Question</span>
            </label>
            <textarea
              className="textarea-bordered textarea h-24"
              placeholder="Bio"
            ></textarea>
          </li>
          <li className="form-control w-full">
            <label className="label">
              <span className="label-text">Categories</span>
            </label>
            <MultiSelect options={categoryOptions} placeholder="select..." />
          </li>
          <li className="form-control w-full">
            <label className="label">
              <span className="label-text">Game</span>
            </label>
            <select className="select-bordered select">
              <option selected value="totk">
                TOTK
              </option>
              <option value="botw">BOTW</option>
            </select>
          </li>
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <button className="btn-error btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn-success btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
