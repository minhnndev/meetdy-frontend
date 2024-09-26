import ServiceConversation from "@/api/conversationApi";
import { TGroupConversation } from "@/models/conversation.model";
import { GroupAvatar } from "@/modules/Chat/components";
import { fetchListGroup } from "@/redux/slice/friendSlice";
import { useAppDispatch } from "@/redux/store";
import { IconExit, IconMore, IconPriceTag } from "@douyinfe/semi-icons";
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
  const [showOptions, setShowOptions] = useState(true);
  const { _id, name, totalMembers, avatar } = group;
  const dispatch = useAppDispatch();

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.75rem 0",
          }}
          onClick={() => {}}
        >
          <GroupAvatar
            avatars={avatar}
            totalMembers={totalMembers}
            smallSize={40}
            largeSize={72}
          />
          <Typography.Title heading={6} style={{ marginTop: "1rem" }}>
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
                <Dropdown.Item
                  icon={<IconExit />}
                  type="danger"
                  onClick={onLeaveGroup}
                >
                  Rời nhóm
                </Dropdown.Item>
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
