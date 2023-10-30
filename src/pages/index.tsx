import styles from "./indedx.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-сonstructor/burger-constructor";
import React, {useEffect} from 'react';
import Modal from "../components/modal/modal";
import {OrderDetails} from "../components/order-details/order-details";
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd'
import {handleClosing} from "../services/modalSlice";
import {useAppDispatch, useAppSelector} from "../hooks/typedHooks";

function HomePage() {
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(state => state.details.isOpen);
    const modalType = useAppSelector(state => state.details.modalType);
    const isClosing = useAppSelector(state => state.modal.isClosing);

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
