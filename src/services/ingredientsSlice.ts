import {createSlice} from "@reduxjs/toolkit";
import {request} from "../utils/api";
import {IBurgData} from "../utils/types";
import {AppDispatch} from "./index";

interface IInitialState {
    burgersData: Array<IBurgData>,
    ingredientRequest: boolean,
    ingredientFailed: boolean,
    ingredientLoaded: boolean
}

const initialState: IInitialState = {
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
        fetchSuccess(state, action: {payload: Array<IBurgData>}) {
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

export function getIngredients() {
    return function(dispatch: AppDispatch) {
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

export default ingredientsSlice.reducer