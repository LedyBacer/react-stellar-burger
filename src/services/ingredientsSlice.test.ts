import reducer, {fetchError, fetchStarted, fetchSuccess,
initialState as testInitialState
} from "./ingredientsSlice";
import {testBurgerData} from "../utils/data";

describe('ingredientsSlice reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(testInitialState)
    })

    it('should handle fetchStarted', () => {
        expect(reducer(testInitialState, fetchStarted())).toEqual({
            ...testInitialState,
            ingredientRequest: true
        })
    })

    it('should handle fetchSuccess', () => {
        expect(reducer({...testInitialState, ingredientRequest: true}, fetchSuccess(testBurgerData))).toEqual({
            ...testInitialState,
            burgersData: testBurgerData,
            ingredientLoaded: true
        })
    })

    it('should handle fetchError', () => {
        expect(reducer({...testInitialState, ingredientRequest: true}, fetchError())).toEqual({
            ...testInitialState,
            ingredientFailed: true
        })
    })

})