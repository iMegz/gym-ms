import { useEffect, useState } from "react";
import { DashboardProps } from "../Dashboard";
import style from "./Session.module.css";
import InputField from "../../../components/InputField/InputFIeld";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";

const Session: React.FC<DashboardProps> = ({ loaded }) => {
    const [memberId, setMemberId] = useState("");
    const [view, setView] = useState(false);
    const [invitations, setInvitations] = useState(0);
    const [validId, setValidId] = useState(false);

    useEffect(() => {
        loaded();
    }, []);

    useEffect(() => {
        if (memberId && !Number.isNaN(+memberId)) setValidId(true);
        else setValidId(false);
    }, [memberId]);

    function handleOnIdChange(value: string) {
        setMemberId(value);
        setInvitations(0);
    }

    function handleView() {
        const id = +memberId;
        // Get user from backend
        if (memberId) setView(true);
    }

    function handleRegister() {
        // send to backend
        setMemberId("");
        setView(false);
    }

    function handleCloseModal() {
        setView(false);
    }

    const user = {
        fullName: "Ahmed Magdi Mostafa",
        phone: "01000598094",
        invitations: 11,
        // Expiration date
    };

    return (
        <>
            <h1>New Session</h1>
            <section className={`floating-section ${style.session}`}>
                <h2>Session Registration</h2>
                <InputField
                    value={memberId}
                    label="Member Id"
                    onChange={({ target }) => handleOnIdChange(target.value)}
                />
                <Button label="View" onClick={handleView} disabled={!validId} />
            </section>

            {view ? (
                <Modal>
                    <div className={style["user-info"]}>
                        <h2>User info</h2>
                        <div>
                            <span className={style["user-info-property"]}>
                                Name :{" "}
                            </span>
                            <span>{user.fullName}</span>
                        </div>
                        <div>
                            <span className={style["user-info-property"]}>
                                Phone :{" "}
                            </span>
                            <span>{user.phone}</span>
                        </div>
                        <div className={style.invitations}>
                            <span
                                className={`${style["user-info-property"]} ${style["span-3"]}`}
                            >
                                Invitations :
                            </span>
                            <InputField
                                type="number"
                                value={invitations}
                                label="Invitations"
                                min={0}
                                max={user.invitations}
                                onChange={({ target }) =>
                                    setInvitations(+target.value)
                                }
                            />
                            <span>/ {user.invitations}</span>
                        </div>
                        <Button label="Register" onClick={handleRegister} />
                        <Button
                            label="Cancel"
                            type="danger"
                            onClick={handleCloseModal}
                        />
                    </div>
                </Modal>
            ) : (
                ""
            )}
        </>
    );
};

export default Session;
