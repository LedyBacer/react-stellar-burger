import styles from "./indedx.module.css";
import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-сonstructor/burger-constructor";
import React, {useEffect} from 'react';
import Modal from "../components/modal/modal";
import {OrderDetails} from "../components/order-details/order-details";
import {IngredientsDetails} from "./ingredient-details/ingredient-details";
import {getIngredients} from "../services/ingredientsSlice";
import {useDispatch, useSelector} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd'
import {Loading} from "../components/loading/loading";
import {useParams} from "react-router-dom";
import {addIngredient, setIsOpen, setModalHeader, setModalType} from "../services/detailsSlice";
import {handleClosing} from "../services/modalSlice";

function HomePage() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.details.isOpen);
    const modalType = useSelector(state => state.details.modalType);
    const isClosing = useSelector(state => state.modal.isClosing);

    //подтверждение закрытия OrderDetails
    useEffect(() => {
        if (!isModalOpen && isClosing) {
            dispatch(handleClosing(false))
        }
    }, [isClosing, isModalOpen]);

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
            </DndProvider>
            {isModalOpen && modalType === "order" &&
                <Modal>
                    <OrderDetails />
                </Modal>
            }
        </>
    );
}

export default HomePage;
