import ServiceUser from "@/api/userApi";
import { INIT_SUGGEST_FRIEND } from "@/constants/friend.constant";
import { TContact } from "@/models/friend.model";
import { UserAvatar, UserCard } from "@/modules/Chat/components/common";
import { Button, Card, Tag, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";

const ContactCard = ({ contact }: { contact: TContact }) => {
  const [showUser, setShowUser] = useState(false);
  const [findUser, setFindUser] = useState(INIT_SUGGEST_FRIEND);
  const { name, username, avatar, status } = contact;

  const handleViewDetail = async () => {
    const user = await ServiceUser.getUser(username);
    setFindUser(user);
    setShowUser(true);
  };

  return (
    <>
      <Card
        shadows="hover"
        bodyStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        style={{ margin: "0.5rem 0" }}
      >
        <div style={{ display: "flex" }}>
          <UserAvatar avatar={avatar} name={name} size="medium" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginLeft: 8,
            }}
          >
            <Typography.Title heading={6}>{name}</Typography.Title>
            {status === "FRIEND" ? (
              <Tag color="green">Bạn bè</Tag>
            ) : status === "FOLLOWING" ? (
              <Tag color="light-blue">Đã gửi lời mời kết bạn</Tag>
            ) : (
              <Tag color="red">Chưa kết bạn</Tag>
            )}
          </div>
        </div>
        <Button onClick={handleViewDetail}>Xem chi tiết</Button>
      </Card>
      <UserCard
        visible={showUser}
        onCancel={() => setShowUser(false)}
        user={findUser}
      />
    </>
  );
};

export default ContactCard;
