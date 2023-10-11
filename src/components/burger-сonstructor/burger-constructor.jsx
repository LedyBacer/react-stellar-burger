import React, {useEffect, useState} from "react";
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerConstructorPropType} from "../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpen, setModalHeader, setModalType} from "../../services/detailsSlice";
import {removeIngredient} from "../../services/constructorSlice";

function IncludingIngredients({ burgersData, cart, bunIds, handleCart }) {

    return (
        <div className={styles.ingredient_container}>
            {cart.map((ingredientId) => {
                if (!bunIds.includes(ingredientId)) {
                    const [ ingredient ] = burgersData.filter(e => e._id.includes(ingredientId))

                    return (
                        <div className={styles.ingridient} key={ingredientId}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                extraClass="ml-2"
                                handleClose={() => handleCart(ingredientId)}
                            />
                        </div>
                    )
                }
            })}
        </div>
    )
}

function BunIngredient({ burgersData, cart, bunIds, position, type }) {

    return (
        <>
            {cart.map((ingredientId) => {
                    if (bunIds.includes(ingredientId)) {
                        const [ ingredient ] = burgersData.filter(e => e._id.includes(ingredientId))

                        return (
                            <ConstructorElement
                                type={type}
                                isLocked={true}
                                text={ingredient.name + position}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                extraClass="ml-8"
                                key={ingredientId}
                            />
                        )
                    }
            })}
        </>
    )
}

function BurgerConstructor() {
    const burgersData = useSelector(state => state.ingredients.burgersData);
    const cart = useSelector(state => state.constructorCart.ingredientsId);
    const [total, setTotal] = React.useState(0);
    const dispatch = useDispatch();

    const bunIds = React.useMemo(() => burgersData.filter(item => item.type.includes('bun')).map(e => e._id), [burgersData]);

    const handleOrder = () => {
        dispatch(setModalType('order'));
        dispatch(setModalHeader(''));
        dispatch(setIsOpen(true));
    }

    const handleCart = (e) => {
        dispatch(removeIngredient(e));
    }

    React.useEffect(() => {
        let tempTotal = 0;

        cart.map((ingredientId) => {
            const [ ingredient ] = burgersData.filter(e => e._id.includes(ingredientId))
            tempTotal = tempTotal + ingredient.price
        })

        setTotal(tempTotal)
    }, [cart, burgersData]);

    return (
        <section className={`${styles.container} ml-10`}>
            <div className={`${styles.constructor} mt-25 ml-4 mr-4`}>
                <BunIngredient burgersData={burgersData} cart={cart} bunIds={bunIds} position=' (верх)' type='top'/>
                <IncludingIngredients burgersData={burgersData} cart={cart} bunIds={bunIds} handleCart={handleCart}/>
                <BunIngredient burgersData={burgersData} cart={cart} bunIds={bunIds} position=' (низ)' type='bottom'/>
            </div>
            <div className={`${styles.orderContainer} mt-10 mr-4`}>
                <div className={`${styles.price} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">{total}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={handleOrder}>Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = { ...burgerConstructorPropType }

export default BurgerConstructor