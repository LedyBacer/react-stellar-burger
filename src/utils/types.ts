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