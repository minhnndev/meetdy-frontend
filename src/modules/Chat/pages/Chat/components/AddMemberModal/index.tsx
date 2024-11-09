import React from "react";
import ServiceConversation from "@/api/conversationApi";
import { TFriend } from "@/models/friend.model";
import { UserAvatar } from "@/modules/Chat/components/common";
import { createGroup } from "@/redux/slice/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IconClose } from "@douyinfe/semi-icons";
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

const AddMemberModal = ({ visible, onCancel, conversationType }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [selectedFriendIds, setSelectedFriendIds] = useState([]);
  const { friends } = useAppSelector((state) => state.friend);
  const { memberInConversation, currentConversation } = useAppSelector(
    (state) => state.chat
  );

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

  const checkInConversation = (value) => {
    const index = memberInConversation
      ?.map((ele) => ele._id)
      ?.findIndex((ele) => ele === value);
    return index > -1;
  };

  const handleOk = async () => {
    setLoading(true);
    const selectedIds = selectedFriendIds?.filter(
      (id) => !checkInConversation(id)
    );
    if (conversationType) {
      await ServiceConversation.addMembersToConver(
        selectedIds,
        currentConversation
      );
      Toast.success("Thêm thành viên thành công");
    } else {
      const currentFriendId = memberInConversation?.[0]?._id;
      dispatch(
        createGroup({
          name: groupName,
          userIds: [...selectedIds, currentFriendId],
        })
      );
      Toast.success("Tạo nhóm thành công");
    }
    setLoading(false);
    onCancel();
  };

  const renderSourceItem = (item) => {
    return (
      <div key={item.key} className="transfer-source-item">
        <Checkbox
          disabled={checkInConversation(item.value)}
          onChange={() => item.onChange()}
          key={item.label}
          checked={item.checked}
          style={{ height: 52, alignItems: "center" }}
        >
          <UserAvatar
            avatar={item.avatar}
            name={item.label}
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
      onOk={handleOk}
      title={conversationType ? "Thêm thành viên" : "Tạo nhóm"}
      cancelText="Huỷ"
      okText={conversationType ? "Thêm" : "Tạo nhóm"}
      size="medium"
      confirmLoading={loading}
    >
      {!conversationType && (
        <Input
          placeholder="Nhập tên nhóm"
          style={{ marginBottom: 8 }}
          onChange={(value) => setGroupName(value)}
        />
      )}
      <LocaleProvider locale={vi_VN}>
        <Transfer
          dataSource={friendList}
          onChange={(values) => setSelectedFriendIds(values)}
          renderSourceItem={renderSourceItem}
          renderSelectedItem={renderSelectedItem}
          filter={(input, item) =>
            item.label.toString().toLowerCase().includes(input.toLowerCase())
          }
        />
      </LocaleProvider>
    </Modal>
  );
};

export default AddMemberModal;
