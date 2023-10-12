import {createSlice} from "@reduxjs/toolkit";
import {request} from "../utils/api";
import {clearCart} from "./constructorSlice";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        id: "000000",
        orderErr: false,
        orderRequest: false,
        orderReady: false
    },
    reducers: {
        fetchStarted(state) {
            state.orderRequest = true;
            state.orderErr = false;
            state.orderReady = false;
        },
        fetchSuccess(state, action) {
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

export function placeOrder(payload) {
    return function(dispatch) {
        dispatch(orderSlice.actions.fetchStarted());

        const [ items, bun ] = payload;
        let tempCart = [bun, bun];
        items.map(e => tempCart.push(e.ingredientId));

        request('/orders', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ingredients: tempCart
            }),
        })
            .then(res => {
                dispatch(orderSlice.actions.fetchSuccess(res.order.number))
                dispatch(clearCart())
            })
            .catch(err => {
                dispatch(orderSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export const { setIngredients, setItem } = orderSlice.actions
export default orderSlice.reducer