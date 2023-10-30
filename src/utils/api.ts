import {setCookie} from "./cookie";
import {IAPIres} from "./types";
export const BASE_URL : Readonly<string> = 'https://norma.nomoreparties.space/api'

const checkResponse = (res: Response) => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

const checkSuccess = (res: IAPIres) => (res && res.success) ? res : Promise.reject(`Ответ не success: ${res}`);

const saveTokenToCookie = (res: IAPIres) => {
    // if (res.accessToken) {
    //     const accessToken = res.accessToken.split('Bearer ')[1];
    //     setCookie('accessToken', accessToken, {expires: 1200});
    // }
    if (res.refreshToken) {
        setCookie('refreshToken', res.refreshToken, 1800 );
    }
    return res;
}

export function isTokenExpired(token: string) : boolean {
    //const payload = JSON.parse(atob(token.split('.')[1]));
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const exp = payload.exp * 1000;
    const now = Date.now();
    //console.log(exp, now)
    return exp < now;
}

export function request(endpoint: string, options: object = {}) {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess).then(saveTokenToCookie)
}