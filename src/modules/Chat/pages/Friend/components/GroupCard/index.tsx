import { TGroupConversation } from "@/models/conversation.model";
import { GroupAvatar } from "@/modules/Chat/components";
import { IconMore } from "@douyinfe/semi-icons";
import { Button, Card, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";

const GroupCard = ({ group }: { group: TGroupConversation }) => {
  const [showOptions, setShowOptions] = useState(true);
  return (
    <Card shadows="hover" style={{ width: 250 }}>
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.75rem 0",
          }}
          onClick={() => {}}
        >
          <GroupAvatar
            avatars={group.avatar}
            totalMembers={group.totalMembers}
            smallSize={40}
            largeSize={72}
          />
          <Typography.Title heading={6} style={{ marginTop: "1rem" }}>
            {group.name}
          </Typography.Title>
          <Typography.Text type="tertiary" style={{ marginTop: 4 }}>
            {group.totalMembers} thành viên
          </Typography.Text>
        </div>
        {showOptions && (
          <Button
            icon={<IconMore style={{ rotate: "90deg" }} />}
            style={{
              position: "absolute",
              marginTop: -200,
              marginLeft: 180,
              background: "white",
            }}
            type="tertiary"
          />
        )}
      </div>
    </Card>
  );
};

export default GroupCard;
