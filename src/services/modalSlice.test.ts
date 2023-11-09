import reducer, {handleClosing,
initialState as testInitialState
} from './modalSlice'

describe('modalSlice reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(testInitialState)
    })

    it('should handle handleClosing', () => {
        expect(reducer(testInitialState, handleClosing(true))).toEqual({isClosing: true})
    })

})