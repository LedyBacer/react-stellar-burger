import {configureStore} from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice"
import orderSlice from "./orderSlice";
import constructorSlice from "./constructorSlice";
import detailsSlice from "./detailsSlice";

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        order: orderSlice,
        constructorCart: constructorSlice,
        details: detailsSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})