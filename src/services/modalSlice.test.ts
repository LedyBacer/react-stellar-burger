import reducer, {IModalSliceInitialState, handleClosing} from './modalSlice'

describe('modalSlice reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(
            {
                isClosing: false
            }
        )
    })

    it('should handle handleClosing', () => {
        const previousState: IModalSliceInitialState = {isClosing: false}

        expect(reducer(previousState, handleClosing(true))).toEqual(
            {
                isClosing: true,
            }
        )
    })

})