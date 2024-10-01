import { TClassify } from "@/models/classify.model";
import { useAppSelector } from "@/redux/store";
import {
  IconArrowLeft,
  IconDelete,
  IconEdit,
  IconPlus,
  IconPriceTag,
} from "@douyinfe/semi-icons";
import { Button, Modal, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";

const ClassifyModal = ({ visible, onOpen, onCancel }) => {
  const { classifies } = useAppSelector((state) => state.chat);
  const [isModifyTag, setIsModifyTag] = useState(false);
  return (
    <>
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
              <Button theme="borderless" type="tertiary" icon={<IconEdit />} />
              <Button
                theme="borderless"
                type="tertiary"
                icon={<IconDelete />}
              />
            </div>
          </div>
        ))}
        <Button
          theme="borderless"
          type="primary"
          icon={<IconPlus />}
          style={{ margin: "0.75rem 0 1.5rem 0" }}
          onClick={() => {
            setIsModifyTag(true);
            onCancel();
          }}
        >
          Thêm thẻ phân loại
        </Button>
      </Modal>
      <Modal
        title={
          <span>
            <Button
              theme="borderless"
              type="tertiary"
              icon={<IconArrowLeft />}
              onClick={() => {
                setIsModifyTag(false);
                onOpen();
              }}
              style={{ margin: "0 4px 4px 0" }}
            />
            Thêm thẻ phân loại
          </span>
        }
        visible={isModifyTag}
        onCancel={() => setIsModifyTag(false)}
      ></Modal>
    </>
  );
};

export { ClassifyModal };
