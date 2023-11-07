import styles from "./orders.module.css";
import React, {useEffect} from "react";
import {ProfileNavbar} from "../../components/profile-nav/profile-nav";
import {FeedOrders} from "../../components/feed-orders/feed-orders";
import {wsConnectionClose, wsConnectionUserInit} from "../../services/orderFeed";
import {useAppDispatch, useAppSelector} from "../../hooks/typedHooks";
import {Loading} from "../../components/loading/loading";

export function Orders() {
    const dispatch = useAppDispatch();
    const ordersList = useAppSelector(state => state.orderFeed.orders);

    useEffect(() => {
        dispatch(wsConnectionUserInit());

        return function disconnect() {
            dispatch(wsConnectionClose());
        };
    }, []);

    if (!ordersList) {
        return <Loading />
    }

    return (
        <div className={styles.center}>
            <div className={styles.main}>
                <ProfileNavbar />
                {/*align-self: center;*/}
                {/*max-width: 320px;*/}
                {/*no-margin*/}
                <div className='ml-15'>
                    <FeedOrders />
                    {/*width: 765px;*/}
                </div>
            </div>
        </div>
    );
}