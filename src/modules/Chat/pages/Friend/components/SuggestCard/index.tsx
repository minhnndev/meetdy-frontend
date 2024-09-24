import { TSuggestFriend } from "@/models/friend.model";
import { UserAvatar, UserCard } from "@/modules/Chat/components";
import { Card, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";

const SuggestCard = ({ suggest }: { suggest: TSuggestFriend }) => {
  const [showUser, setShowUser] = useState(false);
  const { avatar, avatarColor, name, numberCommonFriend, numberCommonGroup } =
    suggest;
  return (
    <>
      <Card shadows="hover" style={{ width: 250 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.75rem 0",
          }}
          onClick={() => setShowUser(true)}
        >
          <UserAvatar
            avatar={avatar}
            color={avatarColor}
            name={name}
            size="large"
          />
          <Typography.Title heading={6} style={{ marginTop: "1rem" }}>
            {name}
          </Typography.Title>
          <Typography.Text type="tertiary" style={{ marginTop: 4 }}>
            {numberCommonGroup} nhóm chung
          </Typography.Text>
          <Typography.Text type="tertiary" style={{ marginTop: 4 }}>
            {numberCommonFriend} bạn chung
          </Typography.Text>
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
