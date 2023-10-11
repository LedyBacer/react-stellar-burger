import styles from "./ingredient-details.module.css";
import {ingredientsDetailsPropType} from "../../utils/prop-types";
import {useSelector} from "react-redux";

export function IngredientsDetails() {
    const ingredientData = useSelector(state => state.details.ingDetails);

    return (
        <div className={styles.box}>
            <img src={ingredientData.image_large} className="pb-4" alt={ingredientData.name} />
            <p className="text text_type_main-medium pb-8">{ingredientData.name}</p>
            <div className={`${styles.row} text text_type_main-default text_color_inactive`}>
                <div className={styles.str + " mr-5"}>
                    <span>Калории,калл</span>
                    <span>{ingredientData.calories}</span>
                </div>
                <div className={`${styles.str} mr-5`}>
                    <span>Белки, г</span>
                    <span>{ingredientData.proteins}</span>
                </div>
                <div className={`${styles.str} mr-5`}>
                    <span>Жиры, г</span>
                    <span>{ingredientData.fat}</span>
                </div>
                <div className={styles.str}>
                    <span>Углеводы, г</span>
                    <span>{ingredientData.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}

IngredientsDetails.propTypes = { ...ingredientsDetailsPropType }