import styles from "./modal-overlay.module.css";
import {MouseEventHandler} from "react";

type TOverlay = {
    handleClose: MouseEventHandler<HTMLDivElement>
}

export default function Overlay({ handleClose }: TOverlay) {

    return (
        <div className={styles.overlay} onClick={handleClose}></div>
    );
}