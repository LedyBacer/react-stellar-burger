import {createSlice} from "@reduxjs/toolkit";

const constructorSlice = createSlice({
    name: 'constructorCart',
    initialState: {
        ingredientsId: [{
            ingredientId: "643d69a5c3f7b9001cfa0945",
            cardId: 0
        }, {
            ingredientId: "643d69a5c3f7b9001cfa093f",
            cardId: 1
        }, {
            ingredientId: "643d69a5c3f7b9001cfa0949",
            cardId: 2
        }, {
            ingredientId: "643d69a5c3f7b9001cfa0945",
            cardId: 3
        }],
        bunId: '643d69a5c3f7b9001cfa093c',
        currentMaxIdCounter: 4
    },
    reducers: {
        addIngredient(state, action) {
            state.ingredientsId.push({
                ingredientId: action.payload,
                cardId: state.currentMaxIdCounter
            });
            state.currentMaxIdCounter += 1;
        },
        removeIngredient(state, action) {
            state.ingredientsId.splice(action.payload, 1)
        },
        replaceBun(state, action) {
            state.bunId = action.payload;
        },
        moveCardSlice(state, action) {
            const [ dragIndex, hoverIndex ] = action.payload
            const updatedElement = state.ingredientsId[dragIndex];

            state.ingredientsId.splice(dragIndex, 1);
            state.ingredientsId.splice(hoverIndex, 0, updatedElement)
        }
    },
})

export const { addIngredient, removeIngredient, moveCardSlice, replaceBun } = constructorSlice.actions
export default constructorSlice.reducer