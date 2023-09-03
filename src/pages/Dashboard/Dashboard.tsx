import style from "./Dashboard.module.css";
import SideNav from "../../components/SideNav/SideNav";
import Logs from "./Logs/Logs";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import loadingIcon from "../../assets/loading.gif";
import Subscriptions from "./Subscriptions/Subscriptions";
import Session from "./Session/Session";
import Profile from "./Profile/Profile";

export interface DashboardProps {
    loaded: () => void;
}

const Loading: React.FC = () => {
    return (
        <div className={style.loading}>
            <div>
                <img src={loadingIcon} alt="Loading" />
                <h2>Loading...</h2>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [path, setPath] = useState(location.pathname);

    useEffect(() => {
        if (path !== location.pathname) setIsLoading(true);
    }, [location]);

    function loaded() {
        setPath(location.pathname);
        setIsLoading(false);
    }

    return (
        <main className={style.main}>
            {isLoading ? <Loading /> : ""}
            <SideNav userType="superUser" />
            <section className={style.content}>
                <Routes>
                    <Route path="logs" element={<Logs loaded={loaded} />} />
                    <Route
                        path="subscriptions"
                        element={<Subscriptions loaded={loaded} />}
                    />
                    <Route
                        path="session"
                        element={<Session loaded={loaded} />}
                    />
                    <Route
                        path="profile"
                        element={<Profile loaded={loaded} />}
                    />

                    <Route
                        path="profile/:id"
                        element={<Profile loaded={loaded} />}
                    />
                </Routes>
            </section>
        </main>
    );
};

export default Dashboard;
