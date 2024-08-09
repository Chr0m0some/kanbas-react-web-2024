import { BsGripVertical } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
import GreenCheckmark from "../Modules/GreenCheckmark";
import QuizControls from "./QuizControls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as client from "./client";
import "./index.css";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdUnpublished } from "react-icons/md";
import QuizDetails from "./Details";
export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const dispatch = useDispatch();
  const deleteQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    fetchQuizzes();
  };
  const handlePublish = async (quizId: string, quiz: any) => {
    const flipPublished = !quiz.published;
    const updatedQuiz = { ...quiz, published: flipPublished };
    await client.updateQuiz(quizId, updatedQuiz);
    fetchQuizzes();
  };
  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as String);
    setQuizzes(quizzes);
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <div id="wd-quizzes">
      <QuizControls />
      <QuizDetails fetchQuizzes={fetchQuizzes} />
      <hr />
      <ul id="wd-quizzes-list" className="list-group rounded-0">
        <li
          id="wd-quizzes-section"
          className="list-group-item p-0 mb-5 fs-5 border-gray"
        >
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Assignment Quizzes
          </div>
          <ul id="wd-quizzes" className="list-group rounded-0">
            {quizzes
              .filter((quiz: any) => quiz.course === cid)
              .map((quiz: any) => (
                <li
                  key={quiz._id}
                  id="wd-quiz"
                  className="list-group-item p-3 ps-2"
                >
                  <div
                    id="wd-quiz-content"
                    className="d-flex align-items-center justify-content-start flex-nowrap"
                  >
                    <RxRocket className="fs-4 text-success m-2" />
                    <div className="col p-2">
                      <div className="fs-5">{quiz.name}</div>
                      <div className="fs-6 text-muted">
                        <strong>
                          <span>
                            {(() => {
                              const currentDate = new Date();
                              const availableDate = new Date(quiz.available);
                              const untilDate = new Date(quiz.until);

                              if (currentDate > untilDate) {
                                return "Closed";
                              } else if (
                                currentDate >= availableDate &&
                                currentDate <= untilDate
                              ) {
                                return "Available";
                              } else if (currentDate < availableDate) {
                                return `Not available until ${availableDate.toLocaleDateString()}`;
                              }
                            })()}
                          </span>
                        </strong>{" "}
                        |
                        <span className="text-muted">
                          <strong> Due </strong>
                          {new Date(quiz.due).toLocaleDateString()} |
                        </span>
                        <span className="text-muted"> {quiz.points} pts</span> |
                        <span className="text-muted"> TODO # OF QUESTIONS</span>{" "}
                        |<span className="text-muted"> TODO SCORE </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="btn d-flex align-items-center p-1"
                        onClick={() => {
                          handlePublish(quiz._id, quiz);
                        }}
                      >
                        {quiz.published ? (
                          <GreenCheckmark />
                        ) : (
                          <div className="d-flex fs-4 me-1 text-danger">
                            <MdUnpublished />
                          </div>
                        )}
                      </button>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn d-flex align-items-center p-1"
                          data-bs-toggle="dropdown"
                        >
                          <IoEllipsisVertical className="fs-4" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                navigate(
                                  `/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`
                                );
                              }}
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                deleteQuiz(quiz._id);
                              }}
                            >
                              Delete
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                handlePublish(quiz._id, quiz);
                              }}
                            >
                              {quiz.published ? "Unpublish" : "Publish"}
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
