import styles from "./order-row.module.css";
import React, {useEffect, useState} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../hooks/typedHooks";
import {Order as TOrder} from "../../utils/types";
import {formatOrderTime} from "../../utils/utils";
import {useLocation, useNavigate} from "react-router-dom";

function Ingredient({index, id, sum}: {index: number, id: string, sum: number}) {
    const burgersData = useAppSelector(state => state.ingredients.burgersData);
    const [ ingredient ] = burgersData.filter(e => e._id.includes(id))
    const img = ingredient.image;

    const ingredientsStyles = [
        {zIndex: 10},
        {zIndex: 9, right: 16},
        {zIndex: 8, right: 32},
        {zIndex: 7, right: 48},
        {zIndex: 6, right: 64},
        {zIndex: 5, right: 80}
    ]

    if (index === 5 && sum > 6) {
        return (
            <div className={styles.ingredient_container_dim} style={{...ingredientsStyles[index], backgroundImage: `url(${img})`}}>
                <div className={styles.dim_overlay}>
                    <p className='text text_type_main-default'>+{sum - 5}</p>
                </div>
            </div>
        );
    }

    if (index > 5) {return <></>}

    return (
        <div className={styles.ingredient_container} style={ingredientsStyles[index]}>
            <img alt='Ингредиент' src={img} className={styles.ingredient_image}></img>
        </div>
    );
}

function Order({item}: {item: TOrder}) {
    const burgersData = useAppSelector(state => state.ingredients.burgersData);
    const orderTime = formatOrderTime(item.createdAt)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate();
    const location = useLocation();
    const userPage = useAppSelector(state => state.orderFeed.userPage);
    const [orderReady, setOrderReady] = useState(false)
    const [orderStatus, setOrderStatus] = useState('')

    let openModal:Function;
    if (userPage) {
        openModal = (e: React.MouseEvent<HTMLElement>, selectedOrderId: string) => {
            navigate(`/profile/orders/${selectedOrderId}`, { state: {background: location} });
        }
    } else {
        openModal = (e: React.MouseEvent<HTMLElement>, selectedOrderId: string) => {
            navigate(`/feed/${selectedOrderId}`, { state: {background: location} });
        }
    }


    useEffect(() => {
        let tempTotal: number = 0;

        item.ingredients.map((id) => {
            const [ ingredient ] = burgersData.filter(e => e._id.includes(id))
            tempTotal += ingredient.price
        })

        setPrice(tempTotal);
    }, [burgersData, item]);

    useEffect(() => {
        if (item.status === 'done') {
            setOrderReady(true);
        } else {
            setOrderReady(false);
        }
    }, [item]);

    useEffect(() => {
        if (item.status === 'done') {
            setOrderStatus('Готов');
        }
        if (item.status === 'created') {
            setOrderStatus('Создан');
        }
        if (item.status === 'pending') {
            setOrderStatus('Готовится');
        }
    }, [item]);


    return (
        <div className={`p-6 ${styles.order_container}`} onClick={(e) => openModal(e, item._id)}>
            <div className={styles.header_container}>
                <p className="text text_type_digits-default">#{item.number}</p>
                <p className={`text text_type_main-default text_color_inactive ${styles.time_text}`}>{orderTime}</p>            </div>
            <p className="text text_type_main-medium mt-6">{item.name}</p>
            {userPage ? <p className="text text_type_main-default mt-2" style={orderReady ? {color: '#0CC'} : {}}>{orderStatus}</p> : <></>}
            <div className={`mt-6 ${styles.content_container}`}>
                <div className={styles.ingredients_container}>
                    {item.ingredients.map((id, index) => <Ingredient id={id} key={index} index={index} sum={item.ingredients.length}/>)}
                </div>
                <div className={styles.price_container}>
                    <p className="text text_type_digits-default">{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );
}

export function OrderRow() {
    const ordersList = useAppSelector(state => state.orderFeed.orders);
    const userPage = useAppSelector(state => state.orderFeed.userPage);

    if (ordersList && userPage) {
        const ordersListReverse = [...ordersList].reverse();

        return (
            <>
                {ordersListReverse.map(item => <Order item={item} key={item._id} />)}
            </>
        );
    } else if (ordersList) {
        return (
            <>
                {ordersList.map(item => <Order item={item} key={item._id} />)}
            </>
        );
    }

    return <></>
}