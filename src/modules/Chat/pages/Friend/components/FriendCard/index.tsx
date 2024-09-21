import { TRequestFriend } from "@/models/friend.model";
import { UserAvatar } from "@/modules/Chat/components";
import { Button, Card } from "@douyinfe/semi-ui";
import Meta from "@douyinfe/semi-ui/lib/es/card/meta";

const FriendCard = ({
  request,
  isMine = false,
}: {
  request: TRequestFriend;
  isMine?: boolean;
}) => {
  const { avatar, avatarColor, name } = request;
  return (
    <Card
      shadows="hover"
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      style={{ margin: "0.5rem 0" }}
    >
      <Meta
        title={name}
        avatar={
          <UserAvatar
            avatar={avatar}
            color={avatarColor}
            name={name}
            isActive={false}
            size="medium"
          />
        }
      />
      {isMine ? (
        <Button theme="solid" type="danger" style={{ marginLeft: 8 }}>
          Huỷ yêu cầu
        </Button>
      ) : (
        <div>
          <Button theme="outline" type="tertiary">
            Bỏ qua
          </Button>
          <Button theme="solid" type="primary" style={{ marginLeft: 8 }}>
            Đồng ý
          </Button>
        </div>
      )}
    </Card>
  );
};

export default FriendCard;
