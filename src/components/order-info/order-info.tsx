import styles from "./order-info.module.css";
import React, {useEffect, useMemo, useState} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../hooks/typedHooks";
import {useNavigate, useParams} from "react-router-dom";
import {wsConnectionAllInit, wsConnectionClose, wsConnectionUserInit} from "../../services/orderFeed";
import {Loading} from "../loading/loading";
import {formatOrderTime} from "../../utils/utils";
import {Order as TOrder} from "../../utils/types";
import {setIsOpen, setModalHeader, setModalType} from "../../services/detailsSlice";
import {handleClosing} from "../../services/modalSlice";

function Ingredient({id, order}: {id: string, order:TOrder}) {
    const burgersData = useAppSelector(state => state.ingredients.burgersData);
    const [ ingredient ] = useMemo(() => burgersData.filter(e => e._id.includes(id)), [id, burgersData])

    const itemSum = order.ingredients.reduce((prevValue: Record<string, number>, itemID) => {
        if (prevValue[itemID]) {
            prevValue[itemID]++;
        } else {
            prevValue[itemID] = 1;
        }
        return prevValue;
    }, {});

    return (
        <div className={`${styles.ingredient} pr-6`}>
            <div className={styles.ingredient_container}>
                <img alt='Ингридиент' src={ingredient.image} className={styles.ingredient_image}></img>
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
            <div className={styles.price_container}>
                <p className="text text_type_digits-default">{`${itemSum[id]} x ${ingredient.price}`}</p>
                <CurrencyIcon type="primary"/>
            </div>
        </div>
    );
}

function Order({standalone}: Record<string, boolean>) {
    const burgersData = useAppSelector(state => state.ingredients.burgersData);
    const ordersList = useAppSelector(state => state.orderFeed.orders);
    const { id: orderID }  = useParams();
    const [orderReady, setOrderReady] = useState(false)
    const [orderStatus, setOrderStatus] = useState('')

    const order = useMemo(() => {
        if (ordersList && orderID) {
            const [ orderData ] = ordersList.filter((item) => item._id.includes(orderID))
            return orderData
        }
    }, [orderID, ordersList])

    useEffect(() => {
        if (order) {
            if (order.status === 'done') {
                setOrderReady(true);
            } else {
                setOrderReady(false);
            }
        }
    }, [order]);

    useEffect(() => {
        if (order) {
            if (order.status === 'done') {
                setOrderStatus('Готов');
            }
            if (order.status === 'created') {
                setOrderStatus('Создан');
            }
            if (order.status === 'pending') {
                setOrderStatus('Готовится');
            }
        }
    }, [order]);

    const ingredientsWithoutDouble = useMemo(() => {
        if (order) {
            return [...new Set(order.ingredients)]
        }
    }, [order])

    if (typeof order === "undefined" || typeof ingredientsWithoutDouble === "undefined" ) {
        return <p>Заказ не найден :(</p>
    }

    const orderTime = formatOrderTime(order.createdAt)

    let tempTotal: number = 0;
    order.ingredients.map((id) => {
        const [ ingredient ] = burgersData.filter(e => e._id.includes(id))
        tempTotal += ingredient.price
    })

    const standaloneStyles = () => {
        if (standalone) {
            return {
                marginTop: 'mt-10',
                marginBottom: ''
            }
        }
        return {
            marginTop: '',
            marginBottom: 'mb-5'
        }
    }

    return (
        <section className={styles.section_container}>
            <div className={styles.content_container}>
                <p className={`text text_type_digits-default ${standaloneStyles().marginTop} ${styles.order_num}`}>#{order.number}</p>
                <p className="text text_type_main-medium mt-10">{order.name}</p>
                <p className={`text text_type_main-default mt-3 ${orderReady ? styles.status_ready : {}}`}>{orderStatus}</p>
                <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
                <div className={`${styles.ingredients}`}>
                    {ingredientsWithoutDouble.map((e) => <Ingredient key={e} id={e} order={order} />)}
                </div>
                <div className={`mt-10 ${standaloneStyles().marginBottom} ${styles.time_and_price}`}>
                    <p className={`text text_type_main-default text_color_inactive ${styles.time_text}`}>{orderTime}</p>
                    <div className={styles.price_container}>
                        <p className="text text_type_digits-default">{tempTotal}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function OrderInfo({standalone, userPage}: Record<string, boolean>) {
    const dispatch = useAppDispatch();
    const { orders:ordersList} = useAppSelector(state => state.orderFeed);
    const isClosing = useAppSelector(state => state.modal.isClosing);
    const navigate = useNavigate();


    useEffect(() => {
        if (isClosing) {
            navigate(-1)
            dispatch(handleClosing(false))
        }
    }, [isClosing]);

    useEffect(() => {
        if (standalone) {
            userPage ? dispatch(wsConnectionUserInit()) : dispatch(wsConnectionAllInit());

            return function disconnect() {
                dispatch(wsConnectionClose());
            };
        } else {
            dispatch(setModalType(''));
            dispatch(setModalHeader(''));
            dispatch(setIsOpen(true));
        }
    }, [standalone]);

    if (!ordersList) {
        return <Loading />
    }

    return (
        <Order standalone={standalone} />
    );
}