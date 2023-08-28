import style from "./Button.module.css";

interface ButtonProps {
    label?: string;
    type?: "default" | "danger" | "warning" | "success";
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
    label = "Submit",
    type = "default",
    disabled = false,
    onClick,
}) => {
    return (
        <button
            className={`${style.btn} ${style[type]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
