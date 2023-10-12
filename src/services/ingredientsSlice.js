import {createSlice} from "@reduxjs/toolkit";
import {apiGetIng} from "../utils/api";

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
        fetch(apiGetIng)
            .then(res => res.json())
            .then(res => {
                if (res && res.success) {
                    dispatch(ingredientsSlice.actions.fetchSuccess(res.data))
                } else {
                    dispatch(ingredientsSlice.actions.fetchError())
                }
            })
            .catch(err => {
                dispatch(ingredientsSlice.actions.fetchError())
                console.error(err)
            });
    }
}

export default ingredientsSlice.reducer