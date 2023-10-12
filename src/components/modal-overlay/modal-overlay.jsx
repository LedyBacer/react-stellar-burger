import styles from "./modal-overlay.module.css";
import {modalOverlayPropType} from "../../utils/prop-types";

export default function Overlay({ handleClose }) {

    return (
        <div className={styles.overlay} onClick={handleClose}></div>
    );
}

Overlay.propTypes = { ...modalOverlayPropType }