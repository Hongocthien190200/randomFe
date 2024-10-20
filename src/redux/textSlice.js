import { createSlice } from "@reduxjs/toolkit";
const textSlice = createSlice({
    name: "text",
    initialState: {
        createtext: {
            isFetching: false,
            error: false,
            success: false
        },
        deletetext: {
            isFetching: false,
            error: false,
            success: false
        },
        texts: {
            listtexts: null,
            isFetching: false,
            error: false,
        }

    },
    reducers: {
        createTextStart: (state) => {
            state.createtext.isFetching = true;
        },
        createTextSuccess: (state) => {
            state.createtext.isFetching = false;
            state.createtext.error = false;
            state.createtext.success = true;
        },
        createTextFailed: (state) => {
            state.createtext.isFetching = false;
            state.createtext.error = true;
            state.createtext.success = false;
        },
        deleteTextStart: (state) => {
            state.deletetext.isFetching = true;
        },
        deleteTextSuccess: (state) => {
            state.deletetext.isFetching = false;
            state.deletetext.error = false;
            state.deletetext.success = true;
        },
        deleteTextFailed: (state) => {
            state.deletetext.isFetching = false;
            state.deletetext.error = true;
            state.deletetext.success = false;
        },
        getTextStart: (state) => {
            state.texts.isFetching = true;
        },
        getTextSuccess: (state, action) => {
            state.texts.isFetching = false;
            state.texts.listtexts = action.payload;
            state.texts.error = false;
        },
        getTextFailed: (state) => {
            state.texts.isFetching = false;
            state.texts.error = true;
        },

    }
});
export const {
    createTextStart,
    createTextSuccess,
    createTextFailed,
    deleteTextStart,
    deleteTextSuccess,
    deleteTextFailed,
    getTextStart,
    getTextSuccess,
    getTextFailed,
} = textSlice.actions;
export default textSlice.reducer;