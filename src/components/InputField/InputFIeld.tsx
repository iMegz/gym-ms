import style from "./InputField.module.css";

interface InputFieldProps {
    label: string;
    value?: string;
    type?: "text" | "email" | "password";
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value = "",
    type = "text",
    required = false,
    disabled = false,
    readOnly = false,
    onChange,
}) => {
    return (
        <input
            className={style["input-field"]}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={label}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
        />
    );
};

export default InputField;
