import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {setIsOpen, setModalHeader, setModalType} from "../../services/detailsSlice";
import {
    moveCardSlice,
    removeIngredient,
    addIngredient,
    replaceBun,
    IIngredientsId
} from "../../services/constructorSlice";
import {placeOrder} from "../../services/orderSlice";
import {useDrag, useDrop} from "react-dnd";
import {useNavigate} from "react-router-dom";
import {isTokenExpired} from "../../utils/api";
import {refreshTokenRequest} from "../../services/authSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/typedHooks";
import {IBurgData, TItem} from "../../utils/types";

type TIngredientItem = {
    ingredient: IBurgData,
    handleCart: (e: number) => void,
    index: number,
    id: string,
    moveCard: (dragIndex: any, hoverIndex: any) => void
}

function IngredientItem({ingredient, handleCart, index, id, moveCard}: TIngredientItem) {
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop({
        accept: "ingredient",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: TItem, monitor) {
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
            if (clientOffset) {
                const hoverClientY = clientOffset.y - hoverBoundingRect.top

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return
                }

                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return
                }
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

type TIncludingIngredients = {
    burgersData: Array<IBurgData>,
    cart: Array<IIngredientsId>,
    handleCart: (e: number) => void
}

function IncludingIngredients({ burgersData, cart, handleCart }: TIncludingIngredients) {
    const dispatch = useAppDispatch();

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

type TBunIngredient = {
    ingredient: IBurgData,
    position: ' (верх)' | ' (низ)',
    type: 'top' | 'bottom'
}

function BunIngredient({ ingredient, position, type }: TBunIngredient) {

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
    const burgersData = useAppSelector(state => state.ingredients.burgersData);
    const cart = useAppSelector(state => state.constructorCart.ingredientsId);
    const bunInCartId = useAppSelector(state => state.constructorCart.bunId);
    const [ bunIngredient ] = useMemo(() => burgersData.filter(e => e._id.includes(bunInCartId)), [bunInCartId])
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();
    const [isDisabled, setIsDisabled] = useState(true)
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const navigate = useNavigate()
    const accessToken = useAppSelector(state => state.auth.accessToken)

    useEffect(() => {
        setIsDisabled(bunInCartId === '')
    }, [bunInCartId]);

    const totalPrice = useMemo(() => {
        let tempTotal = 0;

        cart.map((ingredientsId) => {
            const [ ingredient ] = burgersData.filter(e => e._id.includes(ingredientsId.ingredientId))
            tempTotal += ingredient.price
        })

        if (!isDisabled) {
            const [ bunIngredient ] = burgersData.filter(e => e._id.includes(bunInCartId))
            tempTotal += bunIngredient.price * 2;
        }

        return tempTotal
    }, [cart, bunInCartId, burgersData, isDisabled])

    const handleOrder = () => {
        if (isLogin) {
            if (isTokenExpired(accessToken)) {
                dispatch(refreshTokenRequest());
            }
            dispatch(placeOrder([cart, bunInCartId, accessToken]));
            dispatch(setModalType('order'));
            dispatch(setModalHeader(''));
            dispatch(setIsOpen(true));
        } else {
            navigate('/login');
        }
    }

    const handleCart = (e: number) => dispatch(removeIngredient(e))
    const handleDropNewItem = (item: TItem) => dispatch(addIngredient(item.id));
    const handleDropNewBun = (item: TItem) => dispatch(replaceBun(item.id));

    const [{ isActiveIngredients }, dropNewItem] = useDrop({
        accept: ["sauce", "fillers"],
        drop: (item: TItem) => handleDropNewItem(item),
        collect: (monitor) => ({
            isActiveIngredients: monitor.canDrop() && monitor.isOver(),
        }),
    })

    const [{ isActiveBun }, dropNewBun] = useDrop({
        accept: 'bun',
        drop: (item: TItem) => handleDropNewBun(item),
        collect: (monitor) => ({
            isActiveBun: monitor.canDrop() && monitor.isOver(),
        }),
    })

    dropNewBun(dropNewItem(ref))

    return (
        <section className={`${styles.container} ml-10`}>
            <div className={`${styles.constructor} mt-25 ml-4 mr-4`} ref={ref}>
                {!(cart.length === 0 && isDisabled) ?
                        <>
                            {!isDisabled && <BunIngredient ingredient={bunIngredient} position=' (верх)' type='top'/>}
                            {!(cart.length === 0) && <IncludingIngredients burgersData={burgersData} cart={cart} handleCart={handleCart}/>}
                            {!isDisabled && <BunIngredient ingredient={bunIngredient} position=' (низ)' type='bottom'/>}
                        </>
                    : (isActiveBun || isActiveIngredients) ?
                        <div className={`${styles.drop_box} ${styles.drop_box_hover}`}><p className="text text_type_main-medium">Да, сюда :)</p></div>
                    : <div className={styles.drop_box}><p className="text text_type_main-medium">Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</p></div>
                }
            </div>
            <div className={`${styles.orderContainer} mt-10 mr-4`}>
                <div className={`${styles.price} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={handleOrder} disabled={isDisabled}>Оформить заказ</Button>
            </div>
        </section>
    );
}

export default BurgerConstructor