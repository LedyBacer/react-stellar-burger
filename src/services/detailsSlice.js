import {createSlice} from "@reduxjs/toolkit";

const detailsSlice = createSlice({
    name: 'details',
    initialState: {
        ingDetails: {},
        modalType: '',
        modalHeader: '',
        isOpen: false
    },
    reducers: {
        addIngredient(state, action) {
            state.ingDetails = action.payload;
        },
        removeIngredient(state) {
            state.ingDetails = {}
        },
        setModalType(state, action) {
            state.modalType = action.payload
        },
        setModalHeader(state, action) {
            state.modalHeader = action.payload
        },
        setIsOpen(state, action) {
            state.isOpen = action.payload
        }
    },
})

export const { addIngredient, removeIngredient, setModalType, setModalHeader, setIsOpen  } = detailsSlice.actions
export default detailsSlice.reducer