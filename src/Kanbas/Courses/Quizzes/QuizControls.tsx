import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControls() {
  return (
    <div id="wd-quiz-controls" className="d-flex justify-content-between">
      <input
        type="text"
        className="form-control rounded-end border w-50"
        placeholder="Search for quiz"
      />
      <div className="d-flex">
        <button
          id="wd-add-quiz"
          type="button"
          className="btn btn-lg btn-danger me-2"
          onClick={() => {
            {
              console.log("ADD QUIZ FUNCTION");
            }
          }}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Quiz
        </button>
        <button
          type="button"
          className="btn btn-lg btn-secondary"
        >
          <IoEllipsisVertical />
        </button>
      </div>
    </div>
  );
}
