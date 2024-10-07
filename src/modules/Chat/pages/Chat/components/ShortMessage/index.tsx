import { useAppSelector } from "@/redux/store";
import {
  IconBarChartVStroked,
  IconBookmarkAddStroked,
  IconBookmarkDeleteStroked,
  IconEditStroked,
  IconEmoji,
  IconFile,
  IconFollowStroked,
  IconHash,
  IconImageStroked,
  IconKeyStroked,
  IconPriceTag,
  IconUserStroked,
  IconVideoStroked,
} from "@douyinfe/semi-icons";
import { Typography } from "@douyinfe/semi-ui";

const ShortMessage = ({ message, type, numberUnread, classify }) => {
  const { Text } = Typography;
  const { user } = useAppSelector((state) => state.global);
  const { content, isDeleted } = message;

  const renderName = () => {
    return message.user._id === user._id
      ? "Bạn: "
      : type
      ? message.user.name + ": "
      : "";
  };

  const renderNotifyMessage = () => {
    if (message.content.startsWith("Đã đổi tên nhóm thành"))
      return (
        <>
          {renderName()} <IconEditStroked /> đã đổi tên nhóm
        </>
      );
    switch (message.content) {
      case "Đã là bạn bè":
        return (
          <>
            {renderName()} <IconUserStroked /> đã trở thành bạn bè
          </>
        );
      case "PIN_MESSAGE":
        return (
          <>
            {renderName()} <IconBookmarkAddStroked /> đã ghim một tin nhắn
          </>
        );
      case "NOT_PIN_MESSAGE":
        return (
          <>
            {renderName()} <IconBookmarkDeleteStroked /> đã bỏ ghim một tin nhắn
          </>
        );
      case "Đã thêm vào nhóm":
        return (
          <>
            {renderName()} <IconFollowStroked /> đã thêm thành viên vào nhóm
          </>
        );
      case "Đã xóa ra khỏi nhóm":
        return renderName() + "đã xóa thành viên ra khỏi nhóm";
      case "Đã rời khỏi nhóm":
        return renderName() + "Đã rời khỏi nhóm";
      case "Tham gia từ link":
        return renderName() + "đã tham gia nhóm";
      case "UPDATE_CHANNEL":
        return (
          <>
            {renderName()} <IconHash /> đã đổi tên channel
          </>
        );
      case "DELETE_CHANNEL":
        return (
          <>
            {renderName()} <IconHash /> đã xoá channel
          </>
        );
      case "CREATE_CHANNEL":
        return (
          <>
            {renderName()} <IconHash /> đã tạo channel
          </>
        );
      case "Ảnh đại diện nhóm đã thay đổi":
        return (
          <>
            {renderName()} <IconEditStroked /> đã đổi ảnh nhóm
          </>
        );
      case "ADD_MANAGERS":
        return (
          <>
            {renderName()} <IconKeyStroked /> đã thêm phó nhóm
          </>
        );
      case "DELETE_MANAGERS":
        return (
          <>
            {renderName()} <IconKeyStroked /> đã xóa phó nhóm
          </>
        );
    }
  };

  const renderMessage = () => {
    switch (message.type) {
      case "TEXT":
        return renderName() + content;
      case "HTML":
        return renderName() + "đã gửi một văn bản";
      case "IMAGE":
        return (
          <>
            {renderName()} <IconImageStroked /> đã gửi một hình ảnh
          </>
        );
      case "VIDEO":
        return (
          <>
            {renderName()} <IconVideoStroked /> đã gửi một video
          </>
        );
      case "FILE":
        return (
          <>
            {renderName()} <IconFile /> đã gửi một tệp
          </>
        );
      case "STICKER":
        return (
          <>
            {renderName()} <IconEmoji /> đã gửi một sticker
          </>
        );
      case "VOTE":
        return (
          <>
            {renderName()} <IconBarChartVStroked /> đã bình chọn
          </>
        );
      case "NOTIFY":
        return renderNotifyMessage();
    }
  };

  return (
    <>
      {classify && (
        <IconPriceTag
          style={{
            color: classify.color.code,
            marginRight: 4,
            marginTop: 2,
          }}
        />
      )}
      {isDeleted ? (
        <span>{renderName()} đã thu hồi một tin nhắn</span>
      ) : (
        <Text
          type={numberUnread > 0 ? "primary" : "tertiary"}
          style={{ width: classify ? 160 : 170 }}
          ellipsis={{ showTooltip: false }}
          strong={numberUnread > 0}
        >
          {renderMessage()}
        </Text>
      )}
    </>
  );
};

export default ShortMessage;
