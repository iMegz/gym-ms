import style from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnStyle?: "default" | "danger" | "warning" | "success";
    label: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    let { btnStyle, className, ...rest } = props;

    btnStyle ||= "default";
    className = `${style.btn} ${style[btnStyle]} ${className || ""}`;

    return (
        <button {...rest} className={className}>
            {props.label}
        </button>
    );
};

export default Button;
