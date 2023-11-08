import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice"
import orderSlice from "./orderSlice";
import constructorSlice from "./constructorSlice";
import detailsSlice from "./detailsSlice";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";
import orderFeed, {orderFeed as orderFeedSlice} from "./orderFeed";
import {socketMiddleware} from "../middleware/wsMiddleware";

const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    order: orderSlice,
    constructorCart: constructorSlice,
    details: detailsSlice,
    auth: authSlice,
    modal: modalSlice,
    orderFeed: orderFeed,
})

const wsUrl = {
    forAll: 'wss://norma.nomoreparties.space/orders/all',
    forUser: 'wss://norma.nomoreparties.space/orders'
}

const wsActions = {
    wsAllInit: orderFeedSlice.actions.wsConnectionAllInit.type,
    wsUserInit: orderFeedSlice.actions.wsConnectionUserInit.type,
    onOpen: orderFeedSlice.actions.wsConnectionSuccess.type,
    onClose: orderFeedSlice.actions.wsConnectionClose.type,
    onError: orderFeedSlice.actions.wsConnectionError.type,
    onMessage: orderFeedSlice.actions.wsConnectionGetMessage.type
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsActions)),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch