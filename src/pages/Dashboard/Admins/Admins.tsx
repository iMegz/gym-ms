import { useEffect, useState } from "react";
import { DashboardProps } from "../Dashboard";
import { FaUser } from "react-icons/fa";

import style from "./Admins.module.css";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";

type Action = "promote" | "demote";

const admins = [
    {
        id: 2,
        email: "ahmedmagdi@gmail.com",
        phone: "01165986148",
        fullName: "Ahmed Magdi",
        profilePic: null,
    },
    {
        id: 3,
        email: "hosam.hassan@gmail.com",
        phone: "01024980131",
        fullName: "Hosam Hassan",
        profilePic: null,
    },
    {
        id: 4,
        email: "hema5medhat@gmail.com",
        phone: "01001212989",
        fullName: "Ibrahim Medhat",
        profilePic:
            "https://play-lh.googleusercontent.com/0SAFn-mRhhDjQNYU46ZwA7tz0xmRiQG4ZuZmuwU8lYmqj6zEpnqsee_6QDuhQ4ZofwXj=w240-h480-rw",
    },
];

const Admins: React.FC<DashboardProps> = ({ loaded }) => {
    const [modal, setModal] = useState(<></>);

    useEffect(() => {
        loaded();
    }, []);

    function handlePromoteAndDemote(action: Action, id: number) {
        admins;
        setModal(<></>);
        // handle promotion / demotion
    }

    function handleShowModal(action: Action, id: number, name: string) {
        setModal(
            <Modal>
                <div className={style.modal}>
                    <h2>
                        Are you sure you want to {action} <span>{name}</span> to
                        a{action === "demote" ? " member" : " superuser"} ?
                    </h2>
                    <Button
                        label="Confirm"
                        onClick={() => handlePromoteAndDemote(action, id)}
                    />
                    <Button
                        label="Cancel"
                        btnStyle="danger"
                        onClick={() => setModal(<></>)}
                    />
                </div>
            </Modal>
        );
    }

    return (
        <>
            <h1>Admins</h1>
            {admins.map((admin) => {
                return (
                    <section
                        key={admin.id}
                        className={`floating-section ${style.admin}`}
                    >
                        {admin.profilePic ? (
                            <img
                                src={admin.profilePic}
                                alt="Profile picture"
                                className={style["profile-pic"]}
                            />
                        ) : (
                            <FaUser className={style["profile-pic"]} />
                        )}

                        <div className={style["admin-info"]}>
                            <span>{admin.fullName}</span>
                            <span>{admin.email}</span>
                            <span>{admin.phone}</span>
                        </div>
                        <div className={style.btns}>
                            <Button
                                btnStyle="danger"
                                label="Demote to member"
                                onClick={() =>
                                    handleShowModal(
                                        "demote",
                                        admin.id,
                                        admin.fullName
                                    )
                                }
                            />
                            <Button
                                btnStyle="success"
                                label="Promote to superuser"
                                onClick={() =>
                                    handleShowModal(
                                        "promote",
                                        admin.id,
                                        admin.fullName
                                    )
                                }
                            />
                        </div>
                    </section>
                );
            })}
            {modal}
        </>
    );
};

export default Admins;
