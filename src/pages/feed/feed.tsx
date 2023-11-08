import styles from "./feed.module.css";
import React, {useEffect} from "react";
import {FeedOrders} from "../../components/feed-orders/feed-orders";
import {FeedInfo} from "../../components/feed-info/feed-info";
import {useAppDispatch, useAppSelector} from "../../hooks/typedHooks";
import {wsConnectionAllInit, wsConnectionClose} from "../../services/orderFeed";
import {Loading} from "../../components/loading/loading";

export function Feed() {
    const dispatch = useAppDispatch();
    const ordersList = useAppSelector(state => state.orderFeed.orders);

    useEffect(() => {
        dispatch(wsConnectionAllInit());

        return function disconnect() {
            dispatch(wsConnectionClose());
        };
    }, []);

    if (!ordersList) {
        return <Loading />
    }

    return (
        <main className={styles.main}>
            <FeedOrders />
            <FeedInfo />
        </main>
    );
}