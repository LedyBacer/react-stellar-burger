import {createSlice} from "@reduxjs/toolkit";

const constructorSlice = createSlice({
    name: 'constructorCart',
    initialState: {
        ingredientsId: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa093f", "643d69a5c3f7b9001cfa0949"]
    },
    reducers: {
        addIngredient(state, action) {
            state.ingredientsId.push(action.payload);
        },
        removeIngredient(state, action) {
            state.ingredientsId.splice(state.ingredientsId.indexOf(action.payload), 1);
        },
    },
})

export const { addIngredient, removeIngredient } = constructorSlice.actions
export default constructorSlice.reducer