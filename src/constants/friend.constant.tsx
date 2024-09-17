import {
  IconList,
  IconSize,
  IconUserAdd,
  IconUserGroup,
} from "@douyinfe/semi-icons";

export const friendSubtabs = [
  {
    key: "subtab-suggestFriends",
    text: "Danh sách kết bạn",
    icon: (size?: IconSize) => (
      <IconUserAdd style={{ color: "#0068ff" }} size={size} />
    ),
  },
  {
    key: "subtab-groupList",
    text: "Danh sách nhóm",
    icon: (size?: IconSize) => (
      <IconUserGroup style={{ color: "#814096" }} size={size} />
    ),
  },
  {
    key: "subtab-contactList",
    text: "Danh bạ",
    icon: (size?: IconSize) => (
      <IconList style={{ color: "#de433e" }} size={size} />
    ),
  },
];
