import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

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
