import ReactDOM from "react-dom";
import React from 'react';
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Overlay from "../modal-overlay/modal-overlay";
import {modalPropType} from "../../utils/prop-types";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ handleModalOpen, children, modalHeader }) {

    React.useEffect(() => {
        function onEsc(evt) {
            if (evt.code === "Escape") {
                handleModalOpen(false);
            }
        }
        document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, []);

    const handleClose = () => {
        handleModalOpen(false);
    };

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
                <Overlay handleModalOpen={handleModalOpen} />
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = { ...modalPropType }