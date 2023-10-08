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

function Buns(props) {

    return (
        <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
            {props.bunsData.map(bun => {
                return (
                    <div className={styles.ingridient} key={bun._id} onClick={props.handleClick} data-id={bun._id}>
                        {props.cart.includes(bun._id) && <ItemCounter id={bun._id} cart={props.cart}/>}
                        <img alt={'Картинка на которой изображёна булочка'} src={bun.image} className={`${styles.ingridient_image} ml-4`} data-id={bun._id}/>
                        <div className={`${styles.price} mt-1`} data-id={bun._id}>
                            <p className="text text_type_digits-default" data-id={bun._id}>{bun.price}</p>
                            <CurrencyIcon type="primary" data-id={bun._id}/>
                        </div>
                        <p className="text text_type_main-default mt-1" data-id={bun._id}>{bun.name}</p>
                    </div>
                )
            })}
        </section>
    );
}

function Sauces(props) {

    return (
        <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
            {props.saucesData.map(sauce => {
                return (
                    <div className={styles.ingridient} key={sauce._id} onClick={props.handleClick} data-id={sauce._id}>
                        {props.cart.includes(sauce._id) && <ItemCounter id={sauce._id} cart={props.cart}/>}
                        <img alt={'Картинка на которой изображён соус'} src={sauce.image} className={`${styles.ingridient_image} ml-4`} data-id={sauce._id}/>
                        <div className={`${styles.price} mt-1`} data-id={sauce._id}>
                            <p className="text text_type_digits-default" data-id={sauce._id}>{sauce.price}</p>
                            <CurrencyIcon type="primary" data-id={sauce._id}/>
                        </div>
                        <p className="text text_type_main-default mt-1" data-id={sauce._id}>{sauce.name}</p>
                    </div>
                )
            })}
        </section>
    );
}

function Fillers(props) {

    return (
        <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
            {props.fillersData.map(filler => {
                return (
                    <div className={styles.ingridient} key={filler._id} onClick={props.handleClick} data-id={filler._id}>
                        {props.cart.includes(filler._id) && <ItemCounter id={filler._id} cart={props.cart}/>}
                        <img alt={'Картинка на которой изображёна начинка'} src={filler.image} className={`${styles.ingridient_image} ml-4`} data-id={filler._id}/>
                        <div className={`${styles.price} mt-1`} data-id={filler._id}>
                            <p className="text text_type_digits-default" data-id={filler._id}>{filler.price}</p>
                            <CurrencyIcon type="primary" data-id={filler._id}/>
                        </div>
                        <p className="text text_type_main-default mt-1" data-id={filler._id}>{filler.name}</p>
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
        buns: <><p className="text text_type_main-medium mt-10">Булки</p><Buns bunsData={bunsData} handleClick={setCart} cart={cart}/></>,
        sauces: <><p className="text text_type_main-medium mt-10">Соусы</p><Sauces saucesData={saucesData} handleClick={setCart} cart={cart}/></>,
        fillers: <><p className="text text_type_main-medium mt-10">Начинки</p><Fillers fillersData={fillersData} handleClick={setCart} cart={cart}/></>
    };

    const ingridientsOrder = {
        buns: ['buns', 'sauces', 'fillers'],
        sauces: ['sauces', 'fillers', 'buns'],
        fillers: ['fillers', 'buns', 'sauces']
    }

    return (
        <section className={styles.container}>
            <p className="text text_type_main-large mt-10">Соберите бургер</p>
            <div style={{ display: 'flex' }} className="mt-5">
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="fillers" active={current === 'fillers'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <div className={styles.ingredient_container}>
                {ingridientsOrder[current].map(e => allIngridients[e])}
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = { ...burgerIngredientsPropType };

export default BurgerIngredients