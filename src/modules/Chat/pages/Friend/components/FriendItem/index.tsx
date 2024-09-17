import { UserAvatar } from "@/modules/Chat/components";
import { IconMore } from "@douyinfe/semi-icons";
import { Button, Nav } from "@douyinfe/semi-ui";
import { useState } from "react";

const FriendItem = ({ friend }) => {
  const [showOptions, setShowOptions] = useState(true);
  return (
    <Nav.Item
      key={friend._id}
      text={
        <div
          className="flex-center"
          style={{
            width: 200,
            justifyContent: "space-between",
          }}
        >
          <p>{friend.name}</p>
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
      icon={<UserAvatar avatar={friend.avatar} isActive={friend.isOnline} />}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    />
  );
};

export default FriendItem;
