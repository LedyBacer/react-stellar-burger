import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useMemo} from "react";
import HomePage from "../index";
import {addIngredient} from "../../services/detailsSlice";
import {IngredientsDetails} from "../../components/ingredient-details/ingredient-details";

export default function ChosenIngredient() {
    const dispatch = useDispatch()
    const location = useLocation()
    const { id: ingredientID }  = useParams()
    const burgersData = useSelector(state => state.ingredients.burgersData);
    const isModal = location.state

    useEffect(() => {
        const [ ingredientData ] = burgersData.filter(item => item._id.includes(ingredientID))
        dispatch(addIngredient(ingredientData))
    }, [ingredientID]);

    if (isModal !== null) {
        return <HomePage />
    }

    return <IngredientsDetails standalone={true}/>
}