import reducer, {
    TConstructorSliceInitialState,
    addIngredient,
    removeIngredient,
    clearCart,
    replaceBun, moveCardSlice
} from "./constructorSlice";
import * as uuid from 'uuid';
jest.mock('uuid');

describe('constructorSlice reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual({
            ingredientsId: [],
            bunId: '',
        })
    })

    it('should handle addIngredient', () => {
        const previousState: TConstructorSliceInitialState = {ingredientsId: [], bunId: '',}
        jest.spyOn(uuid, 'v4').mockReturnValue('mocked-uuid')

        expect(reducer(previousState, addIngredient('60666c42cc7b410027a1a9b1'))).toEqual({
            ingredientsId: [{
                ingredientId: '60666c42cc7b410027a1a9b1',
                cardId: 'mocked-uuid'
            }],
            bunId: '',
        })

        jest.spyOn(uuid, 'v4').mockRestore();
    })

    it('should handle removeIngredient', () => {
        const previousState: TConstructorSliceInitialState = {ingredientsId: [{ingredientId: '123', cardId: '321'}], bunId: 'ct76t',}

        expect(reducer(previousState, removeIngredient(0))).toEqual({
            ingredientsId: [],
            bunId: '',
        })
    })

    it('should handle clearCart', () => {
        const previousState: TConstructorSliceInitialState = {ingredientsId: [{ingredientId: '123', cardId: '321'}], bunId: 'ct76t',}

        expect(reducer(previousState, clearCart())).toEqual({
            ingredientsId: [],
            bunId: '',
        })
    })

    it('should handle replaceBun', () => {
        const previousState: TConstructorSliceInitialState = {ingredientsId: [{ingredientId: '123', cardId: '321'}], bunId: 'ct76t',}

        expect(reducer(previousState, replaceBun('333'))).toEqual({
            ingredientsId: [{ingredientId: '123', cardId: '321'}],
            bunId: '333',
        })
    })

    it('should handle moveCardSlice', () => {
        const previousState: TConstructorSliceInitialState = {ingredientsId: [{ingredientId: '1', cardId: '1'}, {ingredientId: '2', cardId: '2'}], bunId: 'ct76t',}

        expect(reducer(previousState, moveCardSlice([1, 0]))).toEqual({
            ingredientsId: [{ingredientId: '2', cardId: '2'}, {ingredientId: '1', cardId: '1'}],
            bunId: 'ct76t',
        })
    })
})