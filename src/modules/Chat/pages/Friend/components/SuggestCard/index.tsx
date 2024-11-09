import { TSuggestFriend } from "@/models/friend.model";
import { UserAvatar, UserCard } from "@/modules/Chat/components/common";
import { Card, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";

const SuggestCard = ({ suggest }: { suggest: TSuggestFriend }) => {
  const { Text } = Typography;
  const [showUser, setShowUser] = useState(false);
  const { avatar, avatarColor, name, numberCommonFriend, numberCommonGroup } =
    suggest;
  return (
    <>
      <Card shadows="hover" style={{ width: 248 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.75rem 0",
            textAlign: "center",
          }}
          onClick={() => setShowUser(true)}
        >
          <UserAvatar
            avatar={avatar}
            color={avatarColor}
            name={name}
            size="large"
          />
          <Typography.Title
            heading={6}
            style={{ marginTop: "1rem", width: 200 }}
            ellipsis={{ showTooltip: true }}
          >
            {name}
          </Typography.Title>
          <Text type="tertiary" style={{ marginTop: 4 }}>
            {numberCommonGroup} nhóm chung
          </Text>
          <Text type="tertiary" style={{ marginTop: 4 }}>
            {numberCommonFriend} bạn chung
          </Text>
        </div>
      </Card>
      <UserCard
        visible={showUser}
        onCancel={() => setShowUser(false)}
        user={suggest}
      />
    </>
  );
};

export default SuggestCard;
