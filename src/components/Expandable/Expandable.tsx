import { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import style from "./Expandable.module.css";

interface ExpandableProps {
    children: React.ReactNode;
    label: string;
}

const Expandable: React.FC<ExpandableProps> = ({ children, label }) => {
    const [show, setShow] = useState(false);
    return (
        <div className={style["expandable-container"]}>
            <div
                onClick={() => setShow((prev) => !prev)}
                className={style.label}
            >
                <span>{label}</span>
                {show ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
            <div
                className={`${style.expandable} ${
                    show ? style.expand : style.collapse
                }`}
            >
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Expandable;
