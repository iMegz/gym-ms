import { useEffect } from "react";
import style from "./Subscriptions.module.css";
import { DashboardProps } from "../Dashboard";
import Button from "../../../components/Button/Button";

interface DelSubProps {
    id: number;
}

const Subscriptions: React.FC<DashboardProps> = ({ loaded }) => {
    useEffect(() => {
        loaded();
    }, []);

    function handleNewSub() {}
    function handleDelSub(id: number) {}
    function handleEditSub(id: number) {}

    const isAdmin = true;

    const subscriptions = [
        {
            id: 1,
            title: "1 Month plan",
            duration: 30,
            freeze: 3,
            invitations: 1,
            price: 400,
        },
        {
            id: 2,
            title: "2 Month plan",
            duration: 60,
            freeze: 5,
            invitations: 3,
            price: 600,
        },
        {
            id: 3,
            title: "3 Month plan",
            duration: 90,
            freeze: 10,
            invitations: 5,
            price: 850,
        },
    ];

    const NewSub: React.FC = () => {
        if (isAdmin)
            return (
                <div className={style["new-sub"]}>
                    <Button label="New Sub" onClick={handleNewSub} />
                </div>
            );
        else return "";
    };

    const DelSub: React.FC<DelSubProps> = ({ id }) => {
        if (isAdmin)
            return (
                <div className={style["sub-control"]}>
                    <Button
                        label="Edit"
                        onClick={() => handleEditSub(id)}
                        btnStyle="warning"
                    />
                    <Button
                        label="Delete"
                        onClick={() => handleDelSub(id)}
                        btnStyle="danger"
                    />
                </div>
            );
        else return "";
    };

    return (
        <>
            <h1>Subscriptions</h1>
            <NewSub />
            <section className={style.subscriptions}>
                {subscriptions.map((sub) => {
                    return (
                        <div
                            key={sub.id}
                            className={`floating-section ${style.subscription}`}
                        >
                            <h2>{sub.title}</h2>
                            <div className={style["subscription-property"]}>
                                <span className={style.title}>Duration </span>
                                <span className={style.value}>
                                    {sub.duration} days
                                </span>
                            </div>
                            <div className={style["subscription-property"]}>
                                <span className={style.title}>Freeze </span>
                                <span className={style.value}>
                                    {sub.freeze} days
                                </span>
                            </div>
                            <div className={style["subscription-property"]}>
                                <span className={style.title}>
                                    Invitations{" "}
                                </span>
                                <span className={style.value}>
                                    {sub.invitations}
                                </span>
                            </div>
                            <div className={style["subscription-property"]}>
                                <span className={style.title}>Price </span>
                                <span className={style.value}>
                                    <span className={style.price}>EGP </span>
                                    {sub.price}
                                </span>
                            </div>
                            <DelSub id={sub.id} />
                        </div>
                    );
                })}
            </section>
        </>
    );
};

export default Subscriptions;
