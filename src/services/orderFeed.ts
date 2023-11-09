import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Order} from "../utils/types";

export interface IOrderFeedInitialState {
    orders: Array<Order> | null,
    total: number,
    totalToday: number,
    wsConnected: boolean,
    wsError: boolean,
    userPage: boolean,
}

const initialState: IOrderFeedInitialState = {
    orders: null,
    total: 0,
    totalToday: 0,
    wsConnected: false,
    wsError: false,
    userPage: false,
}

export const orderFeed = createSlice({
    name: 'orderFeed',
    initialState,
    reducers: {
        wsConnectionAllInit(state) {
            state.userPage = false
        },
        wsConnectionUserInit(state) {
            state.userPage = true
        },
        wsConnectionClose() {
            return initialState
        },
        wsConnectionSuccess(state) {
            state.wsConnected = true;
        },
        wsConnectionError(state) {
            state.wsConnected = false;
            state.wsError = true;
        },
        wsConnectionClosed(state) {
            state.wsConnected = false;
            state.wsError = false;
        },
        wsConnectionGetMessage(state, action: PayloadAction<{orders: Array<Order>, total?:number, totalToday?: number}>) {
            state.orders = action.payload.orders;
            if (action.payload.total) {
                state.total = action.payload.total;
            }
            if (action.payload.totalToday) {
                state.totalToday = action.payload.totalToday;
            }
        },
        reset() {
            return initialState
        },
    },
})

export const {reset, wsConnectionClose, wsConnectionSuccess, wsConnectionUserInit, wsConnectionAllInit, wsConnectionError, wsConnectionClosed, wsConnectionGetMessage } = orderFeed.actions

export default orderFeed.reducer