import { Nav, Notification, SideSheet, Toast } from "@douyinfe/semi-ui";
import { SearchBar, SearchResultTabs } from "../../components";
import { useCallback, useEffect, useRef, useState } from "react";
import ServiceConversation from "@/api/conversationApi";
import "./style.css";
import {
  ChatHeader,
  ChatInfo,
  ClassifyChat,
  Welcome,
  JoinGroupModal,
} from "./components";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import {
  addManagers,
  addMessage,
  deleteManager,
  fetchConversationById,
  fetchListFriends,
  fetchListMessages,
  fetchPinMessages,
  getLastViewOfMembers,
  getMembersConversation,
  isDeletedFromGroup,
  removeChannel,
  removeConversation,
  setCurrentChannel,
  setCurrentConversation,
  setReactionMessage,
  setTotalChannelNotify,
  setTypeOfConversation,
  updateAvavarConver,
  updateChannel,
  updateLastViewOfMembers,
  updateMemberInconver,
  updateNameChannel,
  updateNameOfConver,
  updateTimeForConver,
  updateVoteMessage,
} from "@/redux/slice/chat/chatSlice";
import { LIMITED_WIDTH } from "@/constants/chat.constant";
import { setJoinChatLayout } from "@/redux/slice/globalSlice";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { socket } = useOutletContext<any>();
  const { currentConversation, conversations, currentChannel } = useAppSelector(
    (state) => state.chat
  );
  const { isJoinChatLayout, user } = useAppSelector((state) => state.global);

  const [individualSearch, setIndividualSearch] = useState([]);
  const [groupSearch, setGroupSearch] = useState([]);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [openInfo, setOpenInfo] = useState(true);
  const [openSidesheetInfo, setOpenSidesheetInfo] = useState(false);
  const [usersTyping, setUsersTyping] = useState([]);
  const [summaryGroup, setSummaryGroup] = useState({});
  const [showModalJoinGroup, setShowModalJoinGroup] = useState(false);

  const { width } = useWindowDimensions();
  const refConversations = useRef<any[]>();
  const refCurrentConversation = useRef<string>();
  const refCurrentChannel = useRef<string>();

  useEffect(() => {
    if (width > LIMITED_WIDTH.MEDIUM) {
      setOpenSidesheetInfo(false);
    }
  }, [width]);

  useEffect(() => {
    refCurrentConversation.current = currentConversation;
  }, [currentConversation]);

  useEffect(() => {
    refConversations.current = conversations;
  }, [conversations]);

  useEffect(() => {
    refCurrentChannel.current = currentChannel;
  }, [currentChannel]);

  useEffect(() => {
    setUsersTyping([]);
    // setReplyMessage(null);
    // setUserMention({});
  }, [currentConversation]);

  useEffect(() => {
    if (currentConversation) {
      dispatch(setTotalChannelNotify());
    }
  }, [currentConversation, conversations, dispatch]);

  useEffect(() => {
    const openModalJoinFromLink = async () => {
      if (location.state && location.state.conversationId) {
        const data = await ServiceConversation.getListConversations({});
        const tempId = location.state.conversationId;

        if (data.findIndex((ele) => ele._id === tempId) < 0) {
          try {
            const data = await ServiceConversation.getSummaryInfoGroup(tempId);
            setSummaryGroup(data);
            setShowModalJoinGroup(true);
          } catch (error) {
            Toast.warning({
              content:
                "Trưởng nhóm đã tắt tính năng tham gia nhóm bằng liên kết",
            });
          }
        } else {
          dispatch(fetchListMessages({ conversationId: tempId, size: 10 }));
          dispatch(getMembersConversation(tempId));
          dispatch(setTypeOfConversation(tempId));
          dispatch(getLastViewOfMembers(tempId));
        }
        navigate("/chat", {
          state: {
            conversationId: null,
          },
          replace: true,
        });
      }
    };
    openModalJoinFromLink();
  }, [dispatch, location.state, navigate]);

  useEffect(() => {
    dispatch(
      fetchListFriends({
        name: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      currentConversation &&
      conversations?.find((ele) => ele._id === currentConversation)?.type
    ) {
      dispatch(fetchPinMessages({ conversationId: currentConversation }));
    }
  }, [conversations, currentConversation, dispatch]);

  useEffect(() => {
    if (!isJoinChatLayout) {
      socket.on("delete-conversation", (conversationId) => {
        const conver = refConversations.current.find(
          (ele) => ele._id === conversationId
        );
        if (conver.leaderId !== user._id) {
          Notification.info({
            title: (
              <span>
                Nhóm <strong>{conver.name}</strong> đã giải tán
              </span>
            ),
          });
        }

        dispatch(removeConversation(conversationId));
      });

      // socket.on("delete-message", ({ conversationId, channelId, id }) => {
      //   handleDeleteMessage(conversationId, channelId, id);
      // });

      socket.on("added-group", (conversationId) => {
        dispatch(fetchConversationById({ conversationId }));
      });

      socket.on(
        "add-reaction",
        ({ conversationId, channelId, messageId, user, type }) => {
          if (
            refCurrentConversation.current === conversationId &&
            refCurrentChannel.current === channelId
          ) {
            dispatch(setReactionMessage({ messageId, user, type }));
          }

          if (!channelId && refCurrentConversation.current === conversationId) {
            dispatch(setReactionMessage({ messageId, user, type }));
          }
        }
      );

      socket.on("typing", (conversationId, user) => {
        if (conversationId === refCurrentConversation.current) {
          const index = usersTyping.findIndex((ele) => ele._id === user._id);

          if (usersTyping.length === 0 || index < 0) {
            setUsersTyping([...usersTyping, user]);
          }
        }
      });

      socket.on("not-typing", (conversationId, user) => {
        if (conversationId === refCurrentConversation.current) {
          const newUserTyping = usersTyping.filter(
            (ele) => ele._id !== user._id
          );

          setUsersTyping(newUserTyping);
        }
      });

      socket.on("deleted-group", (conversationId) => {
        const conversation = refConversations.current.find(
          (ele) => ele._id === conversationId
        );
        Notification.info({
          title: (
            <span>
              Bạn đã bị xóa khỏi nhóm <strong>{conversation.name}</strong>
            </span>
          ),
        });
        if (conversationId === refCurrentConversation.current) {
          dispatch(setCurrentConversation(""));
        }
        dispatch(isDeletedFromGroup(conversationId));
        socket.emit("leave-conversation", conversationId);
      });

      socket.on("action-pin-message", (conversationId) => {
        if (conversationId === refCurrentConversation.current) {
          dispatch(fetchPinMessages({ conversationId }));
        }
      });

      socket.on(
        "rename-conversation",
        (conversationId, conversationName, message) => {
          dispatch(updateNameOfConver({ conversationId, conversationName }));
          dispatch(addMessage(message));
        }
      );

      socket.on(
        "user-last-view",
        ({ conversationId, userId, lastView, channelId }) => {
          if (userId !== user._id) {
            dispatch(
              updateLastViewOfMembers({
                conversationId,
                userId,
                lastView,
                channelId,
              })
            );
          }
        }
      );

      socket.on("update-member", async (conversationId) => {
        if (conversationId === refCurrentConversation.current) {
          await dispatch(getLastViewOfMembers(conversationId));
          const newMember = await ServiceConversation.getMemberInConversation(
            refCurrentConversation.current
          );
          dispatch(updateMemberInconver({ conversationId, newMember }));
        }
      });

      socket.on("new-channel", ({ _id, name, conversationId, createdAt }) => {
        if (conversationId === refCurrentConversation.current) {
          dispatch(updateChannel({ _id, name, createdAt }));
        }
      });

      socket.on("delete-channel", async ({ conversationId, channelId }) => {
        const actionAfterDelete = async () => {
          await dispatch(setCurrentChannel(""));
          dispatch(
            fetchListMessages({
              conversationId: refCurrentConversation.current,
              size: 10,
            })
          );
          dispatch(getLastViewOfMembers(refCurrentConversation.current));
        };
        await actionAfterDelete();

        if (refCurrentConversation.current === conversationId) {
          dispatch(removeChannel({ channelId }));
        }
      });

      socket.on("update-channel", ({ _id, name, conversationId }) => {
        if (refCurrentConversation.current === conversationId) {
          dispatch(updateNameChannel({ channelId: _id, name }));
        }
      });

      socket.on(
        "update-avatar-conversation",
        (conversationId, conversationAvatar) => {
          if (refCurrentConversation.current === conversationId) {
            dispatch(
              updateAvavarConver({
                conversationId,
                conversationAvatar,
              })
            );
          }
        }
      );

      socket.on("update-vote-message", (conversationId, voteMessage) => {
        if (refCurrentConversation.current === conversationId) {
          dispatch(
            updateVoteMessage({
              voteMessage,
            })
          );
        }
      });

      socket.on("add-managers", ({ conversationId, managerIds }) => {
        dispatch(
          addManagers({
            conversationId,
            managerIds,
          })
        );
      });

      socket.on("delete-managers", ({ conversationId, managerIds }) => {
        dispatch(
          deleteManager({
            conversationId,
            managerIds,
          })
        );
      });
    }
    dispatch(setJoinChatLayout(true));
  }, [dispatch, isJoinChatLayout, socket, user._id, usersTyping]);

  const emitUserOnline = useCallback(
    (currentConversation: string) => {
      if (currentConversation) {
        const conver = conversations.find(
          (ele) => ele._id === currentConversation
        );
        if (!conver?.type) {
          const userId = conver?.userId;
          socket.emit("get-user-online", userId, ({ isOnline, lastLogin }) => {
            dispatch(
              updateTimeForConver({
                id: currentConversation,
                isOnline,
                lastLogin,
              })
            );
          });
        }
      }
    },
    [conversations, dispatch, socket]
  );

  useEffect(() => {
    emitUserOnline(currentConversation);
  }, [currentConversation, emitUserOnline]);

  useEffect(() => {
    const intervalCall = setInterval(() => {
      emitUserOnline(currentConversation);
    }, 180000);

    return () => {
      clearInterval(intervalCall);
    };
  }, [currentConversation, emitUserOnline]);

  const handleOnSearch = async (value: string) => {
    try {
      const individuals = await ServiceConversation.getListConversations({
        name: value,
        type: 1,
      });
      const groups = await ServiceConversation.getListConversations({
        name: value,
        type: 2,
      });
      setIndividualSearch(individuals);
      setGroupSearch(groups);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {Object.keys(summaryGroup).length > 0 && (
        <JoinGroupModal
          visible={showModalJoinGroup}
          onCancel={() => setShowModalJoinGroup(false)}
          groupInfo={summaryGroup}
        />
      )}
      <div style={{ display: "flex", flex: 1 }}>
        {width > LIMITED_WIDTH.SMALL && (
          <div id="chat-left-sidebar">
            <Nav style={{ width: 310 }}>
              <Nav.Header style={{ padding: "1rem 0 1rem 1rem" }}>
                <SearchBar
                  onSearch={handleOnSearch}
                  setShowFilter={setShowSearchFilter}
                />
              </Nav.Header>
              {showSearchFilter ? (
                <SearchResultTabs
                  individuals={individualSearch}
                  groups={groupSearch}
                />
              ) : (
                <ClassifyChat />
              )}
            </Nav>
          </div>
        )}

        <div style={{ flex: 1 }}>
          {currentConversation ? (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: `${
                    openInfo && width > LIMITED_WIDTH.MEDIUM
                      ? "calc(100% - 375px)"
                      : "100%"
                  }`,
                }}
              >
                <ChatHeader
                  onOpenInfo={() => setOpenInfo((prev) => !prev)}
                  onOpenSidesheetInfo={() => setOpenSidesheetInfo(true)}
                />
              </div>
              {openInfo && width > LIMITED_WIDTH.MEDIUM && (
                <div id="chat-right-sidebar">
                  <ChatInfo />
                </div>
              )}
              {openSidesheetInfo && width < LIMITED_WIDTH.MEDIUM && (
                <SideSheet
                  visible={openSidesheetInfo}
                  onCancel={() => setOpenSidesheetInfo(false)}
                  closable={false}
                >
                  <ChatInfo />
                </SideSheet>
              )}
            </div>
          ) : (
            <Welcome />
          )}
        </div>
      </div>
    </>
  );
};

export { Chat };
