import reducer, {IOrderSliceInitialState, fetchStarted, fetchSuccess, fetchError} from "./orderSlice";


const testInitialState: IOrderSliceInitialState = {
    id: "000000",
    orderErr: false,
    orderRequest: false,
    orderReady: true,
}

describe('orderSlice reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(testInitialState)
    })

    it('should handle fetchStarted', () => {
        expect(reducer({...testInitialState, orderErr: false}, fetchStarted())).toEqual({...testInitialState, orderRequest: true, orderReady: false})
    })

    it('should handle fetchSuccess', () => {
        expect(reducer({...testInitialState, orderRequest: true, orderReady: false}, fetchSuccess('123'))).toEqual({
            ...testInitialState,
            orderRequest: false,
            orderReady: true,
            id: '123'
        })
    })

    it('should handle fetchError', () => {
        expect(reducer({...testInitialState, orderRequest: true}, fetchError())).toEqual({
            ...testInitialState,
            orderErr: true
        })
    })
})