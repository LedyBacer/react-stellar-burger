import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerConstructorPropType} from "../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpen, setModalHeader, setModalType} from "../../services/detailsSlice";
import {moveCardSlice, removeIngredient, addIngredient, replaceBun} from "../../services/constructorSlice";
import {placeOrder} from "../../services/orderSlice";
import {useDrag, useDrop} from "react-dnd";

function IngredientItem({ingredient, handleCart, index, id, moveCard}) {
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: "ingredient",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: "ingredient",
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div style={{opacity}} className={styles.ingridient} ref={ref} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                extraClass="ml-2"
                handleClose={() => handleCart(index)}
            />
        </div>
    )
}

function IncludingIngredients({ burgersData, cart, handleCart, dispatch }) {
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(moveCardSlice([dragIndex, hoverIndex]))
    }, [])

    return (
        <div className={styles.ingredient_container}>
            {cart.map((ingredientsId, index) => {
                const [ ingredient ] = burgersData.filter(e => e._id.includes(ingredientsId.ingredientId))

                return <IngredientItem ingredient={ingredient} handleCart={handleCart} key={ingredientsId.cardId} index={index} id={ingredientsId.cardId} moveCard={moveCard}/>
            })}
        </div>
    )
}

function BunIngredient({ burgersData, position, type, bunInCartId }) {
    const [ ingredient ] = useMemo(() => burgersData.filter(e => e._id.includes(bunInCartId)), [bunInCartId])

    return (
        <ConstructorElement
            type={type}
            isLocked={true}
            text={ingredient.name + position}
            price={ingredient.price}
            thumbnail={ingredient.image}
            extraClass="ml-8"
        />
    )
}

function BurgerConstructor() {
    const burgersData = useSelector(state => state.ingredients.burgersData);
    const cart = useSelector(state => state.constructorCart.ingredientsId);
    const dispatch = useDispatch();
    const bunInCartId = useSelector(state => state.constructorCart.bunId);
    const ref = useRef(null)

    const totalPrice = useMemo(() => {
        let tempTotal = 0;

        cart.map((ingredientsId) => {
            const [ ingredient ] = burgersData.filter(e => e._id.includes(ingredientsId.ingredientId))
            tempTotal += ingredient.price
        })

        const [ bunIngredient ] = burgersData.filter(e => e._id.includes(bunInCartId))
        tempTotal += bunIngredient.price * 2;

        return tempTotal
    }, [cart, bunInCartId, burgersData])

    const handleOrder = () => {
        dispatch(placeOrder([cart, bunInCartId]));
        dispatch(setModalType('order'));
        dispatch(setModalHeader(''));
        dispatch(setIsOpen(true));
    }

    const handleCart = (e) => dispatch(removeIngredient(e))
    const handleDropNewItem = (item) => dispatch(addIngredient(item.id));
    const handleDropNewBun = (item) => dispatch(replaceBun(item.id));

    const [, dropNewItem] = useDrop({
        accept: ["sauce", "fillers"],
        drop: (item) => handleDropNewItem(item)
    })

    const [, dropNewBun] = useDrop({
        accept: 'bun',
        drop: (item) => handleDropNewBun(item)
    })

    dropNewBun(dropNewItem(ref))

    return (
        <section className={`${styles.container} ml-10`} ref={ref}>
            <div className={`${styles.constructor} mt-25 ml-4 mr-4`}>
                <BunIngredient bunInCartId={bunInCartId} burgersData={burgersData} position=' (верх)' type='top'/>
                <IncludingIngredients burgersData={burgersData} cart={cart} handleCart={handleCart} dispatch={dispatch}/>
                <BunIngredient bunInCartId={bunInCartId} burgersData={burgersData} position=' (низ)' type='bottom'/>
            </div>
            <div className={`${styles.orderContainer} mt-10 mr-4`}>
                <div className={`${styles.price} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={handleOrder}>Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = { ...burgerConstructorPropType }

export default BurgerConstructor