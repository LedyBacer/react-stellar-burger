import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export interface IIngredientsId {
    ingredientId: string,
    cardId: string
}

export type TConstructorSliceInitialState = {
    ingredientsId: Array<IIngredientsId>,
    bunId: string
}

const initialState: TConstructorSliceInitialState = {
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
                cardId: uuidv4()
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