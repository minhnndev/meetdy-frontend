import ServiceClassify from "@/api/classifyApi";
import ColorPicker from "@/components/ColorPicker";
import { TColor } from "@/models/classify.model";
import { fetchListClassify } from "@/redux/slice/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IconArrowLeft, IconPriceTag } from "@douyinfe/semi-icons";
import { Button, Input, Modal, Popover, Toast } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";

const ModifyClassifyModal = ({
  onOpen,
  isEdit,
  setIsEdit,
  showModifyModal,
  setShowModifyModal,
  selectedTag,
  setSelectedTag,
}) => {
  const dispatch = useAppDispatch();
  const { classifies, colors } = useAppSelector((state) => state.chat);
  const [inputName, setInputName] = useState("");
  const [color, setColor] = useState<TColor | null>(null);
  const [openColorPicker, setOpenColorPicker] = useState(false);

  useEffect(() => {
    setInputName(selectedTag?.name);
    setColor(selectedTag?.color);
  }, [selectedTag]);

  const checkTagExist = (value: string) => {
    const index = classifies.findIndex(
      (ele) => ele.name.toLowerCase() === value.toLowerCase()
    );
    return index >= 0 && !isEdit;
  };

  const handleCreateClassify = async () => {
    if (checkTagExist(inputName)) {
      Toast.error("Tên thẻ phân loại đã tồn tại");
      return;
    }
    if (isEdit) {
      try {
        await ServiceClassify.updateClassify(selectedTag._id, {
          name: inputName,
          colorId: color._id,
        });
        Toast.success("Cập nhật thành công");
        setShowModifyModal(false);
        dispatch(fetchListClassify());
        if (onOpen) onOpen();
      } catch (error) {
        Toast.error("Cập nhật thất bại");
      }
    } else {
      try {
        await ServiceClassify.addClassify({
          name: inputName,
          colorId: color._id,
        });
        Toast.success("Thêm thành công");
        setShowModifyModal(false);
        dispatch(fetchListClassify());
      } catch (error) {
        Toast.error("Thêm thất bại");
      }
    }
    setIsEdit(false);
    setSelectedTag(null);
    setInputName("");
    setColor(null);
  };

  return (
    <Modal
      title={
        <span>
          <Button
            theme="borderless"
            type="tertiary"
            icon={<IconArrowLeft />}
            onClick={() => {
              setShowModifyModal(false);
              setIsEdit(false);
              setSelectedTag(null);
              onOpen();
            }}
            style={{ margin: "0 4px 4px 0" }}
          />
          {isEdit ? "Chỉnh sửa thẻ phân loại" : "Thêm thẻ phân loại"}
        </span>
      }
      visible={showModifyModal}
      onCancel={() => setShowModifyModal(false)}
      cancelText="Huỷ"
      okText={isEdit ? "Cập nhật" : "Thêm"}
      onOk={handleCreateClassify}
    >
      <Input
        placeholder="Nhập tên thẻ phân loại"
        suffix={
          <Popover
            visible={openColorPicker}
            onClickOutSide={() => setOpenColorPicker(false)}
            content={
              <ColorPicker
                colors={colors}
                handleClickColor={(color: TColor) => {
                  setColor(color);
                  setOpenColorPicker(false);
                }}
              />
            }
            trigger="custom"
            style={{
              width: "216px",
              height: "216px",
              padding: 4,
              overflow: "scroll",
            }}
            className="hide-scroll"
          >
            <Button
              theme="borderless"
              icon={<IconPriceTag style={{ color: color?.code }} />}
              onClick={() => setOpenColorPicker(true)}
            />
          </Popover>
        }
        onChange={(value) => setInputName(value)}
        defaultValue={selectedTag?.name}
      />
    </Modal>
  );
};

export default ModifyClassifyModal;
