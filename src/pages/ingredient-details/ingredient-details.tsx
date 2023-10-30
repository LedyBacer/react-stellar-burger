import styles from "./ingredient-details.module.css";
import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {handleClosing} from "../../services/modalSlice";
import {addIngredient, setIsOpen, setModalHeader, setModalType} from "../../services/detailsSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/typedHooks";

type TIngredientsDetails = {
    standalone?: boolean
}

export function IngredientsDetails({standalone}: TIngredientsDetails) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { id: ingredientID }  = useParams();
    const burgersData = useAppSelector(state => state.ingredients.burgersData);
    const ingredientData = useAppSelector(state => state.details.ingDetails);

    const isClosing = useAppSelector(state => state.modal.isClosing);

    useEffect(() => {
        if (isClosing) {
            navigate(-1)
            dispatch(handleClosing(false))
        }
    }, [isClosing]);

    useEffect(() => {
        if (ingredientID) {
            const [ ingredientData ] = burgersData.filter((item) => item._id.includes(ingredientID))
            dispatch(addIngredient(ingredientData))
        }
    }, [ingredientID]);

    useEffect(() => {
        if (!standalone) {
            dispatch(setModalType(''));
            dispatch(setModalHeader('Детали ингредиента'));
            dispatch(setIsOpen(true));
        }
    }, [standalone]);

    return (
        <div className={styles.box}>
            {standalone ? <p className="text text_type_main-large mt-10">Детали ингредиента</p> : <></>}
            <img src={ingredientData.image_large} className="pb-4" alt={ingredientData.name}/>
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