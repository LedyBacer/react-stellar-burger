import {configureStore} from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice"
import orderSlice from "./orderSlice";
import constructorSlice from "./constructorSlice";
import detailsSlice from "./detailsSlice";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        order: orderSlice,
        constructorCart: constructorSlice,
        details: detailsSlice,
        auth: authSlice,
        modal: modalSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch