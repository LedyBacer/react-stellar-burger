import styles from "./app.module.css";
// import {data} from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-сonstructor/burger-constructor";
import React from 'react';
import Modal from "../modal/modal";
// import Test from "../test/test";
import {OrderDetails} from "../order-details/order-details";
import {IngredientsDetails} from "../ingredient-details/ingredient-details";

function App() {
    const [cart, handleCart] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [modalHeader, setModalHeader] = React.useState('');
    const [modalOpen, handleModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [ingredientData, handleIngredientData] = React.useState();
    const [burgersData, setBurgersData] = React.useState([]);

    React.useEffect(() => {
        fetch("https://norma.nomoreparties.space/api/ingredients")
            .then(res => res.json())
            .then((data) => {
                setBurgersData(data.data);
                handleCart(["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa093f", "643d69a5c3f7b9001cfa0949"])
            })
            .catch(console.error);
    }, []);

    React.useEffect(() => {
        let tempTotal = 0;

        cart.map((ingredientId) => {
            const [ ingredient ] = burgersData.filter(e => e._id.includes(ingredientId))
            tempTotal = tempTotal + ingredient.price
        })

        setTotal(tempTotal)
    }, [cart, burgersData]);

    return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
            <BurgerIngredients burgersData={burgersData} cart={cart} handleCart={handleCart} handleIngredientData={handleIngredientData} handleModalOpen={handleModalOpen} setModalType={setModalType} setModalHeader={setModalHeader}/>
            <BurgerConstructor burgersData={burgersData} cart={cart} handleCart={handleCart} total={total} handleModalOpen={handleModalOpen} setModalType={setModalType} setModalHeader={setModalHeader}/>
        </main>
        {modalOpen &&
            <Modal handleModalOpen={handleModalOpen} modalHeader={modalHeader}>
                {modalType === "order" ? (
                    <OrderDetails />
                ) : (
                    <IngredientsDetails ingredientData={ingredientData} />
                )}
            </Modal>
        }

        {/*<Test />*/}
    </div>
    );
}

export default App;
