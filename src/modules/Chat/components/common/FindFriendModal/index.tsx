import React from "react";
import { Input, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";

const FindFriendModal = ({ visible, onCancel, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Modal
      visible={visible}
      title="Thêm bạn"
      cancelText="Huỷ"
      okText="Tìm kiếm"
      onCancel={onCancel}
      onOk={() => onSearch(searchValue)}
      closeOnEsc
    >
      <Input
        placeholder="Nhập số điện thoại hoặc email"
        onEnterPress={() => onSearch(searchValue)}
        onChange={(value) => setSearchValue(value)}
      />
    </Modal>
  );
};

export default FindFriendModal;
