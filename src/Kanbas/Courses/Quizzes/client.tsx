import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/attempts`;

export const findQuizzesForCourse = async (cid: String) => {
  const response = await axios.get(`${QUIZZES_API}?cid=${cid}`);
  return response.data;
};

export const findQuizById = async (qid: String) => {
  const response = await axios.get(`${QUIZZES_API}/${qid}`);
  return response.data;
};

export const createQuiz = async (quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}`, quiz);
  return response.data;
};

export const updateQuiz = async (qid: String, quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${qid}`, quiz);
  return response.data;
};

export const deleteQuiz = async (qid: String) => {
  const response = await axios.delete(`${QUIZZES_API}/${qid}`);
  return response.data;
};

export const createQuestion = async (qid: String, question: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${qid}/questions`,
    question
  );
  return response.data;
};

export const findQuestionsForQuiz = async (qid: String) => {
  const response = await axios.get(`${QUIZZES_API}/${qid}/questions`);
  return response.data;
};

export const updateQuestion = async (qid: String, question: any) => {
  const response = await axios.put(
    `${QUIZZES_API}/${qid}/questions/${question._id}`,
    question
  );
  return response.data;
};

export const createAttempt = async (attempt: any) => {
  try {
    const response = await axios.post(`${ATTEMPTS_API}`, attempt);
    return response.data;
  } catch (error) {
    console.error("Error creating attempt:", error);
    throw error;
  }
};

export const findAttemptsForQuizAndUser = async (qid: String, uid: String) => {
  const response = await axios.get(`${ATTEMPTS_API}?qid=${qid}&uid=${uid}`);
  return response.data;
};
