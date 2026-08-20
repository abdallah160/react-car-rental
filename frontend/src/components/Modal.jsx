import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children, modalRef, label }) {
    if (!open) return null;

    return createPortal(
        <dialog ref={modalRef} open id="rental-modal">
            <div id="upper-section">
                <h3>{label}</h3>
                <button onClick={onClose}>X</button>
            </div>
            {children}
        </dialog>,
        document.getElementById("modal")
    );
}