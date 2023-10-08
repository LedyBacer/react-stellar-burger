import React from "react";
import {
    Tab,
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import {burgerIngredientsPropType} from "../../utils/prop-types";

function ItemCounter(props) {
    const count = props.cart.filter((e) => e === props.id).length;

    return (
        <Counter count={count} size="default" extraClass="m-1" />
    );
}

function Ingredients(props) {

    return (
        <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
            {props.ingridientData.map(item => {
                return (
                    <div className={styles.ingridient} key={item._id} onClick={props.handleClick} data-id={item._id}>
                        {props.cart.includes(item._id) && <ItemCounter id={item._id} cart={props.cart}/>}
                        <img alt={item.name} src={item.image} className={`${styles.ingridient_image} ml-4`} data-id={item._id}/>
                        <div className={`${styles.price} mt-1`} data-id={item._id}>
                            <p className="text text_type_digits-default" data-id={item._id}>{item.price}</p>
                            <CurrencyIcon type="primary" data-id={item._id}/>
                        </div>
                        <p className="text text_type_main-default mt-1" data-id={item._id}>{item.name}</p>
                    </div>
                )
            })}
        </section>
    );
}

function BurgerIngredients({ burgersData, cart, handleCart, handleIngredientData, handleModalOpen, setModalType, setModalHeader }) {
    const [current, setCurrent] = React.useState('buns');

    const bunsData = React.useMemo(() => burgersData.filter(item => item.type.includes('bun')), [burgersData]);
    // const bunIds = React.useMemo(() => bunsData.map(e => e._id), [bunsData]);
    const saucesData = React.useMemo(() => burgersData.filter(item => item.type.includes('sauce')), [burgersData]);
    const fillersData = React.useMemo(() => burgersData.filter(item => item.type.includes('main')), [burgersData]);

    // const setCart = e => {
    //     const selectedProductId = e.target.getAttribute("data-id");
    //     // handleCart([...cart, selectedProductId]);
    //
    //     if (!cart.includes(selectedProductId) && cart.some(r => bunIds.indexOf(r) >= 0) && bunIds.includes(selectedProductId)) {
    //         bunIds.forEach(bunId => {
    //             if (cart.includes(bunId)) {
    //                 let tempCart = cart.filter((id) => {
    //                     return id !== bunId
    //                 });
    //                 tempCart = [...tempCart, selectedProductId];
    //                 handleCart(tempCart);
    //             }
    //         })
    //     } else if (!(cart.includes(selectedProductId) && bunIds.includes(selectedProductId))) {
    //         handleCart([...cart, selectedProductId]);
    //     }
    // }

    const setCart = e => {
        const selectedProductId = e.target.getAttribute("data-id");
        const [ tempIngData ] = burgersData.filter(item => item._id.includes(selectedProductId))
        handleIngredientData(tempIngData);
        setModalType('');
        setModalHeader('Детали ингредиента');
        handleModalOpen(true);
    }

    const allIngridients = {
        buns: <><p className="text text_type_main-medium mt-10">Булки</p><Ingredients ingridientData={bunsData} handleClick={setCart} cart={cart}/></>,
        sauces: <><p className="text text_type_main-medium mt-10">Соусы</p><Ingredients ingridientData={saucesData} handleClick={setCart} cart={cart}/></>,
        fillers: <><p className="text text_type_main-medium mt-10">Начинки</p><Ingredients ingridientData={fillersData} handleClick={setCart} cart={cart}/></>
    };

    const ingridientsOrder = {
        buns: ['buns', 'sauces', 'fillers'],
        sauces: ['sauces', 'fillers', 'buns'],
        fillers: ['fillers', 'buns', 'sauces']
    }

    return (
        <section className={styles.container}>
            <p className="text text_type_main-large mt-10">Соберите бургер</p>
            <div className={`${styles.flex} mt-5`}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="fillers" active={current === 'fillers'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <div className={styles.ingredient_container}>
                {ingridientsOrder[current].map((e) => {
                    return(
                        <section key={e.toString()}>
                            {allIngridients[e]}
                        </section>
                    )
                })}
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = { ...burgerIngredientsPropType };

export default BurgerIngredients