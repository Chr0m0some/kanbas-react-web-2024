import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import * as client from "./client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function QuizControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>({});
  const createQuiz = async () => {
    const newQuiz = await client.createQuiz({ course: cid });
    setQuiz(newQuiz);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
  };
  return (
    <div id="wd-quiz-controls" className="d-flex justify-content-between">
      <input
        type="text"
        className="form-control rounded-end border w-50"
        placeholder="Search for quiz"
      />
      {currentUser.role === "FACULTY" && (
        <div className="d-flex">
          <button
            id="wd-add-quiz"
            type="button"
            className="btn btn-lg btn-danger me-2"
            onClick={() => {
              {
                createQuiz();
              }
            }}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </button>
          <button type="button" className="btn btn-lg btn-secondary">
            <IoEllipsisVertical />
          </button>
        </div>
      )}
    </div>
  );
}
