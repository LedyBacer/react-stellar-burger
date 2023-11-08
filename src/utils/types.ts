import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../services";

export type TAppThunkAction = ThunkAction<void, RootState, unknown, AnyAction>

export interface Order {
    _id: string,
    ingredients: Array<string>,
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
}

export interface IBurgData {
    _id: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    __v: number,
}

export interface IAPIres {
    success: boolean,
    user?: {
        email: string,
        name: string
    }
    name?: string,
    email?: string,
    message?: string,
    accessToken?: string,
    refreshToken?: string,
    data?: Array<IBurgData>,
    order?: {
        number: number
    }
}

export type TItem = {
    id: string,
    index: number
}