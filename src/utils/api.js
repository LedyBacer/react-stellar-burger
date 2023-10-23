import {setCookie} from "./cookie";

export const BASE_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

const checkSuccess = (res) => (res && res.success) ? res : Promise.reject(`Ответ не success: ${res}`);

// const checkSuccessJWT = (res) => (res && res.success) ? res : Promise.reject(res);

const saveTokenToCookie = (res) => {
    // if (res.accessToken) {
    //     const accessToken = res.accessToken.split('Bearer ')[1];
    //     setCookie('accessToken', accessToken, {expires: 1200});
    // }
    if (res.refreshToken) {
        setCookie('refreshToken', res.refreshToken, {expires: 1800});
    }
    return res;
}

export function request(endpoint, options) {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess).then(saveTokenToCookie)
}

// export function requestJWT(endpoint, options) {
//     return fetch(`${BASE_URL}${endpoint}`, options).then(res => res.json).then(checkSuccessJWT)
// }