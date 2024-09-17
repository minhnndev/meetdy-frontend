import { friendSubtabs } from "@/constants/friend.constant";
import { Typography } from "@douyinfe/semi-ui";

const FriendHeader = ({ subtab }) => {
  const { text, icon } = friendSubtabs[subtab];

  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid rgba(var(--semi-grey-1), 1)",
        padding: "1rem",
      }}
    >
      <div className="flex-center" style={{ marginRight: 12 }}>
        {icon("extra-large")}
      </div>
      <Typography.Title heading={4}>{text}</Typography.Title>
    </div>
  );
};

export default FriendHeader;
