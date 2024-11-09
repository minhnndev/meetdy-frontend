import React from "react";
import { ConversationAvatar } from "@/modules/Chat/components/common";
import { Nav, Typography } from "@douyinfe/semi-ui";
import ShortMessage from "../ShortMessage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchChannels,
  fetchListMessages,
  getLastViewOfMembers,
  getMembersConversation,
  setCurrentChannel,
  setTypeOfConversation,
} from "@/redux/slice/chat/chatSlice";
import { useEffect, useState } from "react";
import classifyUtils from "@/utils/classifyUtils";

const ConversationItem = ({ conversation }) => {
  const { Paragraph } = Typography;
  const { _id, name, totalMembers, lastMessage, numberUnread } = conversation;
  const dispatch = useAppDispatch();
  const [classify, setClassify] = useState(null);
  const { classifies } = useAppSelector((state) => state.chat);

  const onClickConversation = async () => {
    dispatch(setCurrentChannel(""));
    dispatch(getLastViewOfMembers(_id));
    dispatch(fetchListMessages({ conversationId: _id, size: 10 }));

    dispatch(getMembersConversation(_id));
    dispatch(setTypeOfConversation(_id));
    dispatch(fetchChannels(_id));
  };

  useEffect(() => {
    if (classifies.length > 0) {
      const temp = classifyUtils.getClassifyOfObject(_id, classifies);
      if (temp) {
        setClassify(temp);
      }
    }
  }, [conversation, classifies, _id]);

  return (
    <>
      {lastMessage && (
        <Nav.Item
          itemKey={_id}
          onClick={onClickConversation}
          icon={
            <ConversationAvatar
              conversation={conversation}
              totalMembers={totalMembers}
            />
          }
          text={
            <div
              className="flex-center"
              style={{ width: 215, justifyContent: "space-between" }}
            >
              <div
                style={{
                  margin: "4px 0",
                  padding: 0,
                }}
                onClick={() => {}}
              >
                <Paragraph
                  style={{ width: 170 }}
                  ellipsis={{ showTooltip: true }}
                  strong
                >
                  {name}
                </Paragraph>
                <ShortMessage
                  message={lastMessage}
                  type={conversation.type}
                  numberUnread={numberUnread}
                  classify={classify}
                />
              </div>
              <div style={{ marginLeft: -30 }}>
                <Paragraph type="tertiary" size="small">
                  {lastMessage?.createdAt}
                </Paragraph>
                {numberUnread > 0 && (
                  <Paragraph
                    type="tertiary"
                    size="small"
                    style={{
                      background: "red",
                      color: "white",
                      width: 16,
                      margin: "2px 0 0 auto",
                      textAlign: "center",
                      borderRadius: "50%",
                      padding: 2,
                    }}
                  >
                    {numberUnread}
                  </Paragraph>
                )}
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default ConversationItem;
