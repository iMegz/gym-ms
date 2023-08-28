import style from "./Login.module.css";
import logo from "../assets/logo.svg";
import InputField from "../components/InputField/InputFIeld";
import { useState } from "react";
import Button from "../components/Button/Button";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(`Email = ${email} \nPassword = ${password}`);
    };

    return (
        <main className={style.main}>
            <img src={logo} alt="Logo" />
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    required
                />

                <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    required
                />

                <Button label="Login" />
            </form>
        </main>
    );
};

export default LoginPage;
