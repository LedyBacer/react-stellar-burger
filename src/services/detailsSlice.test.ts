import reducer, {
    addIngredient,
    IDetailsSliceInitialState,
    setIsOpen,
    setModalHeader,
    setModalType,
    initialState as initialIngDetails
} from "./detailsSlice";

const testIngDetails = {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0
}

describe('detailsSlice reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(initialIngDetails)
    })

    it('should handle addIngredient', () => {
        expect(reducer(initialIngDetails, addIngredient(testIngDetails))).toEqual({
            ...initialIngDetails,
            ingDetails: testIngDetails
        })
    })

    it('should handle setModalType', () => {
        expect(reducer(initialIngDetails, setModalType('modalType'))).toEqual({
            ...initialIngDetails,
            modalType: 'modalType'
        })
    })

    it('should handle setModalHeader', () => {
        expect(reducer(initialIngDetails, setModalHeader('modalHeader'))).toEqual({
            ...initialIngDetails,
            modalHeader: 'modalHeader'
        })
    })

    it('should handle setIsOpen open', () => {
        expect(reducer(initialIngDetails, setIsOpen(true))).toEqual({
            ...initialIngDetails,
            isOpen: true
        })
    })

    it('should handle setIsOpen close', () => {
        const previousState: IDetailsSliceInitialState = {
            ingDetails: testIngDetails,
            modalType: 'modalType',
            modalHeader: 'modalHeader',
            isOpen: true
        }

        expect(reducer(previousState, setIsOpen(false))).toEqual(initialIngDetails)
    })

})