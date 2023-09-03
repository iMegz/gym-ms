import style from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnStyle?: "default" | "danger" | "warning" | "success";
    label: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const btnStyle = props.btnStyle || "default";
    const className = `${style.btn} ${style[btnStyle]} ${
        props.className || ""
    }`;

    return (
        <button {...props} className={className}>
            {props.label}
        </button>
    );
};

export default Button;
