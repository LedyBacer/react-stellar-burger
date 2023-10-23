import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import styles from "./ingredients.module.css";
import React, {useMemo} from "react";
import HomePage from "../index";
import AppHeader from "../../components/app-header/app-header";

export default function ChosenIngredient() {
    const location = useLocation()
    const { id: ingredientID }  = useParams()
    const burgersData = useSelector(state => state.ingredients.burgersData);
    const [ ingredientData ] = useMemo(() => burgersData.filter(item => item._id.includes(ingredientID)),[ingredientID])
    const isModal = location.state

    if (isModal !== null) {
        return <HomePage />
    }

    return (
        <div className={styles.index}>
            <AppHeader />
            <div className={styles.box}>
                <p className="text text_type_main-large mt-10">Детали ингредиента</p>
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
        </div>
    )
}