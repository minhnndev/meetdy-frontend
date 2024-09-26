import { TSuggestFriend } from "@/models/friend.model";
import { Button, Image, Modal, Toast, Typography } from "@douyinfe/semi-ui";
import { UserAvatar } from "../UserAvatar";
import FriendService from "@/api/friendApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchContacts,
  fetchFriends,
  fetchListMyRequestFriend,
  fetchListRequestFriend,
  setAmountNotify,
} from "@/redux/slice/friendSlice";
import { useNavigate } from "react-router";
import ServiceConversation from "@/api/conversationApi";
import {
  fetchChannels,
  fetchListFriends,
  fetchListMessages,
  getLastViewOfMembers,
  setConversations,
  setCurrentConversation,
} from "@/redux/slice/chat/chatSlice";

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
    _id,
    coverImage,
    avatar,
    avatarColor,
    name,
    gender,
    dateOfBirth,
    numberCommonFriend,
    numberCommonGroup,
    status,
  } = user;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { conversations } = useAppSelector((state) => state.chat);
  const { amountNotify } = useAppSelector((state) => state.friend);

  const handleAddFriend = async () => {
    try {
      await FriendService.sendRequestFriend(_id);
      dispatch(fetchListMyRequestFriend());
      dispatch(fetchContacts());
      onCancel();
      Toast.success("Gửi lời mời kết bạn thành công");
    } catch (error) {
      Toast.error("Gửi lời mời kết bạn thất bại");
    }
  };

  const handleAcceptFriend = async () => {
    await FriendService.acceptRequestFriend(_id);
    dispatch(fetchListRequestFriend());
    dispatch(fetchFriends({ name: "" }));
    dispatch(fetchListFriends({ name: "" }));
    dispatch(setAmountNotify(amountNotify - 1));
    onCancel();
    Toast.success("Thêm bạn thành công");
  };

  const handleDenyRequest = async () => {
    await FriendService.deleteRequestFriend(_id);
    dispatch(setAmountNotify(amountNotify - 1));
    dispatch(fetchListRequestFriend());
    onCancel();
  };

  const handleCancelRequest = async () => {
    await FriendService.deleteSentRequestFriend(user._id);
    dispatch(fetchListMyRequestFriend());
    dispatch(fetchContacts());
    onCancel();
  };

  const handleClickMessage = async () => {
    const response = await ServiceConversation.createConversationIndividual(
      user._id
    );
    const { _id, isExists } = response;

    if (!isExists) {
      const conver = await ServiceConversation.getConversationById(_id);
      dispatch(setConversations(conver));
    }

    const tempConver = conversations.find((ele) => ele._id === _id);
    if (tempConver && tempConver.type) {
      dispatch(fetchChannels({ conversationId: _id }));
    }

    dispatch(getLastViewOfMembers({ conversationId: _id }));
    dispatch(fetchListMessages({ conversationId: _id, size: 10 }));
    dispatch(setCurrentConversation(_id));

    navigate("/chat");
    onCancel();
  };

  const handleDeleteFriend = async () => {
    try {
      await FriendService.deleteFriend(_id);
      dispatch(fetchFriends({ name: "" }));
      Toast.success("Xóa thành công");
    } catch (error) {
      Toast.error("Xóa thất bại");
    }
  };

  const onDelete = () => {
    Modal.warning({
      title: "Xác nhận xoá bạn",
      content: (
        <p>
          Bạn có thật sự muốn xoá <b>{name}</b> khỏi danh sách bạn bè?
        </p>
      ),
      okText: "Xoá",
      cancelText: "Huỷ",
      onOk: handleDeleteFriend,
    });
  };

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
        {status == "NOT_FRIEND" && (
          <Button
            theme="solid"
            type="primary"
            size="large"
            style={{ marginRight: 16 }}
            onClick={handleAddFriend}
          >
            Kết bạn
          </Button>
        )}
        {status == "FOLLOWERS" && (
          <>
            <Button
              theme="solid"
              type="primary"
              size="large"
              onClick={handleAcceptFriend}
            >
              Đồng ý
            </Button>
            <Button
              theme="outline"
              type="danger"
              size="large"
              style={{ margin: "0 16px" }}
              onClick={handleDenyRequest}
            >
              Từ chối
            </Button>
          </>
        )}
        {status == "FOLLOWING" && (
          <Button
            theme="outline"
            type="danger"
            size="large"
            style={{ marginRight: 16 }}
            onClick={handleCancelRequest}
          >
            Huỷ yêu cầu
          </Button>
        )}
        <Button
          theme="outline"
          type="tertiary"
          size="large"
          onClick={handleClickMessage}
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
      {status === "FRIEND" && (
        <div className="flex-center">
          <Button
            theme="outline"
            type="danger"
            style={{ width: "50%", marginBottom: "2rem" }}
            onClick={onDelete}
          >
            Huỷ kết bạn
          </Button>
        </div>
      )}
    </Modal>
  );
};

export { UserCard };
