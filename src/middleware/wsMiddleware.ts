import {Middleware} from "redux";
import {RootState} from "../services";

export const socketMiddleware = (wsUrl:Record<string, string>, wsActions:Record<string, string>): Middleware<{}, RootState> => storeApi => next => action => {
    let socket = null;

    const { dispatch, getState } = storeApi;
    const auth = getState().auth;
    const { type } = action;
    const {wsUserInit, wsAllInit, onOpen, onError, onMessage, onClose } = wsActions

    if (type === wsUserInit && auth.accessToken) {
        socket = new WebSocket(`${wsUrl.forUser}?token=${auth.accessToken}`);
    } else if (type === wsAllInit) {
        socket = new WebSocket(wsUrl.forAll);
    }

    if (socket && type === onClose) {
        socket.close(1000);
    }

    if (socket) {

        socket.onopen = () => {
            dispatch({ type: onOpen });
        };

        socket.onerror = event => {
            dispatch({ type: onError, payload: event });
        };

        socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
        };

        socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            dispatch({ type: onMessage, payload: restParsedData });
        };
    }

    next(action);
}