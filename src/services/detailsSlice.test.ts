import reducer, {
    addIngredient,
    IDetailsSliceInitialState,
    setIsOpen,
    setModalHeader,
    setModalType
} from "./detailsSlice";

const initialIngDetails = {
    _id: '',
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: 0,
    proteins: 0,
    type: '',
    __v: 0,
}

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
        expect(reducer(undefined, {type: undefined})).toEqual({
            ingDetails: initialIngDetails,
            modalType: '',
            modalHeader: '',
            isOpen: false
        })
    })

    it('should handle addIngredient', () => {
        const previousState: IDetailsSliceInitialState = {
            ingDetails: initialIngDetails,
            modalType: '',
            modalHeader: '',
            isOpen: false
        }

        expect(reducer(previousState, addIngredient(testIngDetails))).toEqual({
            ingDetails: testIngDetails,
            modalType: '',
            modalHeader: '',
            isOpen: false
        })
    })

    it('should handle setModalType', () => {
        const previousState: IDetailsSliceInitialState = {
            ingDetails: initialIngDetails,
            modalType: '',
            modalHeader: '',
            isOpen: false
        }

        expect(reducer(previousState, setModalType('modalType'))).toEqual({
            ingDetails: initialIngDetails,
            modalType: 'modalType',
            modalHeader: '',
            isOpen: false
        })
    })

    it('should handle setModalHeader', () => {
        const previousState: IDetailsSliceInitialState = {
            ingDetails: initialIngDetails,
            modalType: '',
            modalHeader: '',
            isOpen: false
        }

        expect(reducer(previousState, setModalHeader('modalHeader'))).toEqual({
            ingDetails: initialIngDetails,
            modalType: '',
            modalHeader: 'modalHeader',
            isOpen: false
        })
    })

    it('should handle setIsOpen open', () => {
        const previousState: IDetailsSliceInitialState = {
            ingDetails: initialIngDetails,
            modalType: '',
            modalHeader: '',
            isOpen: false
        }

        expect(reducer(previousState, setIsOpen(true))).toEqual({
            ingDetails: initialIngDetails,
            modalType: '',
            modalHeader: '',
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

        expect(reducer(previousState, setIsOpen(false))).toEqual({
            ingDetails: initialIngDetails,
            modalType: '',
            modalHeader: '',
            isOpen: false
        })
    })

})