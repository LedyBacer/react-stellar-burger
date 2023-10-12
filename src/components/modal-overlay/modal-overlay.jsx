import styles from "./modal-overlay.module.css";
import {modalOverlayPropType} from "../../utils/prop-types";
import Modal from "../modal/modal";

export default function Overlay({ handleClose }) {

    return (
        <div className={styles.overlay} onClick={handleClose}></div>
    );
}

Modal.propTypes = { ...modalOverlayPropType }