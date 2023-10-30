import {createSlice} from "@reduxjs/toolkit";
import {request} from "../utils/api";
import {eraseCookie, getCookie} from "../utils/cookie";
import {AppDispatch} from "./index";

interface IInitialState {
    userEmail: string,
    userName: string,
    accessToken: string,
    isLogin: boolean,
    requestErr: boolean,
    requestInProcess: boolean,
    redirectNeeded: boolean,
    jwtExpired: boolean,
    jwtRenewed: boolean
}

const initialState: IInitialState = {
    userEmail: '',
    userName: '',
    accessToken: '',
    isLogin: false,
    requestErr: false,
    requestInProcess: false,
    redirectNeeded: false,
    jwtExpired: false,
    jwtRenewed: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchStarted(state) {
            state.requestInProcess = true;
            state.requestErr = false;
            state.redirectNeeded = false;
        },
        fetchSuccess(state) {
            state.requestInProcess = false;
        },
        fetchError(state) {
            state.requestInProcess = false;
            state.requestErr = true;
        },
        setRedirection(state) {
          state.redirectNeeded = !state.redirectNeeded
        },
        updateInfo(state, action: {payload: {user: {email: string, name: string}}, type: any}) {
            state.userEmail = action.payload.user.email;
            state.userName = action.payload.user.name;
            state.isLogin = true;
        },
        updateToken(state, action: {payload: string, type: any}) {
            state.accessToken = action.payload;
            state.jwtExpired = false;
            state.jwtRenewed = true;
        },
        handleLogout() {
            return initialState
        },
        jwtExpired(state) {
            state.jwtExpired = true;
        },
        jwtRenewedFalse(state) {
            state.jwtRenewed = false;
        }
    },
})

export function forgotPasswordRequest(payload: string) {
    return function(dispatch: AppDispatch) {
        dispatch(authSlice.actions.fetchStarted());
        const email = payload;

        request('/password-reset', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email}),
        })
            .then(() => {
                dispatch(authSlice.actions.fetchSuccess());
                dispatch(authSlice.actions.setRedirection());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function resetPasswordRequest(payload: {password: string, token: string}) {
    return function(dispatch: AppDispatch) {
        dispatch(authSlice.actions.fetchStarted());
        const { password, token } = payload;

        request('/password-reset/reset', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({password, token}),
        })
            .then(() => {
                dispatch(authSlice.actions.fetchSuccess());
                dispatch(authSlice.actions.setRedirection());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function createUserRequest(payload: {password: string, email: string, name: string}) {
    return function(dispatch: AppDispatch) {
        dispatch(authSlice.actions.fetchStarted());
        const { email, password, name } = payload;

        request('/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password, name}),
        })
            .then(res => {
                const accessToken = res.accessToken?.split('Bearer ')[1] || 'error';
                dispatch(authSlice.actions.fetchSuccess());
                if (res.user) {dispatch(authSlice.actions.updateInfo({user: res.user}))}
                dispatch(authSlice.actions.updateToken(accessToken));
                // dispatch(authSlice.actions.setRedirection());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function loginUserRequest(payload: {password: string, email: string}) {
    return function(dispatch: AppDispatch) {
        dispatch(authSlice.actions.fetchStarted());
        const { email, password } = payload;

        request('/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password}),
        })
            .then(res => {
                const accessToken = res.accessToken?.split('Bearer ')[1] || 'error';
                dispatch(authSlice.actions.fetchSuccess());
                if (res.user) {dispatch(authSlice.actions.updateInfo({user: res.user}))}
                dispatch(authSlice.actions.updateToken(accessToken));
                // dispatch(authSlice.actions.setRedirection());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function refreshTokenRequest() {
    return function(dispatch: AppDispatch) {
        dispatch(authSlice.actions.fetchStarted());

        request('/auth/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: getCookie('refreshToken')}),
        })
            .then(res => {
                const accessToken = res.accessToken?.split('Bearer ')[1] || 'error';
                dispatch(authSlice.actions.updateToken(accessToken));
                dispatch(authSlice.actions.fetchSuccess());
            })
            .catch(err => {
                eraseCookie('refreshToken');
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function userLogoutRequest() {
    return function(dispatch: AppDispatch) {
        dispatch(authSlice.actions.fetchStarted());

        request('/auth/logout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: getCookie('refreshToken')}),
        })
            .then(() => {
                dispatch(authSlice.actions.fetchSuccess());
                dispatch(authSlice.actions.handleLogout());
                eraseCookie('refreshToken');
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function getUserInfoRequest(payload: string) {
    return function(dispatch: AppDispatch) {
        dispatch(authSlice.actions.fetchStarted())

        request('/auth/user', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + payload
            }
        })
            .then(res => {
                if (res.user) {dispatch(authSlice.actions.updateInfo({user: res.user}))}
                dispatch(authSlice.actions.fetchSuccess());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function updateUserInfoRequest(payload: {email: string, password: string, name: string, accessToken: string}) {
    return function(dispatch: AppDispatch) {
        dispatch(authSlice.actions.fetchStarted())
        const {email, password, name, accessToken} = payload;
        console.log(payload)

        request('/auth/user', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + accessToken
            },
            body: JSON.stringify({email, password, name}),
        })
            .then(res => {
                if (res.user) {dispatch(authSlice.actions.updateInfo({user: res.user}))}
                dispatch(authSlice.actions.fetchSuccess());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export const { setRedirection } = authSlice.actions
export default authSlice.reducer