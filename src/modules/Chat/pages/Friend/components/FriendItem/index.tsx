import FriendService from "@/api/friendApi";
import ServiceUser from "@/api/userApi";
import { INIT_SUGGEST_FRIEND } from "@/constants/friend.constant";
import { TFriend } from "@/models/friend.model";
import { UserAvatar, UserCard } from "@/modules/Chat/components";
import { fetchFriends } from "@/redux/slice/friendSlice";
import { useAppDispatch } from "@/redux/store";
import dateUtils from "@/utils/dateUtils";
import { IconDelete, IconInfoCircle, IconMore } from "@douyinfe/semi-icons";
import {
  Button,
  Dropdown,
  Modal,
  Nav,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import { useState } from "react";

const FriendItem = ({ friend }: { friend: TFriend }) => {
  const dispatch = useAppDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [findUser, setFindUser] = useState(INIT_SUGGEST_FRIEND);
  const { _id, username, avatar, avatarColor, name, isOnline } = friend;
  const { Paragraph } = Typography;

  const handleViewInfo = async () => {
    setShowUserInfo(true);
    setShowDropdown(false);
    const user = await ServiceUser.getUser(username);
    setFindUser(user);
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
    <Nav.Item
      itemKey={friend._id}
      text={
        <div
          className="flex-center"
          style={{ width: 200, justifyContent: "space-between" }}
        >
          <div
            style={{
              margin: "4px 0",
              padding: friend.lastLogin ? 0 : "10px 0",
            }}
          >
            <Paragraph style={{ width: 165 }} ellipsis={{ showTooltip: true }}>
              {name}
            </Paragraph>
            {friend.lastLogin && (
              <Paragraph type="tertiary">
                Truy cập {dateUtils.toTime(friend.lastLogin)} trước
              </Paragraph>
            )}
          </div>
          {showOptions && (
            <Dropdown
              visible={showDropdown}
              onClickOutSide={() => setShowDropdown(false)}
              position="bottom"
              trigger="click"
              render={
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={handleViewInfo}
                    icon={<IconInfoCircle />}
                  >
                    Xem thông tin
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={onDelete}
                    icon={<IconDelete />}
                    type="danger"
                  >
                    Xoá bạn
                  </Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Button
                type="tertiary"
                theme="borderless"
                icon={<IconMore />}
                style={{ marginRight: 1 }}
              />
            </Dropdown>
          )}
          <UserCard
            user={findUser}
            onCancel={() => setShowUserInfo(false)}
            visible={showUserInfo}
          />
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
