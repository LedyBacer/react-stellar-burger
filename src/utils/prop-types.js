import PropTypes from "prop-types";

export const burgData = {
    _id: PropTypes.string.isRequired,
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
};

export const ingredientItem = {
    ingredient: PropTypes.shape(burgData).isRequired,
    handleCart: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
}

export const includingIngredients = {
    burgersData: PropTypes.arrayOf(PropTypes.shape(burgData)).isRequired,
    cart: PropTypes.arrayOf(PropTypes.shape({
        ingredientId: PropTypes.string.isRequired,
        cardId: PropTypes.number.isRequired
    })).isRequired,
    handleCart: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export const bunIngredient = {
    position: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ingredient: PropTypes.shape(burgData).isRequired
}

export const ingredientsPropType = {
    item: PropTypes.shape(burgData).isRequired,
    handleClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};

export const modalOverlayPropType = {
    handleClose: PropTypes.func.isRequired
}