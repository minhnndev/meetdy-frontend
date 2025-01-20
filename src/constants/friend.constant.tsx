import { t } from "i18next";
import { Contact, UserPlus, Users } from "lucide-react";

export const FRIEND_SUB_TABS = [
    {
        key: "subtab-friends",
        text: t("common.friends"),
        icon: (size?: string | number) => <UserPlus className="text-blue-500" size={size || 20} />,
        numId: 0,
    },
    {
        key: "subtab-group",
        text: t("common.groups"),
        icon: (size?: string | number) => <Users className="text-purple-500" size={size || 20} />,
        numId: 1,
    },
    {
        key: "subtab-contact",
        text: t("common.contacts"),
        icon: (size?: string | number) => <Contact className="text-red-500" size={size || 20} />,
        numId: 2,
    },
];

export const FRIEND_FILTER_TITLE = {
    L: {
        "1": "Tất cả",
        "2": "Nhóm tôi quản lý",
    },
    R: {
        "1": "Theo tên nhóm (A-Z)",
        "0": "Theo tên nhóm (Z-A)",
    },
};

export const INIT_SUGGEST_FRIEND = {
    _id: "",
    name: "",
    username: "",
    dateOfBirth: {
        day: 0,
        month: 0,
        year: 0,
    },
    gender: true,
    avatar: "",
    avatarColor: "",
    coverImage: "",
    status: "",
    numberCommonGroup: 0,
    numberCommonFriend: 0,
};
