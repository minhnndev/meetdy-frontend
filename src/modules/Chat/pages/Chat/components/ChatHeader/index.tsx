import React from "react";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import ChatHeaderContent from "./ChatHeaderContent";
import "./style.css";

const ChatHeader = ({ onOpenInfo, onOpenSidesheetInfo }) => {
  const [conversationDetail, setConversationDetail] = useState({});
  const { currentConversation, conversations, memberInConversation } =
    useAppSelector((state) => state.chat);

  useEffect(() => {
    if (currentConversation) {
      const conversation = conversations.find(
        (conver) => conver._id === currentConversation
      );
      if (conversation) {
        setConversationDetail(conversation);
      }
    }
  }, [currentConversation, conversations]);

  return (
    <div id="chat-header">
      <ChatHeaderContent
        conversationDetail={conversationDetail}
        totalMembers={memberInConversation.length}
        onOpenInfo={onOpenInfo}
        onOpenSidesheetInfo={onOpenSidesheetInfo}
      />
    </div>
  );
};

export { ChatHeader };
