import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    isClosing: boolean
}

const initialState: IInitialState = {
    isClosing: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        handleClosing(state, action: PayloadAction<boolean>) {
            state.isClosing = action.payload
        }
    },
});

export const { handleClosing  } = modalSlice.actions

export default modalSlice.reducer