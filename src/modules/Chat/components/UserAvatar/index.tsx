import { IconUserStroked } from "@douyinfe/semi-icons";
import { Avatar, Badge } from "@douyinfe/semi-ui";
import getSummaryName from "@/utils/nameHelper";

type TUserAvatarProps = {
  avatar: string;
  isActive: boolean;
  color?: string;
  name?: string;
  onClick?: any;
};

function UserAvatar(props: TUserAvatarProps) {
  const { avatar, isActive, color, name, onClick } = props;
  return (
    <Badge
      dot={isActive}
      position="rightBottom"
      type="success"
      countStyle={{
        marginRight: 6,
        marginBottom: 6,
      }}
    >
      <Avatar
        onClick={onClick}
        style={{
          cursor: "pointer",
          backgroundColor: (avatar || name) && color,
          fontStyle: "normal",
        }}
        src={avatar}
        alt={name}
      >
        {!avatar &&
          (name ? (
            getSummaryName(name)
          ) : (
            <IconUserStroked size="extra-large" />
          ))}
      </Avatar>
    </Badge>
  );
}

export { UserAvatar };
