import ReactDOM from "react-dom";
import React, {ReactNode} from 'react';
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Overlay from "../modal-overlay/modal-overlay";
import {setIsOpen} from "../../services/detailsSlice";
import {handleClosing} from "../../services/modalSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/typedHooks";

const modalRoot = document.getElementById("modal-root");

type TModal = {
    children: ReactNode
}

export default function Modal({ children }: TModal) {
    const dispatch = useAppDispatch();
    const modalHeader = useAppSelector(state => state.details.modalHeader);
    const isLoading = useAppSelector(state => state.order.orderReady);

    const handleClose = () => {
        if (isLoading) {
            dispatch(setIsOpen(false));
            dispatch(handleClosing(true))
        }
    };

    React.useEffect(() => {
        function onEsc(evt: KeyboardEvent) {
            if (evt.code === "Escape") {
                handleClose();
            }
        }
        document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [isLoading]);

    if (modalRoot) {
        return ReactDOM.createPortal(
            (
                <>
                    <div className={styles.modal}>
                        <div className={styles.header}>
                            <p className="text text_type_main-large">{modalHeader}</p>
                            <div className={styles.button}>
                                <CloseIcon
                                    type="primary"
                                    onClick={handleClose}

                                />
                            </div>
                        </div>
                        {children}
                    </div>
                    <Overlay handleClose={handleClose}/>
                </>
            ),
            modalRoot
        );
    } else return <></>
}