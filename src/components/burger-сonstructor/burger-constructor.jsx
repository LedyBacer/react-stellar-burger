import React from "react";
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerConstructorPropType} from "../../utils/prop-types";

function IncludingIngredients({ burgersData, cart, bunIds, handleCart }) {
    const handleClose = (ingredientId) => {
        const tempCart = [...cart]
        tempCart.splice(tempCart.indexOf(ingredientId), 1);
        handleCart(tempCart);
    }

    return (
        <div className={styles.ingredient_container}>
            {cart.map((ingredientId) => {
                if (!bunIds.includes(ingredientId)) {
                    const [ ingredient ] = burgersData.filter(e => e._id.includes(ingredientId))

                    return (
                        <div className={styles.ingridient}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                extraClass="ml-2"
                                handleClose={() => handleClose(ingredientId)}
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
                            <>
                                <ConstructorElement
                                    type={type}
                                    isLocked={true}
                                    text={ingredient.name + position}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    extraClass="ml-8"
                                />
                            </>
                        )
                    }
            })}
        </>
    )
}

function BurgerConstructor({ burgersData, cart, handleCart, total, handleModalOpen, setModalType, setModalHeader }) {

    const bunIds = React.useMemo(() => burgersData.filter(item => item.type.includes('bun')).map(e => e._id), [burgersData]);
    const handleOrder = () => {
        setModalType('order');
        setModalHeader('');
        handleModalOpen(true);
    }

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