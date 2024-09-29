import ServiceConversation from "@/api/conversationApi";
import { TGroupConversation } from "@/models/conversation.model";
import { GroupAvatar } from "@/modules/Chat/components";
import { fetchListGroup } from "@/redux/slice/friendSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  IconExit,
  IconKeyStroked,
  IconMore,
  IconPriceTag,
} from "@douyinfe/semi-icons";
import {
  Button,
  Card,
  Dropdown,
  Modal,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import { useState } from "react";
import { socket } from "@/utils/socketClient";

const GroupCard = ({ group }: { group: TGroupConversation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { _id, name, totalMembers, avatar, leaderId } = group;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.global);

  const handleDeleteGroup = async () => {
    try {
      await ServiceConversation.deleteConversation(_id);
      Toast.success("Giải tán nhóm thành công");
    } catch (error) {
      Toast.error("Đã có lỗi xảy ra");
    }
  };

  const onDeleteGroup = () => {
    Modal.warning({
      title: "Xác nhận giải tán nhóm",
      content:
        "Toàn bộ nội dung cuộc trò chuyện sẻ bị xóa, bạn có chắc chắn muốn xóa?",
      okText: "Giải tán nhóm",
      cancelText: "Huỷ",
      onOk: handleDeleteGroup,
    });
  };

  const handleLeaveGroup = async () => {
    try {
      await ServiceConversation.leaveGroup(_id);
      Toast.success(`Rời nhóm thành công`);
      socket.emit("leave-conversation", _id);
      dispatch(fetchListGroup({ name: "", type: 2 }));
    } catch (error) {
      Toast.error(`Rời nhóm thất bại`);
    }
  };

  const onLeaveGroup = () => {
    Modal.warning({
      title: "Xác nhận rời nhóm",
      content: "Bạn có chắc mình muốn rời khỏi nhóm này?",
      okText: "Rời nhóm",
      cancelText: "Huỷ",
      onOk: handleLeaveGroup,
    });
  };

  return (
    <Card shadows="hover" style={{ width: 250 }}>
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        {leaderId === user._id && (
          <IconKeyStroked
            size="default"
            style={{
              position: "absolute",
              marginTop: -4,
              marginLeft: -4,
              color: "yellow",
              background: "var(--semi-color-overlay-bg)",
              borderRadius: "50%",
              padding: 4,
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.75rem 0",
            textAlign: "center",
          }}
          onClick={() => {}}
        >
          <GroupAvatar
            avatars={avatar}
            totalMembers={totalMembers}
            smallSize={40}
            largeSize={72}
          />
          <Typography.Title
            heading={6}
            style={{ marginTop: "1rem", width: 200 }}
            ellipsis={{ showTooltip: true }}
          >
            {name}
          </Typography.Title>
          <Typography.Text type="tertiary" style={{ marginTop: 4 }}>
            {totalMembers} thành viên
          </Typography.Text>
        </div>
        {showOptions && (
          <Dropdown
            position="bottom"
            trigger="click"
            render={
              <Dropdown.Menu>
                <Dropdown.Item icon={<IconPriceTag />}>
                  Thẻ phân loại
                </Dropdown.Item>
                {leaderId === user._id ? (
                  <Dropdown.Item
                    icon={<IconExit />}
                    type="danger"
                    onClick={onDeleteGroup}
                  >
                    Giải tán nhóm
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item
                    icon={<IconExit />}
                    type="danger"
                    onClick={onLeaveGroup}
                  >
                    Rời nhóm
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            }
          >
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
          </Dropdown>
        )}
      </div>
    </Card>
  );
};

export default GroupCard;
