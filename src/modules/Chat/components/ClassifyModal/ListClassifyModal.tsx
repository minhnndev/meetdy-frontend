import ServiceClassify from "@/api/classifyApi";
import { TClassify } from "@/models/classify.model";
import { fetchListClassify } from "@/redux/slice/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  IconDelete,
  IconEdit,
  IconPlus,
  IconPriceTag,
} from "@douyinfe/semi-icons";
import { Button, Modal, Toast, Typography } from "@douyinfe/semi-ui";

const ListClassifyModal = ({
  visible,
  onCancel,
  openAddModal,
  openEditModal,
}) => {
  const { classifies } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const handleDeleteFriend = async (id: string) => {
    try {
      await ServiceClassify.deleteClassify(id);
      Toast.success("Xóa thành công");
      dispatch(fetchListClassify());
    } catch (error) {
      Toast.error("Xóa thất bại");
    }
  };

  const onDelete = (id: string) => {
    Modal.warning({
      title: "Xác nhận xoá bạn",
      content: "Bạn có thật sự muốn xoá thẻ phân loại này?",
      okText: "Xoá",
      cancelText: "Huỷ",
      onOk: () => handleDeleteFriend(id),
    });
  };

  return (
    <Modal
      title="Quản lý thẻ phân loại"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {classifies.map((classify: TClassify) => (
        <div
          key={classify._id}
          style={{
            padding: 8,
            margin: "8px 0",
            background: "#e1e4ea",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <div>
            <IconPriceTag
              style={{ color: classify.color.code, marginRight: 4 }}
            />
            <Typography.Text>{classify.name}</Typography.Text>
          </div>
          <div>
            <Button
              theme="borderless"
              type="tertiary"
              icon={<IconEdit />}
              onClick={() => openEditModal(classify)}
            />
            <Button
              theme="borderless"
              type="tertiary"
              icon={<IconDelete />}
              onClick={() => onDelete(classify._id)}
            />
          </div>
        </div>
      ))}
      <Button
        theme="borderless"
        type="primary"
        icon={<IconPlus />}
        style={{ margin: "0.75rem 0 1.5rem 0" }}
        onClick={openAddModal}
      >
        Thêm thẻ phân loại
      </Button>
    </Modal>
  );
};

export default ListClassifyModal;
