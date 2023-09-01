import style from "./InputField.module.css";

interface InputFieldProps {
    label: string;
    value?: string | number;
    type?: "text" | "email" | "password" | "number";
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    min?: number;
    max?: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value = "",
    type = "text",
    required = false,
    disabled = false,
    readOnly = false,
    min,
    max,
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
            min={min}
            max={max}
        />
    );
};

export default InputField;
