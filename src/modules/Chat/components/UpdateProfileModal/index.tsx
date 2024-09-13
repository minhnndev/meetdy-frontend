import { Modal } from "@douyinfe/semi-ui";

const UpdateProfileModal = ({ visible, onCancel }) => {
  return (
    <Modal
      visible={visible}
      title="Cập nhật thông tin"
      onCancel={onCancel}
      okText="Cập nhật"
      cancelText="Huỷ"
    ></Modal>
  );
};

export { UpdateProfileModal };
