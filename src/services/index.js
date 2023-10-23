import {configureStore} from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice"
import orderSlice from "./orderSlice";
import constructorSlice from "./constructorSlice";
import detailsSlice from "./detailsSlice";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        order: orderSlice,
        constructorCart: constructorSlice,
        details: detailsSlice,
        auth: authSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})