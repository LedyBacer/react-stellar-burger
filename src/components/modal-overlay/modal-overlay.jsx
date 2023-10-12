import styles from "./modal-overlay.module.css";

export default function Overlay({ handleClose }) {

    return (
        <div className={styles.overlay} onClick={handleClose}></div>
    );
}