import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {request} from "../utils/api";
import {clearCart, IIngredientsId} from "./constructorSlice";
import {TAppThunkAction} from "../utils/types";

export interface IOrderSliceInitialState {
    id: string,
    orderErr: boolean,
    orderRequest: boolean,
    orderReady: boolean
}

export const initialState: IOrderSliceInitialState = {
    id: "000000",
    orderErr: false,
    orderRequest: false,
    orderReady: true,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchStarted(state) {
            state.orderRequest = true;
            state.orderErr = false;
            state.orderReady = false;
        },
        fetchSuccess(state, action: PayloadAction<string>) {
            state.orderRequest = false;
            state.orderReady = true;
            state.id = action.payload;
        },
        fetchError(state) {
            state.orderRequest = false;
            state.orderErr = true;
            state.id = "000000";
        }
    },
})

type TPayload = [
    items: Array<IIngredientsId>,
    bun: string,
    authorization: string
]

export function placeOrder(payload: TPayload): TAppThunkAction {
    return function(dispatch) {
        dispatch(orderSlice.actions.fetchStarted());

        const [ items, bun, authorization ] = payload;
        let tempCart = [bun, bun];
        items.map(e => tempCart.push(e.ingredientId));

        request('/orders', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + authorization
            },
            body: JSON.stringify({
                ingredients: tempCart
            }),
        })
            .then(res => {
                if (res.order) {
                    dispatch(orderSlice.actions.fetchSuccess(res.order.number.toString()))
                    dispatch(clearCart())
                }
            })
            .catch(err => {
                dispatch(orderSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export const { fetchStarted, fetchSuccess, fetchError  } = orderSlice.actions

export default orderSlice.reducer