import {
  IconList,
  IconSize,
  IconUserAdd,
  IconUserGroup,
} from "@douyinfe/semi-icons";

export const friendSubtabs = [
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
