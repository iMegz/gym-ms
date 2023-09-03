import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import { ProfileInfo } from "./Profile";
import style from "./Profile.module.css";
import InputField from "../../../components/InputField/InputFIeld";

interface ModalProps {
    profile: ProfileInfo;
    hideModal: () => void;
}

type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

// Freeze account modal
export const FreezeModal: React.FC<ModalProps> = ({ profile, hideModal }) => {
    const [freeze, setFreeze] = useState("");

    function handleFreezeDurationChange({ target }: SelectChangeEvent) {
        setFreeze(target.value);
    }

    // Actions
    function handleFreeze() {
        // Send to backend
        hideModal();
    }

    return (
        <Modal>
            <div className={style["modal-content"]}>
                <h2>Freeze</h2>
                <select
                    disabled={profile.freeze === 0}
                    onChange={handleFreezeDurationChange}
                    defaultValue=""
                >
                    <option value="" disabled hidden>
                        Duration
                    </option>
                    {Array.from({ length: profile.freeze }, (_, i) => {
                        return (
                            <option value={i + 1} key={i + 1}>
                                {i + 1} Day{i !== 0 ? "s" : ""}
                            </option>
                        );
                    })}
                    <option value="manual">I will manually unfreeze</option>
                </select>
                <Button
                    label="Freeze"
                    onClick={handleFreeze}
                    disabled={profile.freeze === 0 || !freeze}
                />

                <Button label="Cancel" type="danger" onClick={hideModal} />
            </div>
        </Modal>
    );
};

// Edit info modal
export const EditModal: React.FC<ModalProps> = ({ profile, hideModal }) => {
    const [name, setName] = useState(profile.fullName);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);

    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (isPhoneNumber(phone) && isEmail(email) && name) setIsValid(true);
        else setIsValid(false);
    }, [name, email, phone]);

    // Validators
    function isEmail(value: string) {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value);
    }

    function isPhoneNumber(value: string) {
        const phoneRegex = /^01\d{9}$/; // Egyptian phone number
        return phoneRegex.test(value);
    }

    // Actions
    function handleEdit() {
        // send to backend
        hideModal();
    }

    return (
        <Modal>
            <div className={style["modal-content"]}>
                <h2>Edit info</h2>

                <InputField
                    label="Name"
                    value={name}
                    required
                    onChange={({ target }) => setName(target.value)}
                />

                <InputField
                    type="email"
                    label="Email"
                    value={email}
                    required
                    onChange={({ target }) => setEmail(target.value)}
                />

                <InputField
                    label="Phone"
                    value={phone}
                    required
                    onChange={({ target }) => setPhone(target.value)}
                />

                <Button label="Edit" onClick={handleEdit} disabled={!isValid} />

                <Button type="danger" label="Cancel" onClick={hideModal} />
            </div>
        </Modal>
    );
};

// Change password modal
export const PasswordModal: React.FC<ModalProps> = ({ hideModal }) => {
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (isValidPassword(newPassword) && newPassword === confirmPassword)
            setIsValid(true);
        else setIsValid(false);
    }, [oldPassword, newPassword, confirmPassword]);

    // Validators
    function isValidPassword(password: string) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    }

    // Actions
    function handleChangePassword() {
        // send to backend
        hideModal();
    }

    return (
        <Modal>
            <div className={style["modal-content"]}>
                <h2>Edit info</h2>

                <InputField
                    label="Old password"
                    type={showPassword ? "text" : "password"}
                    value={oldPassword}
                    required
                    onChange={({ target }) => setoldPassword(target.value)}
                />

                <InputField
                    label="New password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    required
                    onChange={({ target }) => setnewPassword(target.value)}
                />

                <InputField
                    label="Confirm password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    required
                    onChange={({ target }) => setConfirmPassword(target.value)}
                />

                <div>
                    <input
                        type="checkbox"
                        onChange={({ target }) =>
                            setShowPassword(target.checked)
                        }
                    />
                    <span> Show password</span>
                </div>

                <Button
                    label="Change"
                    onClick={handleChangePassword}
                    disabled={!isValid}
                />

                <Button type="danger" label="Cancel" onClick={hideModal} />
            </div>
        </Modal>
    );
};
