import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";

export default function QuizDetails({
  fetchQuizzes,
}: {
  fetchQuizzes: () => void;
}) {
  const { qid, cid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const updateQuiz = async () => {
    if (!qid) return;
    await client.updateQuiz(qid as String, quiz);
    setEditing(false);
    fetchQuizzes();
  };
  const fetchQuiz = async () => {
    if (!qid) return;
    const quiz = await client.findQuizById(qid as String);
    setQuiz(quiz);
  };
  useEffect(() => {
    if (qid) fetchQuiz();
  }, [qid]);
  if (!qid) return null;
  return (
    <div
      id="quizDetails"
      className="position-fixed d-flex flex-column top-0 end-0 bottom-0 bg-white shadow w-50 overflow-auto"
      style={{ zIndex: 1000 }}
    >
      <div className="d-flex justify-content-between m-3">
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-secondary btn-md">
            Preview
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-md p-3"
            onClick={() => setEditing(true)}
          >
            <FaPencilAlt />
            <span className="ms-2">Edit</span>
          </button>
        </div>
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/`} className="btn ">
          <IoCloseSharp className="fs-1" />
        </Link>
      </div>
      <hr />
      <h1 className="p-3 mb-4">
        {!editing ? (
          <span>{quiz.name}</span>
        ) : (
          <input
            className="form-control w-50"
            defaultValue={`${quiz.name}`}
            onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateQuiz();
              }
            }}
          />
        )}
      </h1>
      <div className="d-flex flex-column align-items-start ms-4">
        <p className="d-flex gap-2">
          <strong>Quiz Type</strong>
          {!editing ? (
            <span>{quiz.type}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.type}`}
              onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Points</strong>
          {!editing ? (
            <span>{quiz?.points ?? 0}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz?.points ?? 0}`}
              onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Assignment Group</strong>
          {!editing ? (
            <span>{quiz.group}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.group}`}
              onChange={(e) => setQuiz({ ...quiz, group: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Shuffle Answers</strong>
          {!editing ? (
            <span>{quiz.shuffle ? "Yes" : "No"}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.shuffle ? "Yes" : "No"}`}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  shuffle: e.target.value === "Yes" ? true : false,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Time Limit</strong>
          {!editing ? (
            <span>{quiz.time}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.time}`}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  time: e.target.value === "" ? 20 : e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Multiple Attempts</strong>
          {!editing ? (
            <span>{quiz.multipleAttempts ? "Yes" : "No"}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.multipleAttempts ? "Yes" : "No"}`}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  multipleAttempts: e.target.value === "Yes" ? true : false,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Attempts</strong>
          {!editing ? (
            <span>{quiz.attempts}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.attempts}`}
              onChange={(e) => {
                const attemptsValue = parseInt(e.target.value);
                setQuiz({
                  ...quiz,
                  attempts: attemptsValue,
                  multipleAttempts: attemptsValue === 1 ? false : true,
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>One Question at a Time</strong>
          {!editing ? (
            <span>{quiz.oneQuestionAtATime ? "Yes" : "No"}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.oneQuestionAtATime ? "Yes" : "No"}`}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  oneQuestionAtATime: e.target.value === "Yes" ? true : false,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Show Correct Answers</strong>
          {!editing ? (
            <span>{quiz.showCorrect ?? "Immediately"}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.showCorrect ?? "Immediately"}`}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  showCorrect: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Access Code</strong>
          {!editing ? (
            <span>{quiz.accessCode ?? "No Access Code"}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.accessCode ?? "No Access Code"}`}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  accessCode: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Webcam Required</strong>
          {!editing ? (
            <span>{quiz.webcamRequired ? "Yes" : "No"}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.webcamRequired ? "Yes" : "No"}`}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  webcamRequired: e.target.value === "Yes" ? true : false,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
        <p className="d-flex gap-2">
          <strong>Lock Questions After Answering</strong>
          {!editing ? (
            <span>{quiz.lockQuestionsAfterAttempt ? "Yes" : "No"}</span>
          ) : (
            <input
              className="form-control w-50"
              defaultValue={`${quiz.lockQuestionsAfterAttempt ? "Yes" : "No"}`}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  lockQuestionsAfterAttempt:
                    e.target.value === "Yes" ? true : false,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuiz();
                }
              }}
            />
          )}
        </p>
      </div>
      <table className="table ms-3">
        <thead>
          <tr>
            <th scope="col">Due</th>
            <th scope="col">For</th>
            <th scope="col">Available From</th>
            <th scope="col">Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              {!editing ? (
                <td>
                  {new Date(quiz.due).toLocaleDateString() === "Invalid Date"
                    ? "No Due Date"
                    : new Date(quiz.due).toLocaleDateString()}
                </td>
              ) : (
                <input
                  className="form-control w-50"
                  defaultValue={`${quiz.due ?? "No Due Date"}`}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      due: e.target.value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateQuiz();
                    }
                  }}
                />
              )}
            </th>
            <td>Everyone</td>
            <td>
              {!editing ? (
                <td>
                  {new Date(quiz.available).toLocaleDateString() ===
                  "Invalid Date"
                    ? "No Due Date"
                    : new Date(quiz.available).toLocaleDateString()}
                </td>
              ) : (
                <input
                  className="form-control w-50"
                  defaultValue={`${quiz.available ?? "No Due Date"}`}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      available: e.target.value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateQuiz();
                    }
                  }}
                />
              )}
            </td>
            <td>
              {!editing ? (
                <td>
                  {new Date(quiz.until).toLocaleDateString() === "Invalid Date"
                    ? "No Due Date"
                    : new Date(quiz.until).toLocaleDateString()}
                </td>
              ) : (
                <input
                  className="form-control w-50"
                  defaultValue={`${quiz.until ?? "No Due Date"}`}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      until: e.target.value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateQuiz();
                    }
                  }}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
