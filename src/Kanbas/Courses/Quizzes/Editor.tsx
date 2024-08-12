import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client";
import { MdUnpublished } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizEditorDetails from "./EditorDetails";
import QuizQuestions from "./Questions";
export default function QuizEditor() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const [mode, setMode] = useState<String>("details");
  const fetchQuiz = async () => {
    if (!qid) return;
    const quiz = await client.findQuizById(qid as String);
    setQuiz(quiz);
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  return (
    <div id="quiz-editor">
      <div className="d-flex align-items-center justify-content-end gap-4">
        <h4 className="m-0">Points {quiz.points}</h4>
        <div className="d-flex align-items-center">
          {quiz.published ? <GreenCheckmark /> : <MdUnpublished />}
          <h4 className="text-muted m-0">
            {quiz.published ? "Published" : "Not Published"}
          </h4>
        </div>
        <button
          type="button"
          className="btn btn-secondary d-flex align-items-center p-2"
        >
          <IoEllipsisVertical className="fs-4" />
        </button>
      </div>
      <hr />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${
              mode === "details" ? "active" : "text-danger"
            }`}
            aria-current="page"
            onClick={() => setMode("details")}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              mode === "questions" ? "active" : "text-danger"
            }`}
            onClick={() => setMode("questions")}
          >
            Questions
          </a>
        </li>
      </ul>
      {mode === "details" ? (
        <QuizEditorDetails />
      ) : (
        <QuizQuestions />
      )}
    </div>
  );
}
