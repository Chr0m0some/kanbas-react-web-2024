import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import * as client from "./client";
import { useParams } from "react-router-dom";
export default function QuizQuestions() {
  const { qid } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionFocused, setQuestionFocused] = useState<any>(null);
  const [editing, setEditing] = useState<Boolean>(false);

  const createQuestion = async (qid: any, question: any) => {
    const newQuestion = await client.createQuestion(qid, question);
    setQuestions([...questions, newQuestion]);
    setQuestionFocused(newQuestion);
    fetchQuestions(qid);
  };
  const fetchQuestions = async (qid: any) => {
    const questions = await client.findQuestionsForQuiz(qid);
    setQuestions(questions);
    console.log(questions);
  };
  const updateQuestion = async (qid: any, question: any) => {
    const updatedQuestion = await client.updateQuestion(qid, question);
    setQuestions(
      questions.map((q) =>
        q._id === updatedQuestion._id ? updatedQuestion : q
      )
    );
    fetchQuestions(qid);
  };
  useEffect(() => {
    fetchQuestions(qid);
  }, []);
  return (
    <div className="d-flex flex-column gap-3 align-items-center mt-4">
      <div className="dropdown">
        <button
          className="btn btn-secondary d-flex align-items-center justify-content-center gap-2 w-auto"
          data-bs-toggle="dropdown"
        >
          <FaPlus />
          New Question
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => createQuestion(qid, { type: "Multiple Choice" })}
            >
              Multiple Choice
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => createQuestion(qid, { type: "True/False" })}
            >
              True/False
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => createQuestion(qid, { type: "Fill in the Blank" })}
            >
              Fill in the Blank
            </button>
          </li>
        </ul>
      </div>
      {questions.length > 0 && (
        <div className="d-flex flex-column gap-3">
          {questions.map((question: any) => (
            <div
              key={question._id}
              className="d-flex flex-column gap-3 border border-1 border-dark rounded p-2"
              style={{ width: "600px" }}
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex gap-3 align-items-center w-100">
                  {questionFocused &&
                  questionFocused._id === question._id &&
                  editing ? (
                    <>
                      <input
                        className="form-control w-auto"
                        value={question.name}
                        onChange={(e) => {
                          const updatedQuestion = {
                            ...question,
                            name: e.target.value,
                          };
                          setQuestions((prevQuestions) =>
                            prevQuestions.map((q) =>
                              q._id === question._id ? updatedQuestion : q
                            )
                          );
                          setQuestionFocused(updatedQuestion);
                        }}
                        placeholder="Question Name"
                      />
                      <select
                        className="form-select w-auto"
                        value={question.type}
                      >
                        <option value="">Select Type</option>
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True/False</option>
                        <option value="Fill in the Blank">
                          Fill in the Blank
                        </option>
                      </select>
                    </>
                  ) : (
                    <>
                      <span>
                        {question.name} | {question.type}
                      </span>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditing(true);
                          setQuestionFocused(question);
                        }}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
                <div className="d-flex gap-1 align-items-center justify-content-end">
                  <h6>Points: </h6>
                  {questionFocused &&
                  questionFocused._id === question._id &&
                  editing ? (
                    <input
                      className="form-control w-25"
                      value={`${question.points}`}
                      onChange={(e) => {
                        const updatedQuestion = {
                          ...question,
                          points: e.target.value,
                        };
                        setQuestions((prevQuestions) =>
                          prevQuestions.map((q) =>
                            q._id === question._id ? updatedQuestion : q
                          )
                        );
                        setQuestionFocused(updatedQuestion);
                      }}
                    />
                  ) : (
                    <h6>{question.points}</h6>
                  )}
                </div>
              </div>
              <hr className="border border-1 border-dark w-100" />
              {question.type === "Multiple Choice" && (
                <h6>
                  Enter your question and multiple answers, then select the one
                  correct answer.
                </h6>
              )}
              {question.type === "True/False" && (
                <h6>
                  Enter your question text, then select if True or False is the correct answer.
                </h6>
              )}
              {question.type === "Fill in the Blank" && (
                <h6>
                  Enter your question text, then define all possible correct
                  answers for the blank. Students will see the question followed
                  by a small text box to type their answer.
                </h6>
              )}
              <div>
                <h5>Question</h5>
                <textarea
                  className="form-control w-100"
                  value={`${question?.question ?? "Enter question..."}`}
                  onChange={(e) => {
                    const updatedQuestion = {
                      ...question,
                      question: e.target.value,
                    };
                    setQuestions((prevQuestions) =>
                      prevQuestions.map((q) =>
                        q._id === question._id ? updatedQuestion : q
                      )
                    );
                    setQuestionFocused(updatedQuestion);
                  }}
                />
              </div>
              <div className="d-flex flex-column gap-2">
                <h5 className="mb-1">Answers:</h5>
                {question.type === "True/False" ? (
                  <div className="d-flex flex-column gap-2">
                    {["True", "False"].map((choice, index) => (
                      <div
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <h6 className="m-0">Possible Answer:</h6>
                        {choice}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {question.choices &&
                      question.choices.length > 0 &&
                      question.choices.map((choice: string, index: any) => (
                        <div
                          key={index}
                          className="d-flex gap-2 align-items-center"
                        >
                          <h6 className="m-0">Possible Answer:</h6>
                          {questionFocused &&
                          questionFocused._id === question._id &&
                          editing ? (
                            <input
                              className="form-control w-25"
                              value={choice}
                              onChange={(e) => {
                                const updatedChoices = [...question.choices];
                                updatedChoices[index] = e.target.value;
                                const updatedQuestion = {
                                  ...question,
                                  choices: updatedChoices,
                                };
                                setQuestions((prevQuestions) =>
                                  prevQuestions.map((q) =>
                                    q._id === question._id ? updatedQuestion : q
                                  )
                                );
                                setQuestionFocused({
                                  ...question,
                                  choices: updatedChoices,
                                });
                              }}
                            />
                          ) : (
                            choice
                          )}
                        </div>
                      ))}
                  </div>
                )}
                <div className="d-flex gap-2 align-items-center">
                  {question.type === "True/False" ? (
                    <div className="d-flex gap-2 align-items-center">
                      <label
                        className="form-check-label"
                        htmlFor="correctAnswer"
                      >
                        Correct Answer:
                      </label>
                      {questionFocused &&
                      questionFocused._id === question._id &&
                      editing ? (
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="correctAnswer"
                          defaultChecked={question.correct}
                          onClick={() => {
                            const updatedQuestion = {
                              ...question,
                              correct: !question.correct,
                            };
                            setQuestions((prevQuestions) =>
                              prevQuestions.map((q) =>
                                q._id === question._id ? updatedQuestion : q
                              )
                            );
                            setQuestionFocused(updatedQuestion);
                          }}
                        />
                      ) : (
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="correctAnswer"
                          checked={question.correct}
                          disabled
                        />
                      )}
                    </div>
                  ) : (
                    <div className="d-flex gap-2 align-items-center">
                      <h6 className="m-0 text-success">Correct Answer:</h6>
                      {questionFocused &&
                      questionFocused._id === question._id &&
                      editing ? (
                        <input
                          className="form-control w-25"
                          value={question.correct}
                          onChange={(e) => {
                            const updatedQuestion = {
                              ...question,
                              correct: e.target.value,
                            };
                            setQuestions((prevQuestions) =>
                              prevQuestions.map((q) =>
                                q._id === question._id ? updatedQuestion : q
                              )
                            );
                            setQuestionFocused(updatedQuestion);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateQuestion(qid, question);
                            }
                          }}
                        />
                      ) : question.correct ? (
                        question.correct
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
              {questionFocused &&
                questionFocused._id === question._id &&
                editing &&
                question.type !== "True/False" && (
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-danger w-auto"
                      onClick={() => {
                        const updatedQuestion = {
                          ...question,
                          choices: [...question.choices, "New Answer"],
                        };
                        setQuestionFocused(updatedQuestion);
                        setQuestions((prevQuestions) =>
                          prevQuestions.map((q) =>
                            q._id === updatedQuestion._id ? updatedQuestion : q
                          )
                        );
                        updateQuestion(qid, updatedQuestion);
                      }}
                    >
                      Add another answer
                    </button>
                  </div>
                )}
              {questionFocused &&
                questionFocused._id === question._id &&
                editing && (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditing(false);
                        setQuestionFocused(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setEditing(false);
                        updateQuestion(qid, questionFocused);
                        setQuestionFocused(null);
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
      <hr className="border border-1 border-dark w-100" />
      <div className="d-flex gap-2 justify-content-end">
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}
