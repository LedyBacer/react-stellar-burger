import {createSlice} from "@reduxjs/toolkit";
import {request} from "../utils/api";
import {eraseCookie, getCookie} from "../utils/cookie";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userEmail: '',
        userName: '',
        accessToken: '',
        awaitPassReset: false,
        isLogin: false,
        requestErr: false,
        requestInProcess: false,
        redirectNeeded: false,
        jwtExpired: false,
        jwtRenewed: false
    },
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
        updateInfo(state, action) {
            state.userEmail = action.payload.user.email;
            state.userName = action.payload.user.name;
            state.isLogin = true;
        },
        updateToken(state, action) {
            state.accessToken = action.payload.accessToken;
            state.jwtExpired = false;
            state.jwtRenewed = true;
        },
        handleLogout(state) {
            state.userEmail = '';
            state.userName = '';
            state.accessToken = '';
            state.isLogin = false;
        },
        waitPassReset(state, action) {
            state.awaitPassReset = action.payload
        },
        jwtExpired(state) {
            state.jwtExpired = true;
        },
        jwtRenewedFalse(state) {
            state.jwtRenewed = false;
        }
    },
})

export function forgotPasswordRequest(payload) {
    return function(dispatch) {
        dispatch(authSlice.actions.fetchStarted());
        const email = payload;

        request('/password-reset', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email}),
        })
            .then(res => {
                dispatch(authSlice.actions.fetchSuccess());
                // dispatch(authSlice.actions.setRedirection());
                dispatch(authSlice.actions.waitPassReset(true))
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function resetPasswordRequest(payload) {
    return function(dispatch) {
        dispatch(authSlice.actions.fetchStarted());
        const { password, token } = payload;

        request('/password-reset/reset', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({password, token}),
        })
            .then(res => {
                dispatch(authSlice.actions.fetchSuccess());
                dispatch(authSlice.actions.setRedirection());
                dispatch(authSlice.actions.waitPassReset(false))
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function createUserRequest(payload) {
    return function(dispatch) {
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
                const accessToken = res.accessToken.split('Bearer ')[1];
                dispatch(authSlice.actions.fetchSuccess());
                dispatch(authSlice.actions.updateInfo({user: res.user}));
                dispatch(authSlice.actions.updateToken({accessToken}));
                // dispatch(authSlice.actions.setRedirection());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function loginUserRequest(payload) {
    return function(dispatch) {
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
                const accessToken = res.accessToken.split('Bearer ')[1];
                dispatch(authSlice.actions.fetchSuccess());
                dispatch(authSlice.actions.updateInfo({user: res.user}));
                dispatch(authSlice.actions.updateToken({accessToken}));
                // dispatch(authSlice.actions.setRedirection());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function refreshTokenRequest() {
    return function(dispatch) {
        dispatch(authSlice.actions.fetchStarted());

        request('/auth/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: getCookie('refreshToken')}),
        })
            .then(res => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                dispatch(authSlice.actions.updateToken({accessToken}));
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
    return function(dispatch) {
        dispatch(authSlice.actions.fetchStarted());

        request('/auth/logout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: getCookie('refreshToken')}),
        })
            .then(res => {
                dispatch(authSlice.actions.fetchSuccess());
                dispatch(authSlice.actions.handleLogout());
                eraseCookie('refreshToken');
                // dispatch(authSlice.actions.setRedirection());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function getUserInfoRequest(payload) {
    return function(dispatch) {
        dispatch(authSlice.actions.fetchStarted())

        request('/auth/user', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + payload
            }
        })
            .then(res => {
                dispatch(authSlice.actions.updateInfo({user: res.user}));
                dispatch(authSlice.actions.fetchSuccess());
            })
            .catch(err => {
                dispatch(authSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export function updateUserInfoRequest(payload) {
    return function(dispatch) {
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
                dispatch(authSlice.actions.updateInfo({user: res.user}));
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