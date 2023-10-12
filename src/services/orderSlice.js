import {createSlice} from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        id: "034536",
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
        }
    },
})

export function placeOrder(payload) {
    return function(dispatch) {
        dispatch(orderSlice.actions.fetchStarted());

        const [ items, bun ] = payload;
        let tempCart = [bun];
        items.map(e => tempCart.push(e.ingredientId));

        fetch("https://norma.nomoreparties.space/api/orders", {
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
                dispatch(orderSlice.actions.fetchError())
            });
    }
}

export const { setIngredients, setItem } = orderSlice.actions
export default orderSlice.reducer