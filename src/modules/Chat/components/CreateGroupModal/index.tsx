import { TFriend } from "@/models/friend.model";
import { createGroup } from "@/redux/slice/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  Checkbox,
  Input,
  LocaleProvider,
  Modal,
  Toast,
  Transfer,
} from "@douyinfe/semi-ui";
import vi_VN from "@douyinfe/semi-ui/lib/es/locale/source/vi_VN";
import { useEffect, useState } from "react";
import { UserAvatar } from "../UserAvatar";
import { IconClose } from "@douyinfe/semi-icons";
import "./style.css";

const CreateGroupModal = ({ visible, onCancel }) => {
  const dispatch = useAppDispatch();
  const { friends } = useAppSelector((state) => state.friend);
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [selectedFriendIds, setSelectedFriendIds] = useState([]);

  useEffect(() => {
    if (visible)
      setFriendList(
        friends?.map((friend: TFriend) => ({
          label: friend.name,
          key: friend._id,
          value: friend._id,
          avatar: friend.avatar,
          avatarColor: friend.avatarColor,
        }))
      );
  }, [friends, visible]);

  const handleCreateGroup = () => {
    setLoading(true);
    dispatch(createGroup({ name: groupName, userIds: selectedFriendIds }));
    Toast.success("Tạo nhóm thành công");
    setLoading(false);
    onCancel();
  };

  const renderSourceItem = (item) => {
    return (
      <div key={item.key} className="transfer-source-item">
        <Checkbox
          onChange={() => item.onChange()}
          key={item.label}
          checked={item.checked}
          style={{ height: 52, alignItems: "center" }}
        >
          <UserAvatar
            avatar={item.avatar}
            name={item.label}
            isActive={false}
            color={item.avatarColor}
            size="small"
          />
          <p className="name">{item.label}</p>
        </Checkbox>
      </div>
    );
  };

  const renderSelectedItem = (item) => {
    return (
      <div key={item.key} className="transfer-selected-item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <UserAvatar
            avatar={item.avatar}
            name={item.label}
            isActive={false}
            color={item.avatarColor}
            size="small"
          />
          <p className="name">{item.label}</p>
        </div>
        <IconClose onClick={item.onRemove} style={{ cursor: "pointer" }} />
      </div>
    );
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={handleCreateGroup}
      title="Tạo nhóm"
      cancelText="Huỷ"
      okText="Tạo nhóm"
      size="medium"
      confirmLoading={loading}
    >
      <Input
        placeholder="Nhập tên nhóm"
        style={{ marginBottom: 8 }}
        onChange={(value) => setGroupName(value)}
      />
      <LocaleProvider locale={vi_VN}>
        <Transfer
          dataSource={friendList}
          onChange={(values) => setSelectedFriendIds(values)}
          renderSourceItem={renderSourceItem}
          renderSelectedItem={renderSelectedItem}
        />
      </LocaleProvider>
    </Modal>
  );
};

export default CreateGroupModal;
