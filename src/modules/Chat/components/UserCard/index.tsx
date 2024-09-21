import { TSuggestFriend } from "@/models/friend.model";
import { Button, Image, Modal, Typography } from "@douyinfe/semi-ui";
import { UserAvatar } from "../UserAvatar";

const UserCard = ({
  visible,
  onCancel,
  user,
}: {
  visible: boolean;
  onCancel: () => void;
  user: TSuggestFriend;
}) => {
  const {
    coverImage,
    avatar,
    avatarColor,
    name,
    gender,
    dateOfBirth,
    numberCommonFriend,
    numberCommonGroup,
  } = user;
  return (
    <Modal
      visible={visible}
      title="Thông tin"
      onCancel={onCancel}
      footer={null}
    >
      <Image
        src={coverImage}
        width={400}
        height={180}
        style={{ objectFit: "cover" }}
      />
      <div className="flex-center" style={{ marginTop: -40 }}>
        {avatar ? (
          <Image
            src={avatar}
            width={74}
            height={74}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid #58aeff",
            }}
          />
        ) : (
          <UserAvatar
            avatar=""
            isActive={false}
            name={user.name}
            size="large"
            color={avatarColor}
          />
        )}
      </div>
      <div className="flex-center" style={{ margin: "1rem 0" }}>
        <Typography.Text style={{ fontSize: 20 }}>{name}</Typography.Text>
      </div>
      <div className="flex-center">
        <Button
          theme="solid"
          type="primary"
          size="large"
          style={{ marginRight: 8 }}
        >
          Kết bạn
        </Button>
        <Button
          theme="outline"
          type="tertiary"
          size="large"
          style={{ marginLeft: 8 }}
        >
          Nhắn tin
        </Button>
      </div>
      <div className="flex-center" style={{ margin: "1rem 0 2rem 0" }}>
        <div
          style={{ display: "flex", flexDirection: "column", marginRight: 20 }}
        >
          <Typography.Text type="tertiary">Giới tính</Typography.Text>
          <Typography.Text type="tertiary">Ngày sinh</Typography.Text>
          <Typography.Text type="tertiary">Nhóm chung</Typography.Text>
          <Typography.Text type="tertiary">Bạn chung</Typography.Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography.Text>{gender ? "Nam" : "Nữ"}</Typography.Text>
          <Typography.Text>
            {dateOfBirth.day}/{dateOfBirth.month}/{dateOfBirth.year}
          </Typography.Text>
          <Typography.Text>{numberCommonGroup}</Typography.Text>
          <Typography.Text>{numberCommonFriend}</Typography.Text>
        </div>
      </div>
    </Modal>
  );
};

export { UserCard };
