import {createSlice} from "@reduxjs/toolkit";

const constructorSlice = createSlice({
    name: 'constructorCart',
    initialState: {
        ingredientsId: [],
        bunId: '',
    },
    reducers: {
        addIngredient(state, action) {
            state.ingredientsId.push({
                ingredientId: action.payload,
                cardId: crypto.randomUUID()
            });
        },
        removeIngredient(state, action) {
            state.ingredientsId.splice(action.payload, 1)
        },
        clearCart(state) {
            state.ingredientsId = []
            state.bunId = ''
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

export const { addIngredient, removeIngredient, moveCardSlice, replaceBun, clearCart } = constructorSlice.actions
export default constructorSlice.reducer