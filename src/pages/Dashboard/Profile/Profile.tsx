import { useEffect, useState } from "react";
import { DashboardProps } from "../Dashboard";
import style from "./Profile.module.css";
import Button from "../../../components/Button/Button";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { EditModal, FreezeModal, PasswordModal } from "./Modals";

type SetShowFunction = React.Dispatch<React.SetStateAction<boolean>>;

export interface ProfileInfo {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    profilePic: null;
    sub: string;
    subExpire: Date;
    invitations: number;
    freeze: number;
    isFrozen: boolean;
    memberSince: Date;
    sessions: number;
    accountType: "Member" | "Admin" | "Superuser";
}

function daysCalc(targetDate: Date): number {
    const currentDate = new Date();
    const targetTime = targetDate.getTime();
    const currentTime = currentDate.getTime();

    const timeDifference =
        targetTime >= currentTime
            ? targetTime - currentTime
            : currentTime - targetTime;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysLeft;
}

function calcAccountAge(since: Date): string {
    const ageInDays = daysCalc(since);

    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    const days = ageInDays % 30;

    const formatUnit = (value: number, unit: string) =>
        value === 1
            ? `${value} ${unit} `
            : value > 0
            ? `${value} ${unit}s `
            : "";

    const result =
        formatUnit(years, "year") +
        formatUnit(months, "month") +
        formatUnit(days, "day");

    return result.trim();
}

const profileEmpty: ProfileInfo = {
    id: 0,
    fullName: "",
    email: "",
    phone: "",
    profilePic: null,
    sub: "",
    subExpire: new Date(),
    invitations: 0,
    freeze: 0,
    isFrozen: false,
    memberSince: new Date(),
    sessions: 0,
    accountType: "Member",
};

const profileInfo: ProfileInfo = {
    id: 1,
    fullName: "Ahmed Magdi Mostafa",
    email: "ahmed.megz@gmail.com",
    phone: "01025476553",
    profilePic: null,
    sub: "2 Month plan",
    subExpire: new Date("2023-10-30"),
    invitations: 5,
    freeze: 10,
    isFrozen: false,
    memberSince: new Date("2023-03-2"),
    sessions: 125,
    accountType: "Member",
};

const Profile: React.FC<DashboardProps> = ({ loaded }) => {
    const [showFreezeModal, setShowFreezeModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showChangePassModal, setShowChangePassModal] = useState(false);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [profile, setProfile] = useState(profileEmpty);

    const params = useParams();

    useEffect(() => {
        const id = params.id;
        if (id) {
            // get data from server
            setProfile(profileInfo); // Remove this line
            loaded();
        } else {
            // get data from token in local storage
            setProfile(profileInfo);
        }
    }, []);

    // Only load page after loading profile info
    useEffect(() => {
        if (profile.fullName) {
            loaded();
        }
    }, [profile]);

    const isOwner = !params.id;

    const handleShow = (setState: SetShowFunction) => () => setState(true);
    const handleHide = (setState: SetShowFunction) => () => setState(false);

    function handleUnfreeze() {}

    const daysLeft = daysCalc(profile.subExpire);

    const modals = [
        {
            state: showFreezeModal,
            setState: setShowFreezeModal,
            element: FreezeModal,
        },
        {
            state: showEditModal,
            setState: setShowEditModal,
            element: EditModal,
        },
        {
            state: showChangePassModal,
            setState: setShowChangePassModal,
            element: PasswordModal,
        },
        // {
        //     state: showSubscriptionModal,
        //     setState: setShowSubscriptionModal,
        //     element: PasswordModal,
        // },
    ];

    function displayModals() {
        for (const modal of modals) {
            if (modal.state) {
                return (
                    <modal.element
                        profile={profile}
                        hideModal={handleHide(modal.setState)}
                    />
                );
            }
        }
    }

    return (
        <>
            <h1>Profile</h1>
            <div className={style.profile}>
                {/* User info */}
                <section
                    className={`floating-section ${style["user-info-section"]}`}
                >
                    {profile.profilePic ? (
                        <img
                            className={style["user-profile-img"]}
                            src={profile.profilePic}
                            alt="Pofile picture"
                        />
                    ) : (
                        <FaUser className={style["user-profile-img"]} />
                    )}
                    <ul className={style["user-info"]}>
                        <li>{profile.fullName}</li>
                        <li>{profile.email}</li>
                        <li>{profile.phone}</li>
                        {isOwner ? (
                            <>
                                <li>
                                    <Button
                                        label="Edit"
                                        btnStyle="warning"
                                        onClick={handleShow(setShowEditModal)}
                                    />
                                </li>
                                <li>
                                    <Button
                                        label="Change password"
                                        btnStyle="danger"
                                        onClick={handleShow(
                                            setShowChangePassModal
                                        )}
                                    />
                                </li>
                            </>
                        ) : (
                            ""
                        )}
                    </ul>
                </section>

                <div className={style["subscription-and-statistics"]}>
                    {/* Subscription */}
                    <section
                        className={`floating-section ${style["subscription-section"]}`}
                    >
                        <h2>Subscription</h2>
                        <ul className={style["subscription"]}>
                            <li>
                                <span className={style["property-title"]}>
                                    Subscription :
                                </span>
                                <span>{profile.sub}</span>
                            </li>
                            <li>
                                <span className={style["property-title"]}>
                                    Invitations :
                                </span>
                                <span>{profile.invitations}</span>
                            </li>
                            <li>
                                <span className={style["property-title"]}>
                                    Expires in :
                                </span>
                                <span
                                    style={daysLeft < 8 ? { color: "red" } : {}}
                                >
                                    {daysLeft} days
                                </span>
                            </li>
                            <li>
                                {profile.isFrozen ? (
                                    <Button
                                        label="Unfreeze"
                                        btnStyle="danger"
                                        onClick={handleUnfreeze}
                                    />
                                ) : (
                                    <Button
                                        label="Freeze"
                                        onClick={handleShow(setShowFreezeModal)}
                                    />
                                )}

                                {isOwner ? (
                                    ""
                                ) : (
                                    <Button
                                        label="Change"
                                        btnStyle="warning"
                                        onClick={handleShow(
                                            setShowSubscriptionModal
                                        )}
                                    />
                                )}
                            </li>
                        </ul>
                    </section>

                    {/* Statistics */}
                    <section
                        className={`floating-section ${style["statistics-section"]}`}
                    >
                        <h2>Statistics</h2>
                        <ul className={style["statistics"]}>
                            <li>
                                <span className={style["property-title"]}>
                                    Member since :
                                </span>
                                <span>
                                    {profile.memberSince.toLocaleDateString()}
                                </span>
                            </li>
                            <li>
                                <span className={style["property-title"]}>
                                    Account age:
                                </span>
                                <span>
                                    {calcAccountAge(profile.memberSince)}
                                </span>
                            </li>

                            <li>
                                <span className={style["property-title"]}>
                                    Total sessions :
                                </span>
                                <span>{profile.sessions}</span>
                            </li>
                            <li>
                                <span className={style["property-title"]}>
                                    Account type :
                                </span>
                                <span>{profile.accountType}</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
            {displayModals()}
        </>
    );
};

export default Profile;
