import reducer, {
    wsConnectionAllInit,
    wsConnectionClose, wsConnectionClosed, wsConnectionError, wsConnectionSuccess,
    wsConnectionUserInit,
    reset, wsConnectionGetMessage,
    initialState as testInitialState
} from "./orderFeed";
import {testWsDataAll} from "../utils/data";

describe('orderFeed reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(testInitialState)
    })

    it('should handle wsConnectionAllInit', () => {
        expect(reducer({...testInitialState, userPage: true}, wsConnectionAllInit())).toEqual(testInitialState)
    })

    it('should handle wsConnectionUserInit', () => {
        expect(reducer(testInitialState, wsConnectionUserInit())).toEqual({...testInitialState, userPage: true})
    })

    it('should handle wsConnectionClose', () => {
        expect(reducer(testInitialState, wsConnectionClose())).toEqual(testInitialState)
    })

    it('should handle wsConnectionSuccess', () => {
        expect(reducer(testInitialState, wsConnectionSuccess())).toEqual({...testInitialState, wsConnected: true})
    })

    it('should handle wsConnectionError', () => {
        expect(reducer({...testInitialState, wsConnected: true}, wsConnectionError())).toEqual({...testInitialState, wsError: true})
    })

    it('should handle wsConnectionClosed', () => {
        expect(reducer({...testInitialState, wsConnected: true, wsError: true}, wsConnectionClosed())).toEqual(testInitialState)
    })

    it('should handle wsConnectionGetMessage', () => {
        expect(reducer(testInitialState, wsConnectionGetMessage(testWsDataAll))).toEqual({
            ...testInitialState,
            orders: testWsDataAll.orders,
            total: testWsDataAll.total,
            totalToday: testWsDataAll.totalToday
        })
    })

    it('should handle reset', () => {
        expect(reducer({...testInitialState, wsConnected: true, wsError: true}, reset())).toEqual(testInitialState)
    })
})