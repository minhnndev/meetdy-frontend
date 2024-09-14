import { IconCamera } from "@douyinfe/semi-icons";
import { Avatar, Upload } from "@douyinfe/semi-ui";
import { useState } from "react";
import "./style.css";

const UploadAvatar = ({ avatar, setAvatar }) => {
  const [previewImg, setPreviewImg] = useState<File>(null);
  const [visible, setVisible] = useState(false);

  const renderAvatar = (src: string) => (
    <div className="flex-center" key={src}>
      <Avatar src={src} size="large" onMouseEnter={() => setVisible(true)} />
    </div>
  );

  return (
    <div style={{ marginTop: -38, zIndex: 10 }}>
      <Upload
        action=""
        accept="image/*"
        renderFileItem={(props) => renderAvatar(props.url)}
        limit={1}
        draggable={true}
        onFileChange={(files) => {
          setPreviewImg(files?.[0]);
          setAvatar(files?.[0]);
        }}
      >
        {!previewImg && !avatar ? (
          <Avatar size="large">
            <IconCamera size="extra-large" />
          </Avatar>
        ) : (
          <>
            {!previewImg && avatar && renderAvatar(avatar)}
            <div
              style={{
                position: "absolute",
                marginTop: previewImg && 72,
                zIndex: 1,
                visibility: visible ? "visible" : "hidden",
              }}
              onMouseLeave={() => setVisible(false)}
            >
              <Avatar
                size="large"
                style={{ backgroundColor: "var(--semi-color-overlay-bg)" }}
              >
                <IconCamera size="extra-large" />
              </Avatar>
            </div>
          </>
        )}
      </Upload>
    </div>
  );
};

export default UploadAvatar;
