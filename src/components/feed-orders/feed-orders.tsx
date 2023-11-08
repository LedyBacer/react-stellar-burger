import styles from "./feed-orders.module.css";
import React from "react";
import {OrderRow} from "../order-row/order-row";
import {useAppSelector} from "../../hooks/typedHooks";

export function FeedOrders() {
   const userPage = useAppSelector(state => state.orderFeed.userPage);

    return (
        <section style={!userPage ? {width: 600} : {}} >
            {userPage ? <></> : <p className="text text_type_main-large mt-10">Лента заказов</p>}
            <div className={`mt-5 pr-2 ${styles.orders_container}`} style={userPage ? {maxHeight: '86vh'} : {}} >
                <OrderRow />
            </div>
        </section>
    );
}