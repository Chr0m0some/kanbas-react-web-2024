import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
export default function QuizEditorDetails() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const navigate = useNavigate();
  const fetchQuiz = async () => {
    if (!qid) return;
    const newQuiz = await client.findQuizById(qid as String);
    setQuiz(newQuiz);
  };
  const updateQuiz = async () => {
    if (!qid) return;
    const updatedQuiz = await client.updateQuiz(qid as String, quiz);
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  return (
    <div className="d-flex flex-column gap-3">
      <input
        className="form-control w-50 mt-4"
        value={`${quiz.name}`}
        onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
      />
      <h5>Quiz Instructions</h5>
      <textarea
        className="form-control w-50"
        value={`${quiz?.description ?? "Enter quiz instructions..."}`}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
      />
      <div className="d-flex flex-column align-items-end w-25 gap-3">
        <div className="d-flex gap-3 align-items-center">
          <h6>Quiz Type</h6>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              {quiz.type || "Type"}
            </button>

            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setQuiz({ ...quiz, type: "Graded Quiz" })}
                >
                  Graded Quiz
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setQuiz({ ...quiz, type: "Practice Quiz" })}
                >
                  Practice Quiz
                </button>
              </li>
              <li>
                <button className="dropdown-item">Graded Survey</button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setQuiz({ ...quiz, type: "Ungraded Survey" })}
                >
                  Ungraded Survey
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <h6>Assignment Group</h6>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              {quiz.group || "Group"}
            </button>

            <ul className="dropdown-menu">
              {["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECTS"].map((group) => (
                <li key={group}>
                  <button
                    className="dropdown-item"
                    onClick={() => setQuiz({ ...quiz, group })}
                  >
                    {group}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <h6>
            <strong>Options</strong>
          </h6>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="shuffleAnswers"
              checked={quiz.shuffle}
              onChange={() => setQuiz({ ...quiz, shuffle: !quiz.shuffle })}
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="multipleAttempts"
                checked={quiz.multipleAttempts}
                onClick={() =>
                  setQuiz({ ...quiz, multipleAttempts: !quiz.multipleAttempts })
                }
              />
              <label className="form-check-label text-nowrap" htmlFor="multipleAttempts">
                Allow Multiple Attempts
              </label>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <h6>Attempts</h6>
              <input
                className="form-control w-25"
                value={`${quiz.attempts}`}
                onChange={(e) => setQuiz({ ...quiz, attempts: e.target.value })}
              />
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="oneQuestionAtATime"
              checked={quiz.oneQuestionAtATime}
              onClick={() =>
                setQuiz({
                  ...quiz,
                  oneQuestionAtATime: !quiz.oneQuestionAtATime,
                })
              }
            />
            <label className="form-check-label" htmlFor="oneQuestionAtATime">
              One Question At A Time
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="webcamRequired"
              checked={quiz.webcamRequired}
              onClick={() =>
                setQuiz({ ...quiz, webcamRequired: !quiz.webcamRequired })
              }
            />
            <label className="form-check-label" htmlFor="webcamRequired">
              Webcam Required
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="lockQuestionsAfterAttempt"
              checked={quiz.lockQuestionsAfterAttempt}
              onClick={() =>
                setQuiz({
                  ...quiz,
                  lockQuestionsAfterAttempt: !quiz.lockQuestionsAfterAttempt,
                })
              }
            />
            <label
              className="form-check-label"
              htmlFor="lockQuestionsAfterAttempt"
            >
              Lock Questions After Attempt
            </label>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <h6>Time Limit</h6>
            <input
              className="form-control w-25"
              value={`${quiz.time}`}
              onChange={(e) => setQuiz({ ...quiz, time: e.target.value })}
            />
          </div>
          <div className="d-flex gap-3 align-items-center">
            <h6>Show Correct Answers</h6>
            <input
              className="form-control w-25"
              value={`${quiz.showCorrect ?? ""}`}
              onChange={(e) =>
                setQuiz({ ...quiz, showCorrect: e.target.value })
              }
            />
          </div>
          <div className="d-flex gap-3 align-items-center">
            <h6>Points</h6>
            <input
              className="form-control w-25"
              value={`${quiz.points}`}
              onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
            />
          </div>
          <div className="d-flex gap-3 align-items-center">
            <h6>Access Code</h6>
            <input
              className="form-control w-25"
              value={`${quiz.accessCode ?? ""}`}
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
            />
          </div>
        </div>
        <div className="d-flex w-100">
          <label className="form-label me-2">Assign</label>
          <div
            className="mb-3 w-100 d-flex border rounded p-3 align-items-center flex-grow-1"
            style={{ maxWidth: "400px" }}
          >
            <div className="d-flex flex-column">
              <div className="mb-3">
                <label htmlFor="wd-assign-to" className="form-label">
                  <strong>Assign to</strong>
                </label>
                <input
                  id="wd-assign-to"
                  className="form-control"
                  value="Everybody"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="wd-due-date" className="form-label">
                  <strong>Due</strong>
                </label>
                <input
                  id="wd-due-date"
                  className="form-control"
                  type="date"
                  defaultValue={
                    quiz.due
                      ? new Date(quiz.due).toISOString().split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  onChange={(e) => {
                    setQuiz({ ...quiz, due: e.target.value });
                    console.log(quiz);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="wd-available-from" className="form-label">
                  <strong>Available From</strong>
                </label>
                <input
                  id="wd-available-from"
                  className="form-control"
                  type="date"
                  defaultValue={
                    quiz.available
                      ? new Date(quiz.available).toISOString().split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  onChange={(e) => {
                    setQuiz({ ...quiz, available: e.target.value });
                    console.log(quiz);
                  }}
                />
              </div>
              <div>
                <label htmlFor="wd-available-until" className="form-label">
                  <strong>Until</strong>
                </label>
                <input
                  id="wd-available-until"
                  className="form-control"
                  type="date"
                  defaultValue={
                    quiz.until
                      ? new Date(quiz.until).toISOString().split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  onChange={(e) => {
                    setQuiz({ ...quiz, until: e.target.value });
                    console.log(quiz);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-end">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setQuiz({});
              navigate(`/Kanbas/Courses/${cid}/Quizzes`);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              updateQuiz();
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
