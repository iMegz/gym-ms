import style from "./SideNav.module.css";
import logo from "../../assets/logo.svg";
import {
    NavLinkInfo,
    adminLinks,
    superUserLinks,
    memberLinks,
} from "./navLinks";
import { NavLink } from "react-router-dom";

type userType = "superUser" | "admin" | "member";

interface SideNavProps {
    userType?: userType;
}

const mapLinks = (userType: userType) => {
    let links: NavLinkInfo[] = memberLinks;

    switch (userType) {
        case "superUser":
            links = superUserLinks;
            break;
        case "admin":
            links = adminLinks;
            break;
    }

    return links.map((link) => (
        <li key={link.path}>
            <NavLink
                className={({ isActive }) => (isActive ? style.active : "")}
                to={link.path}
            >
                <link.icon className={style["nav-icon"]} />
                <span className={style["nav-link-label"]}>{link.label}</span>
            </NavLink>
        </li>
    ));
};

const SideNav: React.FC<SideNavProps> = ({ userType = "member" }) => {
    return (
        <nav className={style["side-nav"]}>
            <img className={style.logo} src={logo} alt="Logo" />
            <ul className={style["nav-links"]}>{mapLinks(userType)}</ul>
        </nav>
    );
};

export default SideNav;
