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
        setIngredients: (state, action) => state + action.payload,
        setItem: (state, action) => state + action.payload,
    },
})

export const { setIngredients, setItem } = orderSlice.actions
export default orderSlice.reducer