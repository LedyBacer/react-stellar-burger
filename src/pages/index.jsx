import styles from "./indedx.module.css";
import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-сonstructor/burger-constructor";
import React, {useEffect} from 'react';
import Modal from "../components/modal/modal";
import {OrderDetails} from "../components/order-details/order-details";
import {IngredientsDetails} from "../components/ingredient-details/ingredient-details";
import {getIngredients} from "../services/ingredientsSlice";
import {useDispatch, useSelector} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd'
import {Loading} from "../components/loading/loading";
import {useParams} from "react-router-dom";
import {addIngredient, setIsOpen, setModalHeader, setModalType} from "../services/detailsSlice";

function HomePage() {
    const dispatch = useDispatch();
    // const isLoaded = useSelector(state => state.ingredients.ingredientLoaded);
    const isModalOpen = useSelector(state => state.details.isOpen);
    const modalType = useSelector(state => state.details.modalType);

    const { id: ingredientID }  = useParams();
    const burgersData = useSelector(state => state.ingredients.burgersData);

    useEffect(() => {
        dispatch(setIsOpen(false))
    }, [])

    useEffect(() => {
        if (ingredientID) {
            const [ tempIngData ] = burgersData.filter(item => item._id.includes(ingredientID))
            dispatch(addIngredient(tempIngData));
            dispatch(setModalType(''));
            dispatch(setModalHeader('Детали ингредиента'));
            dispatch(setIsOpen(true));
        }
    }, [ingredientID])

    return (
        <div className={styles.index}>
            <AppHeader />
            {/*{isLoaded ?*/}
            {/*    <>*/}
                    <DndProvider backend={HTML5Backend}>
                        <main className={styles.main}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </main>
                    </DndProvider>
                    {isModalOpen &&
                        <Modal>
                            {modalType === "order" ? (
                                <OrderDetails />
                            ) : (
                                <IngredientsDetails />
                            )}
                        </Modal>
                    }
            {/*    </>*/}
            {/*:*/}
            {/*    <Loading />*/}
            {/*}*/}
        </div>
    );
}

export default HomePage;
