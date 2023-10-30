import styles from "./order-details.module.css";
import done from "../../images/done.png"
import {useAppSelector} from "../../hooks/typedHooks";

export function OrderDetails() {
    const isModalReady = useAppSelector(state => state.order.orderReady);
    const orderNum = useAppSelector(state => state.order.id);

    return (
        <div className={styles.box}>
            {isModalReady ?
                <>
                    <p className={`${styles.glow} text text_type_digits-large`}>{orderNum}</p>
                    <p className="text text_type_main-medium pt-8 pb-15">
                        Идентификатор заказа
                    </p>
                    <img src={done} alt="Галочка" className="pb-15" />
                    <p className="text text_type_main-small pb-2">
                        Ваш заказ начали готовить
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        Дождитесь готовности на орбитальной станции
                    </p>
                </>
                : <p className="text text_type_main-medium pt-8 pb-15">Загрузка..</p>}
        </div>
    )
}