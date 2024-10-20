import { Avatar, AvatarGroup } from "@douyinfe/semi-ui";
import { UserAvatar } from "../UserAvatar";
import { IconUserStroked } from "@douyinfe/semi-icons";
import { isEmpty } from "lodash";

const GroupAvatar = ({ avatars, totalMembers, smallSize, largeSize }) => {
  return (
    <div className="flex-center">
      {isEmpty(avatars) && totalMembers <= 0 && (
        <UserAvatar avatar="" color="" name="" size="large" />
      )}
      {totalMembers == 2 && (
        <AvatarGroup>
          {avatars?.slice(0, 2)?.map((avatar) => (
            <Avatar
              src={avatar.avatar}
              style={{
                backgroundColor: !avatar.avatar && avatar.avatarColor,
                color: "white",
                width: largeSize,
                height: largeSize,
              }}
            >
              <IconUserStroked size="extra-large" />
            </Avatar>
          ))}
        </AvatarGroup>
      )}
      {totalMembers == 3 && (
        <div className="flex-center" style={{ flexDirection: "column" }}>
          <Avatar
            src={avatars[0].avatar}
            style={{
              backgroundColor: !avatars[0].avatar && avatars[0].avatarColor,
              color: "white",
              width: smallSize,
              height: smallSize,
              marginBottom: -8,
            }}
          >
            <IconUserStroked size="extra-large" />
          </Avatar>
          <AvatarGroup>
            {avatars?.slice(1, 3)?.map((avatar) => (
              <Avatar
                src={avatar.avatar}
                style={{
                  backgroundColor: !avatar.avatar && avatar.avatarColor,
                  color: "white",
                  width: smallSize,
                  height: smallSize,
                }}
              >
                <IconUserStroked size="extra-large" />
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
      )}
      {totalMembers === 4 && (
        <div className="flex-center" style={{ flexDirection: "column" }}>
          <AvatarGroup>
            {avatars?.slice(0, 2)?.map((avatar) => (
              <Avatar
                src={avatar.avatar}
                style={{
                  backgroundColor: !avatar.avatar && avatar.avatarColor,
                  color: "white",
                  width: smallSize,
                  height: smallSize,
                  marginBottom: -8,
                }}
              >
                <IconUserStroked size="extra-large" />
              </Avatar>
            ))}
          </AvatarGroup>
          <AvatarGroup>
            {avatars?.slice(2, 4)?.map((avatar) => (
              <Avatar
                src={avatar.avatar}
                style={{
                  backgroundColor: !avatar.avatar && avatar.avatarColor,
                  color: "white",
                  width: smallSize,
                  height: smallSize,
                }}
              >
                <IconUserStroked size="extra-large" />
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
      )}
      {totalMembers > 4 && (
        <div className="flex-center" style={{ flexDirection: "column" }}>
          <AvatarGroup overlapFrom="end">
            {avatars?.slice(0, 2)?.map((avatar) => (
              <Avatar
                src={avatar.avatar}
                style={{
                  backgroundColor: !avatar.avatar && avatar.avatarColor,
                  color: "white",
                  width: smallSize,
                  height: smallSize,
                  marginBottom: -8,
                }}
              >
                <IconUserStroked size="extra-large" />
              </Avatar>
            ))}
          </AvatarGroup>
          <AvatarGroup overlapFrom="end">
            <Avatar
              src={avatars?.[3]?.avatar}
              style={{
                backgroundColor:
                  !avatars?.[3]?.avatar && avatars?.[3]?.avatarColor,
                color: "white",
                width: smallSize,
                height: smallSize,
              }}
            >
              <IconUserStroked size="extra-large" />
            </Avatar>
            <Avatar
              color="purple"
              style={{
                fontSize: 16,
                color: "white",
                width: smallSize,
                height: smallSize,
              }}
            >
              <p>+{totalMembers - 3}</p>
            </Avatar>
          </AvatarGroup>
        </div>
      )}
    </div>
  );
};

export { GroupAvatar };
