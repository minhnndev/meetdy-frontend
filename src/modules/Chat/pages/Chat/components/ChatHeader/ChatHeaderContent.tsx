import { LIMITED_WIDTH } from "@/constants/chat.constant";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { ConversationAvatar } from "@/modules/Chat/components";
import {
  fetchListMessages,
  getLastViewOfMembers,
  setCurrentChannel,
} from "@/redux/slice/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import dateUtils from "@/utils/dateUtils";
import {
  IconHash,
  IconInfoCircle,
  IconUndo,
  IconUserAdd,
  IconUserStroked,
} from "@douyinfe/semi-icons";
import { Button, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";
import AddMemberModal from "../AddMemberModal";

const ChatHeaderContent = ({
  conversationDetail,
  totalMembers,
  onOpenInfo,
  onOpenSidesheetInfo,
}) => {
  const dispatch = useAppDispatch();
  const { name, type, isOnline, lastLogin } = conversationDetail || {};
  const { currentChannel, channels, currentConversation } = useAppSelector(
    (state) => state.chat
  );
  const { Text, Title, Paragraph } = Typography;
  const { width } = useWindowDimensions();
  const [openModal, setOpenModal] = useState(false);

  const handleViewGeneralChannel = () => {
    dispatch(setCurrentChannel(""));
    dispatch(
      fetchListMessages({ conversationId: currentConversation, size: 10 })
    );
    dispatch(getLastViewOfMembers(currentConversation));
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ConversationAvatar
          conversation={conversationDetail}
          totalMembers={totalMembers}
        />
        <div style={{ paddingLeft: "0.75rem" }}>
          <Title
            heading={5}
            style={{ width: 300 }}
            ellipsis={{ showTooltip: false }}
          >
            {name}
          </Title>
          {currentChannel ? (
            <div
              style={{ display: "flex", alignItems: "flex-end", marginTop: 2 }}
            >
              <IconHash style={{ marginBottom: 3, color: "#0068ff" }} />
              <Text strong style={{ fontSize: 14, color: "#0068ff" }}>
                &nbsp;
                {channels?.find((ele) => ele._id === currentChannel)?.name}
              </Text>
            </div>
          ) : type ? (
            <div
              style={{ display: "flex", alignItems: "flex-end", marginTop: 2 }}
            >
              <IconUserStroked style={{ marginBottom: 3 }} />
              <Text>
                &nbsp;{totalMembers}
                &nbsp;thành viên
              </Text>
            </div>
          ) : (
            <>
              {isOnline ? (
                <Paragraph type="tertiary">Đang hoạt động</Paragraph>
              ) : (
                lastLogin && (
                  <Paragraph type="tertiary">
                    Truy cập {dateUtils.toTime(lastLogin)} trước
                  </Paragraph>
                )
              )}
            </>
          )}
        </div>
      </div>

      <div>
        {currentChannel ? (
          <Button
            theme="borderless"
            type="tertiary"
            icon={<IconUndo size="large" />}
            onClick={handleViewGeneralChannel}
          />
        ) : (
          <Button
            theme="borderless"
            type="tertiary"
            icon={<IconUserAdd size="large" />}
            onClick={() => setOpenModal(true)}
          />
        )}
        <Button
          theme="borderless"
          type="tertiary"
          icon={<IconInfoCircle size="large" />}
          onClick={() =>
            width > LIMITED_WIDTH.MEDIUM ? onOpenInfo() : onOpenSidesheetInfo()
          }
        />
      </div>
      <AddMemberModal
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        conversationType={type}
      />
    </>
  );
};

export default ChatHeaderContent;
