export type LogType =
    | "adminAdd"
    | "adminRemove"
    | "sessionNew"
    | "memberAdd"
    | "memberRemove"
    | "memberFreeze"
    | "memberChangeSub"
    | "subscriptionAdd"
    | "subscriptionRemove"
    | "subscriptionChange"
    | "subscriptionDeactivate"
    | "userLogin"
    | "logExport"
    | "logDelete";

interface LogTypes {
    label: string;
    types: {
        label: string;
        value: LogType;
    }[];
}

const logTypes: LogTypes[] = [
    {
        label: "Admins",
        types: [
            {
                label: "Admin added",
                value: "adminAdd",
            },
            {
                label: "Admin removed",
                value: "adminRemove",
            },
        ],
    },
    {
        label: "Members",
        types: [
            {
                label: "New session",
                value: "sessionNew",
            },
            {
                label: "Member added",
                value: "memberAdd",
            },
            {
                label: "Member removed",
                value: "memberRemove",
            },
            {
                label: "Member freezed",
                value: "memberFreeze",
            },
            {
                label: "Change subscription",
                value: "memberChangeSub",
            },
        ],
    },

    {
        label: "Subscriptions",
        types: [
            {
                label: "Subscription added",
                value: "subscriptionAdd",
            },
            {
                label: "Subscription removed",
                value: "subscriptionRemove",
            },
            {
                label: "Subscription modified",
                value: "subscriptionChange",
            },
            {
                label: "Subscription deactivated",
                value: "subscriptionDeactivate",
            },
        ],
    },
    {
        label: "Other",
        types: [
            {
                label: "User login",
                value: "userLogin",
            },
            {
                label: "Log export",
                value: "logExport",
            },
            {
                label: "Log deleted",
                value: "logDelete",
            },
        ],
    },
];

export default logTypes;
