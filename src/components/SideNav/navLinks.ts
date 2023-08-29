import {
    FaHome,
    FaUsers,
    FaCheckCircle,
    FaMoneyBill,
    FaDatabase,
    FaUserCircle,
} from "react-icons/fa";
import { RiAdminFill, RiLogoutBoxFill } from "react-icons/ri";
import { IconType } from "react-icons";

export interface NavLinkInfo {
    label: string;
    path: string;
    icon: IconType;
}

export const superUserLinks = [
    {
        label: "Dashboard",
        path: "dashboard",
        icon: FaHome,
    },
    {
        label: "Admins",
        path: "admins",
        icon: RiAdminFill,
    },
    {
        label: "Members",
        path: "members",
        icon: FaUsers,
    },
    {
        label: "Subscriptions",
        path: "subscriptions",
        icon: FaMoneyBill,
    },
    {
        label: "New session",
        path: "session",
        icon: FaCheckCircle,
    },
    {
        label: "Logs",
        path: "logs",
        icon: FaDatabase,
    },
    {
        label: "Profile",
        path: "profile",
        icon: FaUserCircle,
    },
    {
        label: "Logout",
        path: "logout",
        icon: RiLogoutBoxFill,
    },
];

export const adminLinks = [
    {
        label: "Profile",
        path: "profile",
        icon: FaUserCircle,
    },
    {
        label: "Members",
        path: "members",
        icon: FaUsers,
    },
    {
        label: "Subscriptions",
        path: "subscriptions",
        icon: FaMoneyBill,
    },
    {
        label: "New session",
        path: "session",
        icon: FaCheckCircle,
    },
    {
        label: "Logout",
        path: "logout",
        icon: RiLogoutBoxFill,
    },
];

export const memberLinks = [
    {
        label: "Profile",
        path: "profile",
        icon: FaUserCircle,
    },
    {
        label: "Subscriptions",
        path: "subscriptions",
        icon: FaMoneyBill,
    },
    {
        label: "Logout",
        path: "logout",
        icon: RiLogoutBoxFill,
    },
];
