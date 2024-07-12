import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    message: "Hello World. Life is great",
};
const helloSlice = createSlice({
    name: "hello",
    initialState,
    reducers: {},
});
export default helloSlice.reducer;