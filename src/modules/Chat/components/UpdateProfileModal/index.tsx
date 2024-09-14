import { Modal } from "@douyinfe/semi-ui";
import UploadCoverImage from "../UploadCoverImage";
import UploadAvatar from "../UploadAvatar";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";

const UpdateProfileModal = ({ visible, onCancel }) => {
  const { user } = useAppSelector((state) => state.global);
  const [coverImg, setCoverImg] = useState<string | File>(user?.coverImage);
  const [avatar, setAvatar] = useState<string | File>(user.avatar);

  const handleClose = () => {
    setCoverImg(user?.coverImage);
    setAvatar(user.avatar);
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Cập nhật thông tin"
      onCancel={handleClose}
      okText="Cập nhật"
      cancelText="Huỷ"
    >
      <UploadCoverImage coverImg={coverImg} setCoverImg={setCoverImg} />
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
    </Modal>
  );
};

export { UpdateProfileModal };
