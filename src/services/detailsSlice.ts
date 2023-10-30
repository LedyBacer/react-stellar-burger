import {createSlice} from "@reduxjs/toolkit";
import {IBurgData} from "../utils/types";

interface IInitialState {
    ingDetails: IBurgData,
    modalType: string,
    modalHeader: string,
    isOpen: boolean
}

const initialState: IInitialState = {
    ingDetails: {
        _id: '',
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        image: '',
        image_large: '',
        image_mobile: '',
        name: '',
        price: 0,
        proteins: 0,
        type: '',
        __v: 0,
    },
    modalType: '',
    modalHeader: '',
    isOpen: false
}

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        addIngredient(state, action: {payload: IBurgData, type: any}) {
            state.ingDetails = action.payload;
        },
        setModalType(state, action: {payload: string, type: any}) {
            state.modalType = action.payload
        },
        setModalHeader(state, action: {payload: string, type: any}) {
            state.modalHeader = action.payload
        },
        setIsOpen(state, action: {payload: boolean, type: any}) {
            if (!action.payload) {
                return initialState;
            } else {
                state.isOpen = action.payload
            }
        }
    },
})

export const { addIngredient, setModalType, setModalHeader, setIsOpen  } = detailsSlice.actions
export default detailsSlice.reducer