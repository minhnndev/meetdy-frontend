import React from "react";
import { IconCamera, IconEditStroked } from "@douyinfe/semi-icons";
import { Button, Typography, Upload } from "@douyinfe/semi-ui";
import { useState } from "react";

const UploadCoverImage = ({ coverImg, setCoverImg }) => {
  const [previewImg, setPreviewImg] = useState<File>(null);

  const renderImageItem = (src: string) => (
    <div style={{ height: 180, width: "100%" }} key={src}>
      <img
        src={src}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );

  return (
    <Upload
      action=""
      accept="image/*"
      renderFileItem={(props) => renderImageItem(props.url)}
      limit={1}
      draggable={true}
      onFileChange={(files) => {
        setPreviewImg(files?.[0]);
        setCoverImg(files?.[0]);
      }}
    >
      {!previewImg && !coverImg ? (
        <div
          className="flex-center"
          style={{
            width: "100%",
            height: 180,
            backgroundColor: "#c4c4c4",
          }}
        >
          <Typography.Text>Chọn hình ảnh</Typography.Text>
          <IconCamera style={{ marginLeft: "0.5rem" }} />
        </div>
      ) : (
        <>
          {!previewImg && coverImg && renderImageItem(coverImg)}
          <div style={{ position: "absolute" }}>
            <Button
              icon={<IconEditStroked />}
              theme="outline"
              type="tertiary"
              style={{
                position: "absolute",
                borderRadius: "50%",
                zIndex: 1,
                top: previewImg ? "8.75rem" : "3rem",
                left: "9.5rem",
                backgroundColor: "white",
              }}
            />
          </div>
        </>
      )}
    </Upload>
  );
};

export default UploadCoverImage;
