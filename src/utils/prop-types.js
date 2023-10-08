import PropTypes from "prop-types";

export const burgData = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
});

export const burgerIngredientsPropType = {
    burgersData: PropTypes.arrayOf(burgData).isRequired,
    cart: PropTypes.array.isRequired,
    handleCart: PropTypes.func.isRequired,
    handleIngredientData: PropTypes.func.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    setModalType: PropTypes.func.isRequired,
    setModalHeader: PropTypes.func.isRequired,
};

export const burgerConstructorPropType = {
    total: PropTypes.number.isRequired,
    burgersData: PropTypes.arrayOf(burgData).isRequired,
    cart: PropTypes.array.isRequired,
    handleCart: PropTypes.func.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    setModalType: PropTypes.func.isRequired,
    setModalHeader: PropTypes.func.isRequired,
}

export const modalPropType = {
    handleModalOpen: PropTypes.func.isRequired,
    modalHeader: PropTypes.string,
}

export const ingredientsDetailsPropType = {
    ingredientData: PropTypes.shape({burgData}),
}