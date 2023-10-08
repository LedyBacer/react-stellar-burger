import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function Test() {

    return ReactDOM.createPortal(
        (
            <></>
        ),
        modalRoot
    )
}