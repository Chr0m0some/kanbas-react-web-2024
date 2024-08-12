import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quiz: {} as any,
  };

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuiz(state, action) {
            state.quiz = action.payload;
        },
    },
  });

export default quizzesSlice.reducer;