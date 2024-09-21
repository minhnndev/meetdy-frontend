import { TFriend } from "@/models/friend.model";
import { UserAvatar } from "@/modules/Chat/components";
import { IconMore } from "@douyinfe/semi-icons";
import { Button, Nav } from "@douyinfe/semi-ui";
import { useState } from "react";

const FriendItem = ({ friend }: { friend: TFriend }) => {
  const [showOptions, setShowOptions] = useState(true);
  const { avatar, avatarColor, name, isOnline } = friend;
  return (
    <Nav.Item
      text={
        <div
          className="flex-center"
          style={{
            width: 200,
            justifyContent: "space-between",
          }}
        >
          <p>{name}</p>
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
