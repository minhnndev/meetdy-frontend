import React from "react";
import {
  IconList,
  IconSize,
  IconUserAdd,
  IconUserGroup,
} from "@douyinfe/semi-icons";

export const FRIEND_SUB_TABS = [
  {
    key: "subtab-friends",
    text: "Danh sách kết bạn",
    icon: (size?: IconSize) => (
      <IconUserAdd style={{ color: "#0068ff" }} size={size} />
    ),
    numId: 0,
  },
  {
    key: "subtab-group",
    text: "Danh sách nhóm",
    icon: (size?: IconSize) => (
      <IconUserGroup style={{ color: "#814096" }} size={size} />
    ),
    numId: 1,
  },
  {
    key: "subtab-contact",
    text: "Danh bạ",
    icon: (size?: IconSize) => (
      <IconList style={{ color: "#de433e" }} size={size} />
    ),
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
