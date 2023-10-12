import {createSlice} from "@reduxjs/toolkit";
import {apiAdress} from "../utils/api";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        id: "000000",
        orderErr: false,
        orderRequest: false,
        orderReady: false
    },
    reducers: {
        fetchStarted(state, action) {
            state.orderRequest = true;
            state.orderErr = false;
            state.orderReady = false;
        },
        fetchSuccess(state, action) {
            state.orderRequest = false;
            state.id = action.payload;
            state.orderReady = true;
        },
        fetchError(state, action) {
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

        fetch(apiAdress, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ingredients: tempCart
            }),
        })
            .then(res => res.json())
            .then(res => {
                if (res && res.success) {
                    dispatch(orderSlice.actions.fetchSuccess(res.order.number))
                } else {
                    dispatch(orderSlice.actions.fetchError())
                }
            })
            .catch(err => {
                dispatch(orderSlice.actions.fetchError());
                console.error(err);
            });
    }
}

export const { setIngredients, setItem } = orderSlice.actions
export default orderSlice.reducer