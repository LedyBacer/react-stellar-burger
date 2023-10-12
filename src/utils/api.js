export const BASE_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

const checkSuccess = (res) => (res && res.success) ? res : Promise.reject(`Ответ не success: ${res}`);

export function request(endpoint, options) {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess)
}