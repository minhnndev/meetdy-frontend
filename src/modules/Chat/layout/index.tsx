import { useAppDispatch, useAppSelector } from "@/redux/store";
import { init, socket } from "@/utils/socketClient";
import ServiceConversation from "@/api/conversationApi";
import { setTabActive } from "@/redux/slice/globalSlice";
import { NavbarContainer } from "../container";
import "../style.css";
import {
  addMessage,
  addMessageInChannel,
  fetchAllSticker,
  fetchConversationById,
  fetchListClassify,
  fetchListColor,
  fetchListConversations,
  updateAvatarWhenUpdateMember,
  updateFriendChat,
} from "@/redux/slice/chat/chatSlice";
import {
  fetchFriends,
  fetchListGroup,
  fetchListMyRequestFriend,
  fetchListRequestFriend,
  setAmountNotify,
  setMyRequestFriend,
  setNewFriend,
  setNewRequestFriend,
  updateFriend,
  updateMyRequestFriend,
  updateRequestFriends,
} from "@/redux/slice/friendSlice";
import { fetchInfoWebs } from "@/redux/slice/homeSlice";
import useWindowUnloadEffect from "@/hooks/useWindowUnloadEffect";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";

init();

const ChatLayout = () => {
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.global);
  const { amountNotify } = useAppSelector((state) => state.friend);
  const [idNewMessage, setIdNewMessage] = useState("");
  const codeRevokeRef = useRef();

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchListRequestFriend());
    dispatch(fetchListMyRequestFriend());
    dispatch(fetchFriends({ name: "" }));
    dispatch(fetchListGroup({ name: "", type: 2 }));
    dispatch(fetchListClassify());
    dispatch(fetchListColor());
    dispatch(fetchListConversations({}));
    dispatch(fetchAllSticker());
    dispatch(setTabActive(1));
    dispatch(fetchInfoWebs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const userId = user._id;
    if (userId) socket.emit("join", userId);
  }, [user]);

  useEffect(() => {
    if (conversations.length === 0) return;

    const conversationIds = conversations?.map?.(
      (conversationEle) => conversationEle._id
    );
    socket.emit("join-conversations", conversationIds);
  }, [conversations]);

  useEffect(() => {
    socket.on("create-individual-conversation", (converId) => {
      socket.emit("join-conversation", converId);
      dispatch(fetchConversationById({ conversationId: converId }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on(
      "create-individual-conversation-when-was-friend",
      (conversationId: string) => {
        dispatch(fetchConversationById({ conversationId }));
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("new-message", (_conversationId, newMessage) => {
      dispatch(addMessage(newMessage));
      setIdNewMessage(newMessage._id);
    });

    socket.on("update-member", async (conversationId: string) => {
      const data = await ServiceConversation.getConversationById(
        conversationId
      );
      const { avatar, totalMembers } = data;
      dispatch(
        updateAvatarWhenUpdateMember({
          conversationId,
          avatar,
          totalMembers,
        })
      );
    });

    socket.on(
      "new-message-of-channel",
      (conversationId, channelId, message) => {
        dispatch(addMessageInChannel({ conversationId, channelId, message }));
        setIdNewMessage(message._id);
      }
    );

    socket.on("create-conversation", (conversationId) => {
      console.log("tạo nhóm", conversationId);
      dispatch(fetchConversationById({ conversationId }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useWindowUnloadEffect(async () => {
    async function leaveApp() {
      socket.emit("leave", user._id);
      await sleep(2000);
    }

    await leaveApp();
  }, true);

  useEffect(() => {
    socket.on("accept-friend", (value) => {
      dispatch(setNewFriend(value));
      dispatch(setMyRequestFriend(value._id));
    });

    socket.on("send-friend-invite", (value) => {
      dispatch(setNewRequestFriend(value));
      dispatch(setAmountNotify(amountNotify + 1));
    });

    // xóa lời mời kết bạn
    socket.on("deleted-friend-invite", (_id) => {
      dispatch(updateMyRequestFriend(_id));
    });

    //  xóa gởi lời mời kết bạn cho người khác
    socket.on("deleted-invite-was-send", (_id) => {
      dispatch(updateRequestFriends(_id));
    });

    // xóa kết bạn
    socket.on("deleted-friend", (_id) => {
      dispatch(updateFriend(_id));
      dispatch(updateFriendChat(_id));
    });
    // revokeToken

    socket.on("revoke-token", ({ key }) => {
      if (codeRevokeRef.current !== key) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.reload();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetCodeRevoke = (code) => {
    codeRevokeRef.current = code;
  };

  return (
    <div id="chat-page">
      <NavbarContainer onSaveCodeRevoke={handleSetCodeRevoke} />
      <Outlet context={{ socket, idNewMessage }} />
    </div>
  );
};

export { ChatLayout };
