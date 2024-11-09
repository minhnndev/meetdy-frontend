import React from "react";
import ServiceConversation from "@/api/conversationApi";
import { GroupAvatar, UserAvatar } from "@/modules/Chat/components/common";
import {
  Avatar,
  Col,
  Divider,
  Modal,
  Row,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";

const JoinGroupModal = ({ visible, onCancel, groupInfo }) => {
  const { Title, Text, Paragraph } = Typography;
  const { _id, users, name } = groupInfo;

  const handleJoinGroup = async () => {
    try {
      await ServiceConversation.joinGroupFromLink(_id);
      onCancel();
      Toast.success("Tham gia nhóm thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Thông tin nhóm"
      style={{ textAlign: "center" }}
      okText="Tham gia"
      cancelText="Huỷ"
      onOk={handleJoinGroup}
    >
      <GroupAvatar
        avatars={users}
        totalMembers={users?.length}
        smallSize={40}
        largeSize={72}
      />
      <Title heading={2} style={{ marginTop: "0.5rem" }}>
        {name}
      </Title>
      <Text type="tertiary" style={{ marginTop: "1rem" }}>
        {users?.length} thành viên
      </Text>
      <Divider style={{ margin: "1.5rem 0" }} />
      <Row>
        {users?.slice(0, users?.length == 9 ? 9 : 8).map((user) => (
          <Col span={8} style={{ marginBottom: "2rem" }}>
            <UserAvatar
              avatar={user.avatar}
              color={user.avatarColor}
              name={user.name}
            />
            <Paragraph
              size="small"
              style={{ width: "100%", marginTop: 4 }}
              ellipsis={{ showTooltip: true }}
            >
              {user.name}
            </Paragraph>
          </Col>
        ))}
        {users.length > 9 && (
          <Col span={8} style={{ marginBottom: "2rem" }}>
            <Avatar
              color="purple"
              style={{
                fontSize: 16,
                color: "white",
              }}
            >
              <p>+{users?.length - 8}</p>
            </Avatar>
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export { JoinGroupModal };
