import {createSlice} from "@reduxjs/toolkit";

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        burgersData: [],
        ingredientRequest: false,
        ingredientFailed: false,
        ingredientLoaded: false
    },
    reducers: {
        fetchStarted(state, action) {
            state.ingredientRequest = true;
            state.ingredientFailed = false;
            state.ingredientLoaded = false;
        },
        fetchSuccess(state, action) {
            state.ingredientRequest = false;
            state.burgersData = [...action.payload];
            state.ingredientLoaded = true;
        },
        fetchError(state, action) {
            state.ingredientRequest = false;
            state.ingredientFailed = true;
        }
    },
});

export function getIngredients() {
    return function(dispatch) {
        dispatch(ingredientsSlice.actions.fetchStarted());
        fetch("https://norma.nomoreparties.space/api/ingredients")
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
            });
    }
}

export default ingredientsSlice.reducer