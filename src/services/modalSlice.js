import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isClosing: false
    },
    reducers: {
        handleClosing(state, action) {
            state.isClosing = action.payload
        }
    },
});

export const { handleClosing  } = modalSlice.actions

export default modalSlice.reducer