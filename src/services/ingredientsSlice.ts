import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {request} from "../utils/api";
import {IBurgData, TAppThunkAction} from "../utils/types";

export interface IIngredientsSliceInitialState {
    burgersData: Array<IBurgData>,
    ingredientRequest: boolean,
    ingredientFailed: boolean,
    ingredientLoaded: boolean
}

export const initialState: IIngredientsSliceInitialState = {
    burgersData: [],
    ingredientRequest: false,
    ingredientFailed: false,
    ingredientLoaded: false
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        fetchStarted(state) {
            state.ingredientRequest = true;
            state.ingredientFailed = false;
            state.ingredientLoaded = false;
        },
        fetchSuccess(state, action: PayloadAction<Array<IBurgData>>) {
            state.ingredientRequest = false;
            state.burgersData = action.payload;
            state.ingredientLoaded = true;
        },
        fetchError(state) {
            state.ingredientRequest = false;
            state.ingredientFailed = true;
        }
    },
});

export function getIngredients(): TAppThunkAction {
    return function(dispatch) {
        dispatch(ingredientsSlice.actions.fetchStarted());
        request('/ingredients')
            .then(res => {
                if (res.data) {dispatch(ingredientsSlice.actions.fetchSuccess(res.data))}
            })
            .catch(err => {
                dispatch(ingredientsSlice.actions.fetchError())
                console.error(err)
            });
    }
}

export const { fetchStarted, fetchSuccess, fetchError  } = ingredientsSlice.actions

export default ingredientsSlice.reducer