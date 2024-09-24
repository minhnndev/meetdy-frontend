import { TContact } from "@/models/friend.model";
import { UserAvatar, UserCard } from "@/modules/Chat/components";
import { Button, Card, Tag, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";

const ContactCard = ({ contact }: { contact: TContact }) => {
  const [showUser, setShowUser] = useState(false);
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
          <UserAvatar
            avatar={contact.avatar}
            name={contact.name}
            size="medium"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginLeft: 8,
            }}
          >
            <Typography.Title heading={6}>{contact.name}</Typography.Title>
            {contact.status === "NOT_FRIEND" ? (
              <Tag color="red">Chưa kết bạn</Tag>
            ) : contact.status === "YOU_FOLLOW" ? (
              <Tag color="light-blue">Đã gửi lời mời kết bạn</Tag>
            ) : (
              <Tag color="green">Bạn bè</Tag>
            )}
          </div>
        </div>
        <Button onClick={() => setShowUser(true)}>Xem chi tiết</Button>
      </Card>
      <UserCard
        visible={showUser}
        onCancel={() => setShowUser(false)}
        user={contact}
      />
    </>
  );
};

export default ContactCard;
