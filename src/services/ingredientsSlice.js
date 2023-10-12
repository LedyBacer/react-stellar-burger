import {createSlice} from "@reduxjs/toolkit";
import {request} from "../utils/api";

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        burgersData: [],
        ingredientRequest: false,
        ingredientFailed: false,
        ingredientLoaded: false
    },
    reducers: {
        fetchStarted(state) {
            state.ingredientRequest = true;
            state.ingredientFailed = false;
            state.ingredientLoaded = false;
        },
        fetchSuccess(state, action) {
            state.ingredientRequest = false;
            state.burgersData = [...action.payload];
            state.ingredientLoaded = true;
        },
        fetchError(state) {
            state.ingredientRequest = false;
            state.ingredientFailed = true;
        }
    },
});

export function getIngredients() {
    return function(dispatch) {
        dispatch(ingredientsSlice.actions.fetchStarted());
        request('/ingredients')
            .then(res => {
                dispatch(ingredientsSlice.actions.fetchSuccess(res.data))
            })
            .catch(err => {
                dispatch(ingredientsSlice.actions.fetchError())
                console.error(err)
            });
    }
}

export default ingredientsSlice.reducer