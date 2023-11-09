import reducer, {fetchError, fetchStarted, fetchSuccess, IIngredientsSliceInitialState} from "./ingredientsSlice";
import {testBurgerData} from "../utils/data";

describe('ingredientsSlice reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual({
            burgersData: [],
            ingredientRequest: false,
            ingredientFailed: false,
            ingredientLoaded: false
        })
    })

    it('should handle fetchStarted', () => {
        const previousState: IIngredientsSliceInitialState = {
            burgersData: [],
            ingredientRequest: false,
            ingredientFailed: true,
            ingredientLoaded: true
        }

        expect(reducer(previousState, fetchStarted())).toEqual({
            burgersData: [],
            ingredientRequest: true,
            ingredientFailed: false,
            ingredientLoaded: false
        })
    })

    it('should handle fetchSuccess', () => {
        const previousState: IIngredientsSliceInitialState = {
            burgersData: [],
            ingredientRequest: true,
            ingredientFailed: false,
            ingredientLoaded: false
        }

        expect(reducer(previousState, fetchSuccess(testBurgerData))).toEqual({
            burgersData: testBurgerData,
            ingredientRequest: false,
            ingredientFailed: false,
            ingredientLoaded: true
        })
    })

    it('should handle fetchError', () => {
        const previousState: IIngredientsSliceInitialState = {
            burgersData: [],
            ingredientRequest: true,
            ingredientFailed: false,
            ingredientLoaded: false
        }

        expect(reducer(previousState, fetchError())).toEqual({
            burgersData: [],
            ingredientRequest: false,
            ingredientFailed: true,
            ingredientLoaded: false
        })
    })

})