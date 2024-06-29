import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
    assignments: assignments,
    assignment: {
        _id: "",
        title: "",
        course: "",
        description: "",
        points: "",
        available_date: "",
        due_date: ""
    },
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const newAssignments = [
                ...state.assignments,
                { ...assignment, _id: new Date().getTime().toString() }]
            state.assignments = newAssignments;
            state.assignment = {
                _id: "",
                title: "",
                course: "",
                description: "",
                points: "",
                available_date: "",
                due_date: ""
            };
            console.log(newAssignments);
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            console.log(assignmentId)
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            );
            console.log(state.assignments)
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignment._id ? assignment : a) as any;
            state.assignment = {
                _id: "",
                title: "",
                course: "",
                description: "",
                points: "",
                available_date: "",
                due_date: ""
            };
            console.log("update was called")
        },
        setAssignment: (state, { payload: assignment }) => {
            state.assignment = assignment;
            console.log(state.assignment);
        },
    }
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
