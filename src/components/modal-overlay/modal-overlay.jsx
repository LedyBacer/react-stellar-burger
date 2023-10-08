import styles from "./modal-overlay.module.css";

export default function Overlay({ handleModalOpen }) {
    const handleClick = () => {
        handleModalOpen(false);
    };

    return <div className={styles.overlay} onClick={handleClick}></div>;
}