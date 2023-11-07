import styles from "./feed-info.module.css";
import React, {useMemo} from "react";
import {useAppSelector} from "../../hooks/typedHooks";

export function FeedInfo() {
    const { orders:ordersList, total, totalToday } = useAppSelector(state => state.orderFeed);

    const readyOrders = useMemo(() => {
        if (ordersList) {
            const temp = ordersList.map(order => {
                if (order.status === 'done') {
                    return order.number.toString()
                }
            })

            let newTemp = [];
            for (let element of temp) {
                if (element !== undefined) {
                    newTemp.push(element);
                }
            }

            if (newTemp.length > 15) {
                newTemp = newTemp.slice(0, 14);
                newTemp.push('...')
            }

            return newTemp
        }
    }, [ordersList])

    const pendingOrders = useMemo(() => {
        if (ordersList) {
            let temp = ordersList.map(order => {
                if (order.status !== 'done') {
                    return order.number.toString()
                }
            })

            let newTemp = [];
            for (let element of temp) {
                if (element !== undefined) {
                    newTemp.push(element);
                }
            }

            if (newTemp.length > 15) {
                newTemp = newTemp.slice(0, 14);
                newTemp.push('...')
            }

            return newTemp
        }
    }, [ordersList])

    return (
        <section className={`${styles.container} ml-15 mt-25`}>
            <div className={`${styles.orders_container}`}>
                <div className={`${styles.ready_container}`}>
                    <p className='text text_type_main-medium'>Готовы:</p>
                    <div className={`${styles.container_ordernum} mt-6`}>
                        {readyOrders ? readyOrders.map(num => <p className={`text text_type_digits-default ${styles.order_ready}`} key={num}>{num}</p>) : <></>}
                    </div>
                </div>
                <div className={`${styles.coocking_container} ml-9`}>
                    <p className='text text_type_main-medium'>В работе:</p>
                    <div className={`${styles.container_ordernum} mt-6`}>
                        {pendingOrders ? pendingOrders.map(num => <p className='text text_type_digits-default' key={num}>{num}</p>): <></>}
                    </div>
                </div>
            </div>
            <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
            <p className={`text text_type_digits-large ${styles.large_digits}`}>{total}</p>
            <p className='text text_type_main-medium mt-14'>Выполнено за сегодня:</p>
            <p className={`text text_type_digits-large ${styles.large_digits}`}>{totalToday}</p>
        </section>
    );
}