import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IIngredientsId {
    ingredientId: string,
    cardId: string
}

type TInitialState = {
    ingredientsId: Array<IIngredientsId>,
    bunId: string
}

const initialState: TInitialState = {
    ingredientsId: [],
    bunId: '',
}

const constructorSlice = createSlice({
    name: 'constructorCart',
    initialState,
    reducers: {
        addIngredient(state, action: PayloadAction<string>) {
            state.ingredientsId.push({
                ingredientId: action.payload,
                cardId: crypto.randomUUID()
            });
        },
        removeIngredient(state, action: PayloadAction<number>) {
            state.ingredientsId.splice(action.payload, 1)
        },
        clearCart() {
            return initialState
        },
        replaceBun(state, action: PayloadAction<string>) {
            state.bunId = action.payload;
        },
        moveCardSlice(state, action: PayloadAction<[dragIndex: number, hoverIndex: number]>) {
            const [ dragIndex, hoverIndex ] = action.payload
            const updatedElement = state.ingredientsId[dragIndex];

            state.ingredientsId.splice(dragIndex, 1);
            state.ingredientsId.splice(hoverIndex, 0, updatedElement)
        }
    },
})

export const { addIngredient, removeIngredient, moveCardSlice, replaceBun, clearCart } = constructorSlice.actions
export default constructorSlice.reducer