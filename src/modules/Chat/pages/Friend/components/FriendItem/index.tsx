import { TFriend } from "@/models/friend.model";
import { UserAvatar } from "@/modules/Chat/components";
import dateUtils from "@/utils/dateUtils";
import { IconMore } from "@douyinfe/semi-icons";
import { Button, Nav, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";

const FriendItem = ({ friend }: { friend: TFriend }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { avatar, avatarColor, name, isOnline } = friend;
  return (
    <Nav.Item
      itemKey={friend._id}
      text={
        <div
          style={{
            width: 200,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "2px 0",
            }}
          >
            <Typography.Text
              style={{ width: 165 }}
              ellipsis={{ showTooltip: true }}
            >
              {name}
            </Typography.Text>
            {friend.lastLogin && (
              <Typography.Text type="tertiary" style={{ marginTop: 2 }}>
                Truy cập {dateUtils.toTime(friend.lastLogin)} trước
              </Typography.Text>
            )}
          </div>
          {showOptions && (
            <Button
              type="tertiary"
              theme="borderless"
              icon={<IconMore />}
              style={{ marginRight: 1 }}
            />
          )}
        </div>
      }
      icon={
        <UserAvatar
          avatar={avatar}
          isActive={isOnline}
          name={name}
          color={avatarColor}
        />
      }
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    />
  );
};

export default FriendItem;
