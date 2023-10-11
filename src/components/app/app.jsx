import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-сonstructor/burger-constructor";
import React, {useEffect} from 'react';
import Modal from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";
import {IngredientsDetails} from "../ingredient-details/ingredient-details";
import {getIngredients} from "../../services/ingredientsSlice";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const dispatch = useDispatch();
    const isLoaded = useSelector(state => state.ingredients.ingredientLoaded);
    const isModalOpen = useSelector(state => state.details.isOpen);
    const modalType = useSelector(state => state.details.modalType);

    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    return (
        <>
            {isLoaded ?
                <div className={styles.app}>
                    <AppHeader />
                    <main className={styles.main}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </main>
                    {isModalOpen &&
                        <Modal>
                            {modalType === "order" ? (
                                <OrderDetails />
                            ) : (
                                <IngredientsDetails />
                            )}
                        </Modal>
                    }
                </div>
            : <p>Загрузка...</p>}
        </>
    );
}

export default App;
