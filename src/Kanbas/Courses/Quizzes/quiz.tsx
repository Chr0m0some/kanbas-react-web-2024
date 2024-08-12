import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function Quiz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const [questions, setQuestions] = useState<any>([]);
  const [questionIndex, setQuestionIndex] = useState<any>(0);
  const [quiz, setQuiz] = useState<any>({});
  const [started, setStarted] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<any>([]);
  const [assessedAnswers, setAssessedAnswers] = useState<any>([]);
  const [answer, setAnswer] = useState<any>("");
  const [finalScore, setFinalScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [takingQuiz, setTakingQuiz] = useState(true);
  const [retakingQuiz, setRetakingQuiz] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number>(
    quiz.attempts
  );
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [trigger, setTrigger] = useState(0); // Changed to a number
  const fetchQuestions = async (qid: any) => {
    setLoading(true);
    const questions = await client.findQuestionsForQuiz(qid);
    setQuestions(questions);
    console.log("fetching questions", questions);
    setLoading(false);
  };
  const fetchQuiz = async (qid: any) => {
    setLoading(true);
    const quiz = await client.findQuizById(qid);
    setQuiz(quiz);
    console.log("fetching quiz", quiz);
    setLoading(false);
    return quiz;
  };
  const createAttempt = async (attempt: any) => {
    const newAttempt = await client.createAttempt(attempt);
    console.log("creating attempt", newAttempt);
  };
  const calculateScore = (answers: any) => {
    let score = 0;
    const newAssessedAnswers: any[] = [];
    questions.forEach((question: any, index: any) => {
      if (index > answers.length - 1) {
        return score;
      }
      const isCorrect =
        String(question.correct).toLowerCase() === answers[index].toLowerCase();
      if (isCorrect) {
        score += question.points;
      }
      newAssessedAnswers.push({
        answer: answers[index],
        correct: isCorrect,
      });
    });
    setAssessedAnswers(newAssessedAnswers);
    return score;
  };
  const getLastAttempt = async (quiz: any) => {
    const attempts = await client.findAttemptsForQuizAndUser(
      qid as String,
      currentUser._id
    );
    console.log("attempts", quiz.attempts, attempts.length);
    setAttemptsRemaining(quiz.attempts - attempts.length);
    if (attempts.length > 0) {
      console.log("last attempt", attempts[attempts.length - 1]);
      return attempts[attempts.length - 1];
    }
    return null;
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchQuestions(qid);
        const quiz = await fetchQuiz(qid);
        if (quiz) {
          const lastAttempt = await getLastAttempt(quiz);
          if (lastAttempt) {
            setLastAttempt(lastAttempt);
            console.log("last attempt", lastAttempt);
          } else {
            console.log(lastAttempt);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log("trigger", trigger);
    console.log(takingQuiz);
  }, [qid, trigger]);
  useEffect(() => {
    if (submitting) {
      const submitAttempt = async () => {
        try {
          await createAttempt({
            quizId: qid,
            userId: currentUser._id,
            score: finalScore,
            answers: assessedAnswers,
          });
          const lastAttempt = await getLastAttempt(quiz);
          if (lastAttempt) {
            setLastAttempt(lastAttempt);
            console.log("last attempt", lastAttempt);
          } else {
            console.log(lastAttempt);
          }
          setAttemptsRemaining((prevAttempts) => prevAttempts - 1);
          // Handle successful submission (e.g., show a success message, navigate to results page)
          setSubmitting(false);
        } catch (error) {
          console.error("Error submitting attempt:", error);
          // Handle error (e.g., show error message to user)
          setSubmitting(false);
        }
      };

      submitAttempt();
    }
  }, [submitting, qid, currentUser._id, finalScore, assessedAnswers]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <h1>{quiz.name}</h1>
      <p className="d-flex align-items-center gap-2">Started: {started}</p>
      <h1>Quiz Instructions</h1>
      <div className="d-flex align-items-center gap-2 border border-secondary p-3 border-2 rounded-3">
        <p className="m-0">{quiz.description}</p>
      </div>
      <hr className="border-dark border-2" />
      {(takingQuiz && lastAttempt === null) || retakingQuiz ? (
        <>
          <div className="d-flex gap-3 mt-4 ms-4">
            <div className="mt-4">
              <FaChevronRight />
            </div>
            <div className="d-flex flex-column border border-secondary border-2 w-75">
              <div className="d-flex align-items-center justify-content-between border-bottom border-2 border-secondary p-3 bg-secondary">
                <h3 className="m-0">{questions[questionIndex].name}</h3>
                <h3 className="m-0">{questions[questionIndex].points} pts</h3>
              </div>
              <div className="d-flex flex-column pt-3 ps-3 pe-3">
                <p className="m-0">{questions[questionIndex].question}</p>
                <hr className="border-dark border-2 w-100" />
              </div>
              {questions[questionIndex].type !== "True/False" ? (
                questions[questionIndex].choices.map((choice: any) => (
                  <div className="d-flex flex-column ps-3 pe-3">
                    <div className="d-flex align-items-center gap-2 p-2 ms-3">
                      <input
                        type="radio"
                        name={`${questions[questionIndex]._id}`}
                        onChange={() => setAnswer(choice)}
                      />
                      <label
                        className="m-0"
                        htmlFor={`${questions[questionIndex]._id}`}
                      >
                        {choice}
                      </label>
                    </div>
                    <hr className="border-dark border-1 w-100" />
                  </div>
                ))
              ) : (
                <div className="d-flex flex-column ps-3 pe-3">
                  <div className="d-flex align-items-center gap-2 p-2 ms-3">
                    <input
                      type="radio"
                      name={`trueFalse${questions[questionIndex]._id}`}
                      value="True"
                      onChange={() => setAnswer("True")}
                    />
                    <label
                      className="m-0"
                      htmlFor={`trueFalse${questions[questionIndex]._id}`}
                    >
                      True
                    </label>
                  </div>
                  <hr className="border-dark border-1 w-100" />
                  <div className="d-flex align-items-center gap-2 p-2 ms-3">
                    <input
                      type="radio"
                      name={`trueFalse${questions[questionIndex]._id}`}
                      value="False"
                      onChange={() => setAnswer("False")}
                    />
                    <label
                      className="m-0"
                      htmlFor={`trueFalse${questions[questionIndex]._id}`}
                    >
                      False
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          {questionIndex < questions.length - 1 && (
            <button
              className="btn btn-secondary mt-3"
              onClick={() => {
                setQuestionIndex(questionIndex + 1);
                const updatedAnswers = [...answers];
                updatedAnswers.push(answer);
                setAnswers(updatedAnswers);
              }}
            >
              Next
            </button>
          )}
          <div className="d-flex border border-secondary border-1 justify-content-end p-2 w-100 my-3 float-end">
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (attemptsRemaining > 0) {
                  const updatedAnswers = [...answers, answer];
                  setAnswers(updatedAnswers);
                  const score = calculateScore(updatedAnswers);
                  setFinalScore(score);
                  setSubmitting(true);
                  setTakingQuiz(false);
                  setTrigger((prev) => prev + 1); // Increment trigger
                } else {
                  // Show a message that no attempts are remaining
                  alert("No attempts remaining");
                }
              }}
            >
              Submit Quiz
            </button>
          </div>
        </>
      ) : (
        <>
          {lastAttempt ? (
            <div className="d-flex flex-column gap-3 mt-4 ms-4">
              <h1>Quiz Results</h1>
              <h3>
                Score: {lastAttempt.score} out of {quiz.points}
              </h3>
              {questions.map((question: any, index: any) => (
                <div key={question._id} className="d-flex flex-column border border-secondary border-2 w-75">
                  <div className="d-flex align-items-center justify-content-between border-bottom border-2 border-secondary p-3 bg-secondary">
                    <h3 className="m-0">{question.name}</h3>
                    <h3 className="m-0">{question.points} pts</h3>
                  </div>
                  <div className="d-flex flex-column pt-3 ps-3 pe-3">
                    <p className="m-0">{question.question}</p>
                    <hr className="border-dark border-2 w-100" />
                  </div>
                  {question.type !== "True/False" ? (
                    question.choices.map((choice: any) => (
                      <div key={choice} className="d-flex flex-column ps-3 pe-3">
                        <div className="d-flex align-items-center gap-2 p-2 ms-3">
                          <input
                            type="radio"
                            name={`${question._id}`}
                            checked={lastAttempt.answers[index]?.answer === choice}
                            disabled
                          />
                          <label
                            className={`m-0 ${
                              lastAttempt.answers[index]?.correct &&
                              lastAttempt.answers[index]?.answer === choice
                                ? "text-success"
                                : "text-danger"
                            }`}
                            htmlFor={`${question._id}`}
                          >
                            {choice}
                          </label>
                        </div>
                        <hr className="border-dark border-1 w-100" />
                      </div>
                    ))
                  ) : (
                    <div className="d-flex flex-column ps-3 pe-3">
                      {["True", "False"].map((value) => (
                        <div key={value} className="d-flex align-items-center gap-2 p-2 ms-3">
                          <input
                            type="radio"
                            name={`trueFalse${question._id}`}
                            value={value}
                            checked={lastAttempt.answers[index]?.answer === value}
                            disabled
                          />
                          <label
                            className={`m-0 ${
                              lastAttempt.answers[index]?.correct &&
                              lastAttempt.answers[index]?.answer === value
                                ? "text-success"
                                : "text-danger"
                            }`}
                            htmlFor={`trueFalse${question._id}`}
                          >
                            {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <h3>Attempts Remaining: {attemptsRemaining} </h3>
              {attemptsRemaining > 0 && (
                <div className="d-flex justify-content-start mb-3">
                  <button
                    className="btn btn-secondary w-auto"
                    onClick={() => {
                      setTakingQuiz(true);
                      setRetakingQuiz(true);
                      setAnswers([]);
                      setAssessedAnswers([]);
                      setFinalScore(0);
                      setQuestionIndex(0);
                      setAnswer("");
                      setTrigger((prev) => prev + 1);
                    }}
                  >
                    Take Quiz Again
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>Loading quiz results...</div>
          )}
        </>
      )}
      <h3>Questions</h3>
      <div className="d-flex flex-column ms-3">
        {questions.map((question: any, index: any) => (
          <div
            className={`d-flex align-items-center gap-2 ${
              index === questionIndex ? "fw-bold" : ""
            }`}
          >
            <FaRegQuestionCircle />
            <p className="m-0 text-danger">{question.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}