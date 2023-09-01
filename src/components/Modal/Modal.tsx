import { useEffect } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";

const Modal: React.FC<React.PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return createPortal(
        <div className={style.overlay}>
            <div className={`floating-section ${style.modal}`}>{children}</div>
        </div>,
        document.body
    );
};

export default Modal;
