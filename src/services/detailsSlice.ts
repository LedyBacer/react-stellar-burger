import {createSlice} from "@reduxjs/toolkit";
import {IBurgData} from "../utils/types";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IDetailsSliceInitialState {
    ingDetails: IBurgData,
    modalType: string,
    modalHeader: string,
    isOpen: boolean
}

const initialState: IDetailsSliceInitialState = {
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
        addIngredient(state, action: PayloadAction<IBurgData>) {
            state.ingDetails = action.payload;
        },
        setModalType(state, action: PayloadAction<string>) {
            state.modalType = action.payload
        },
        setModalHeader(state, action: PayloadAction<string>) {
            state.modalHeader = action.payload
        },
        setIsOpen(state, action: PayloadAction<boolean>) {
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