import reducer, {
    IAuthSliceInitialState,
    fetchStarted,
    fetchSuccess,
    fetchError,
    setRedirection,
    updateInfo, updateToken, handleLogout, jwtExpired, jwtRenewedFalse
} from "./authSlice";
import {testUser} from "../utils/data";

const testInitialState: IAuthSliceInitialState = {
    userEmail: '',
    userName: '',
    accessToken: null,
    isLogin: false,
    requestErr: false,
    requestInProcess: false,
    redirectNeeded: false,
    jwtExpired: false,
    jwtRenewed: false
};

const testChangedState: IAuthSliceInitialState = {
    userEmail: 'test',
    userName: 'test',
    accessToken: 'test',
    isLogin: true,
    requestErr: true,
    requestInProcess: true,
    redirectNeeded: true,
    jwtExpired: true,
    jwtRenewed: true
};

describe('authSlice reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(testInitialState)
    })

    it('should handle fetchStarted', () => {
        expect(reducer({...testInitialState, redirectNeeded: true, requestErr: true}, fetchStarted())).toEqual({...testInitialState, requestInProcess: true})
    })

    it('should handle fetchSuccess', () => {
        expect(reducer({...testInitialState, requestInProcess: true}, fetchSuccess())).toEqual(testInitialState)
    })

    it('should handle fetchError', () => {
        expect(reducer({...testInitialState, requestInProcess: true}, fetchError())).toEqual({...testInitialState, requestErr: true})
    })

    it('should handle setRedirection', () => {
        expect(reducer(testInitialState, setRedirection())).toEqual({...testInitialState, redirectNeeded: true})
    })

    it('should handle updateInfo', () => {
        expect(reducer(testInitialState, updateInfo({user: testUser}))).toEqual({
            ...testInitialState,
            userEmail: testUser.email,
            userName: testUser.name,
            isLogin: true
        })
    })

    it('should handle updateToken', () => {
        expect(reducer({...testInitialState, jwtExpired: true, jwtRenewed: false}, updateToken('token'))).toEqual({
            ...testInitialState,
            jwtExpired: false,
            jwtRenewed: true,
            accessToken: 'token'
        })
    })

    it('should handle handleLogout', () => {
        expect(reducer(testChangedState, handleLogout())).toEqual(testInitialState)
    })

    it('should handle jwtExpired', () => {
        expect(reducer(testInitialState, jwtExpired())).toEqual({...testInitialState, jwtExpired: true})
    })

    it('should handle jwtRenewedFalse', () => {
        expect(reducer({...testInitialState, jwtRenewed: true}, jwtRenewedFalse())).toEqual(testInitialState)
    })

})