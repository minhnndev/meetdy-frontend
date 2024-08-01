/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import channelApi from "@/api/channelApi";
import ServiceClassify from "@/api/classifyApi";
import conversationApi from "@/api/conversationApi";
import friendApi from "@/api/friendApi";
import messageApi from "@/api/messageApi";
import pinMessageApi from "@/api/pinMessageApi";
import stickerApi from "@/api/stickerApi";
import voteApi from "@/api/voteApi";

import dateUtils from "@/utils/dateUtils";

const KEY = "chat";

// Classify
export const fetchListColor = createAsyncThunk(
  `${KEY}/fetchListColor`,
  async () => {
    const colors = await ServiceClassify.getColors();
    return colors;
  }
);

export const fetchListClassify = createAsyncThunk(
  `${KEY}/fetchListClassify`,
  async () => {
    const classifies = await ServiceClassify.getClassifies();
    return classifies;
  }
);

export type FetchConverstionsParams = {
  name?: string;
  type?: number;
};

export type AvatarType = {
  avatar: string;
  avatarColor: string;
}

export type Conversation = {
  avatar: string | AvatarType[];
  avatarColor: string;
  friendStatus: string;
  isJoinFromLink: boolean;
  isNotify: boolean;
  lastMessage: LastMessage;
  managerIds: any[];
  name: string;
  numberUnread: number;
  totalMembers: number;
  type: boolean;
  userId: string;
  leaderId: string;
  _id: string;
  isOnline: boolean;
  lastLogin: string;
}

export type LastMessage = {
  content: string;
  conversationId: string;
  createdAt: string;
  reacts: any;
  replyMessage: object;
  type: string;
  user: any;
  _id: string;
}

export type ResponseConversations = {
  type?: number;
  conversations?: Conversation[];
}

export const fetchListConversations = createAsyncThunk(
  `${KEY}/fetchListConversations`,
  async (params: FetchConverstionsParams): Promise<ResponseConversations> => {
    const { name, type } = params;
    const conversations = await conversationApi.getListConversations(
      name,
      type
    );

    if (type) {
      return { 
        type: type, 
        conversations: conversations.data as unknown as Conversation[] 
      };
    }

    return {
      conversations: conversations.data as unknown as Conversation[] 
    };
  }
);

export const fetchListMessages = createAsyncThunk(
  `${KEY}/fetchListMessages`,
  async (params: any) => {
    const { conversationId, page, size } = params;

    const messages = await messageApi.fetchListMessages(
      conversationId,
      page,
      size
    );

    return {
      messages,
      conversationId,
    };
  }
);

export const fetchNextPageMessage = createAsyncThunk(
  `${KEY}/fetchNextPageMessage`,
  async (params: any) => {
    const { conversationId, page, size } = params;

    const messages = await messageApi.fetchListMessages(
      conversationId,
      page,
      size
    );

    return {
      messages,
    };
  }
);

export const fetchNextPageMessageOfChannel = createAsyncThunk(
  `${KEY}/fetchNextPageMessageOfChannel`,
  async (params: any) => {
    const { page, size, channelId } = params;

    const messages = await channelApi.getMessageInChannel(
      channelId,
      page,
      size
    );
    return messages;
  }
);

// FRIEND API

export type Friend = {
  avatar: string,
  avatarColor: string,
  name: string,
  username: string,
  _id: string,
};

export type FetchListFriendsParams = {
  name: string;
}

export const fetchListFriends = createAsyncThunk(
  `${KEY}/fetchListFriends`,
  async (params: FetchListFriendsParams): Promise<Friend[]> => {
    const { name } = params;
    const friends = await friendApi.fetchFriends(name);
    return friends.data;
  }
);

// CONVERSATION API

// Create a group chat
export const createGroup = createAsyncThunk(
  `${KEY}/createGroup`,
  async (params: any) => {
    const { name, userIds } = params;
    const idNewGroup = await conversationApi.createGroup(name, userIds);
    return idNewGroup;
  }
);

export const fetchConversationById = createAsyncThunk(
  `${KEY}/fetchConversationById`,
  async (params: any) => {
    const { conversationId } = params;
    const conversation = await conversationApi.getConversationById(
      conversationId
    );

    return conversation;
  }
);

export const deleteConversation = createAsyncThunk(
  `${KEY}/deleteConversation/`,
  async (params: any) => {
    const { conversationId } = params;
    await conversationApi.deleteConversation(conversationId);
    return conversationId;
  }
);

export const getMembersConversation = createAsyncThunk(
  `${KEY}/getMembersConversation`,
  async (params: any) => {
    const { conversationId } = params;
    const members = await conversationApi.getMemberInConversation(
      conversationId
    );
    return members;
  }
);

// ============ PIN MESSAGE ==============

export const fetchPinMessages = createAsyncThunk(
  `${KEY}/fetchPinMessages`,
  async (params: any) => {
    const { conversationId } = params;
    const pinMessages = await pinMessageApi.getPinMessages(conversationId);
    return pinMessages;
  }
);

// ============

// ============
export const getLastViewOfMembers = createAsyncThunk(
  `${KEY}/getLastViewOfMembers`,
  async (params: any, _) => {
    const { conversationId } = params;
    const lastViews = await conversationApi.getLastViewOfMembers(
      conversationId
    );

    return lastViews;
  }
);

// =============== Channel ===============

export const fetchChannels = createAsyncThunk(
  `${KEY}/fetchChannels`,
  async (params: any) => {
    const { conversationId } = params;
    const data = await channelApi.fetchChannel(conversationId);
    return data;
  }
);

export const fetchMessageInChannel = createAsyncThunk(
  `${KEY}/fetchMessageInChannel`,
  async (params: any) => {
    const { channelId, page, size } = params;
    const data = await channelApi.getMessageInChannel(channelId, page, size);

    return {
      messages: data,
      channelId,
    };
  }
);

export const getLastViewChannel = createAsyncThunk(
  `${KEY}/getLastViewChannel`,
  async (params: any) => {
    const { channelId } = params;
    const lastViews = await channelApi.getLastViewChannel(channelId);

    return lastViews;
  }
);

export const fetchAllSticker = createAsyncThunk(
  `${KEY}/fetchAllSticker`,
  async () => {
    const data = await stickerApi.getAllSticker();
    return data;
  }
);

export const fetchVotes = createAsyncThunk(
  `${KEY}/fetchVotes`,
  async (params: any) => {
    const { conversationId, page, size } = params;
    const data = await voteApi.getVotes(conversationId, page, size);
    return data;
  }
);

export type ChatStateType = {
  isConversationLoading: boolean; 
  isLoading: boolean;
  conversations: Conversation[] | null;
  singleConversations: Conversation[] | null;
  groupConversations: Conversation[] | null;
  currentConversation: Conversation;
  messages: any[];
  friends: Friend[];
  memberInConversation: any[];
  type: boolean;
  currentPage: string | number;
  totalPages: string;
  toTalUnread: number;
  classifies: any[];
  colors: any[];
  pinMessages: any[];
  lastViewOfMember: any[];
  currentChannel: string;
  channels: any[];
  totalChannelNotify: number;
  stickers: any[];
  votes: any[];
  totalPagesVote: number;
};

const initialState: ChatStateType = {
  isConversationLoading: false,
  isLoading: false,
  conversations: null,
  currentConversation: null,
  messages: [],
  friends: [],
  memberInConversation: [],
  type: false,
  currentPage: "",
  totalPages: "",
  toTalUnread: 0,
  classifies: [],
  colors: [],
  pinMessages: [],
  lastViewOfMember: [],
  currentChannel: "",
  channels: [],
  totalChannelNotify: 0,
  stickers: [],
  votes: [],
  totalPagesVote: 0,
  singleConversations: null,
  groupConversations: null
};

const chatSlice = createSlice({
  name: KEY,
  initialState: initialState,
  reducers: {
    addMessage: (state, action) => {
      const newMessage = action.payload;

      const { conversationId } = newMessage;
      // tìm conversation
      const index = state.conversations.findIndex(
        (conversationEle) => conversationEle._id === conversationId
      );

      const seachConversation = state.conversations[index];

      seachConversation.numberUnread = seachConversation.numberUnread + 1;
      seachConversation.lastMessage = {
        ...newMessage,
        createdAt: dateUtils.toTime(newMessage.createdAt),
      };
      // xóa conversation đó ra
      const conversationTempt = state.conversations.filter(
        (conversationEle) => conversationEle._id !== conversationId
      );

      if (
        conversationId === state.currentConversation &&
        !state.currentChannel
      ) {
        state.messages.push(action.payload);
        seachConversation.numberUnread = 0;
      }

      state.conversations = [seachConversation, ...conversationTempt];
    },

    addMessageInChannel: (state, action) => {
      const { conversationId, channelId, message } = action.payload;

      const index = state.channels.findIndex(
        (channel) => channel._id === channelId
      );

      const searchChannel = state.channels[index];

      const channelTemps = state.channels.filter(
        (channel) => channel._id !== channelId
      );
      if ("numberUnread" in searchChannel) {
        searchChannel.numberUnread = searchChannel.numberUnread + 1;
      } else {
        searchChannel.numberUnread = 1;
      }

      if (
        state.currentConversation === conversationId &&
        state.currentChannel === channelId
      ) {
        state.messages.push(message);
        searchChannel.numberUnread = 0;
      }

      state.channels = [searchChannel, ...channelTemps];
    },

    setTotalChannelNotify: (state, action) => {
      let notify = state.currentConversation.numberUnread;

      if (state.channels.length > 0) {
        state.channels.forEach((ele) => {
          if (ele.numberUnread && ele.numberUnread > 0) {
            notify = notify + 1;
          }
        });
      }

      state.totalChannelNotify = notify;
    },
    setRaisePage: (state, action) => {
      if (Number(state.currentPage) < Number(state.totalPages) - 1) {
        state.currentPage = Number(state.currentPage) + 1;
      }
    },

    setFriends: (state, action) => {
      state.friends = action.payload;
    },

    removeConversation: (state, action) => {
      const conversationId = action.payload;
      const newConversations = state.conversations.filter(
        (ele) => ele._id !== conversationId
      );
      state.conversations = newConversations;
      state.currentConversation = null;
    },

    setTypeOfConversation: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(
        (ele) => ele._id === conversationId
      );
      if (conversation) {
        state.type = conversation.type;
      }
    },

    setRedoMessage: (state, action) => {
      const { id, conversationId } = action.payload;
      // lấy mesage đã thu hồi
      const oldMessage = state.messages.find((message) => message._id === id);
      const { _id, user, createdAt } = oldMessage;

      // lấy index của message
      const index = state.messages.findIndex((message) => message._id === id);

      // tạo message mới
      const newMessage = {
        _id,
        user,
        createdAt,
        isDeleted: "true",
      };
      // chèn vào vị trí index 'message đã thu hồi'
      state.messages[index] = newMessage;

      // lastMessage ở conver
      if (conversationId) {
        const indexConver = state.conversations.findIndex(
          (ele) => ele._id === conversationId
        );
        state.conversations[indexConver].lastMessage.isDeleted = true;
      }
    },
    deleteMessageClient: (state, action) => {
      const id = action.payload;
      const newMessages = state.messages.filter(
        (message) => message._id !== id
      );
      state.messages = newMessages;
    },

    setToTalUnread: (state, action) => {
      let tempCount = 0;
      state.conversations.forEach((ele, index) => {
        if (ele.numberUnread > 0) tempCount += 1;
      });
      state.toTalUnread = tempCount;
    },
    setReactionMessage: (state, action) => {
      const { messageId, user, type } = action.payload;

      const index = state.messages.findIndex(
        (message) => message._id === messageId
      );
      const currentMessage = state.messages.find(
        (message) => message._id === messageId
      );

      const checkIsExist = currentMessage.reacts.findIndex(
        (ele) => ele.user._id === user._id
      );
      //  có 2 trường hợp

      //  người dùng thả 1 react mới
      if (checkIsExist >= 0) {
        state.messages[index].reacts[checkIsExist] = {
          ...state.messages[index].reacts[checkIsExist],
          type,
        };
      } else {
        const reacts = [...currentMessage.reacts, { user, type }];
        state.messages[index].reacts = reacts;
      }
    },
    leaveGroup: (state, action) => {
      const conversationId = action.payload;
      const newConvers = state.conversations.filter(
        (ele) => ele._id !== conversationId
      );
      state.conversations = newConvers;
      state.currentConversation = null;
    },
    isDeletedFromGroup: (state, action) => {
      const idConver = action.payload;
      const newConver = state.conversations.filter(
        (ele) => ele._id !== idConver
      );
      state.conversations = newConver;
    },
    setCurrentConversation: (state, action: PayloadAction<String>) => {
      const conversationId = action.payload;
      state.currentConversation = state.conversations.find((conver) => conver._id === conversationId);
      console.log("🚀 ~ state.currentConversation:", state.currentConversation)
    },
    updateClassifyToConver: (state, action) => {
      state.conversations = action.payload;
    },
    setConversations: (state, action) => {
      const conversation = action.payload;
      state.conversations = [conversation, ...state.conversations];
    },
    setNumberUnreadForNewFriend: (state, action) => {
      const id = action.payload;
      const index = state.conversations.findIndex((ele) => ele._id === id);
      const numberUnread = state.conversations[index].numberUnread + 1;
      state.conversations[index] = {
        ...state.conversations[index],
        numberUnread,
      };
    },
    updateTimeForConver: (state, action) => {
      const { isOnline, id, lastLogin } = action.payload;
      const index = state.conversations.findIndex((ele) => ele._id === id);
      const newConver = {
        ...state.conversations[index],
        isOnline,
        lastLogin,
      };
      state.conversations[index] = newConver;
    },
    updateNameOfConver: (state, action) => {
      const { conversationId, conversationName } = action.payload;

      const index = state.conversations.findIndex(
        (ele) => ele._id === conversationId
      );

      state.conversations[index] = {
        ...state.conversations[index],
        name: conversationName,
      };
    },

    updateLastViewOfMembers: (state, action) => {
      const { conversationId, userId, lastView, channelId } = action.payload;

      if (channelId) {
        if (state.currentChannel === channelId) {
          const index = state.lastViewOfMember.findIndex(
            (ele) => ele.user._id === userId
          );
          state.lastViewOfMember[index].lastView = lastView;
        }
      } else {
        if (
          conversationId === state.currentConversation &&
          !state.currentChannel
        ) {
          const index = state.lastViewOfMember.findIndex(
            (ele) => ele.user._id === userId
          );
          state.lastViewOfMember[index].lastView = lastView;
        }
      }
    },
    updateChannel: (state, action) => {
      const { _id, name, createdAt } = action.payload;
      state.channels = [{ _id, name, createdAt }, ...state.channels];
    },

    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    removeChannel: (state, action) => {
      const { channelId } = action.payload;
      const newChannels = state.channels.filter((ele) => ele._id !== channelId);
      state.channels = newChannels;
    },
    updateNameChannel: (state, action) => {
      const { name, channelId } = action.payload;

      const index = state.channels.findIndex((ele) => ele._id === channelId);
      state.channels[index] = { ...state.channels[index], name };
    },
    updateAvavarConver: (state, action) => {
      const { conversationId, conversationAvatar } = action.payload;
      const index = state.conversations.findIndex(
        (ele) => ele._id === conversationId
      );
      state.conversations[index] = {
        ...state.conversations[index],
        avatar: conversationAvatar,
      };
    },
    updateVoteMessage: (state, action) => {
      const { voteMessage } = action.payload;
      const index = state.messages.findIndex(
        (ele) => ele._id === voteMessage._id
      );

      if (index > -1) {
        state.messages[index] = voteMessage;
      }
    },
    updateFriendChat: (state, action) => {
      const id = action.payload;
      state.friends = state.friends.filter((ele) => ele._id !== id);
    },

    deletedMember: (state, action) => {
      const { conversationId } = action.payload;
      const index = state.conversations.findIndex(
        (ele) => ele._id === conversationId
      );
      if (index > -1) {
        state.conversations[index].totalMembers =
          state.conversations[index].totalMembers - 1;
      }
    },

    addManagers: (state, action) => {
      const { conversationId, managerIds } = action.payload;
      if (conversationId === state.currentConversation) {
        const index = state.conversations.findIndex(
          (ele) => ele._id === conversationId
        );

        const tempManagerIds =
          state.conversations[index].managerIds.concat(managerIds);
        if (index > -1) {
          state.conversations[index] = {
            ...state.conversations[index],
            managerIds: tempManagerIds,
          };
        }
      }
    },

    deleteManager: (state, action) => {
      const { conversationId, managerIds } = action.payload;
      if (conversationId === state.currentConversation) {
        const index = state.conversations.findIndex(
          (ele) => ele._id === conversationId
        );

        const tempManagerIds = state.conversations[index].managerIds.filter(
          (ele) => ele !== managerIds[0]
        );
        if (index > -1) {
          state.conversations[index] = {
            ...state.conversations[index],
            managerIds: tempManagerIds,
          };
        }
      }
    },

    updateVote: (state, action) => {
      state.votes = action.payload;
    },
    updateMemberInconver: (state, action) => {
      const { conversationId, newMember } = action.payload;
      state.memberInConversation = newMember;
      const index = state.conversations.findIndex(
        (ele) => ele._id === conversationId
      );
      if (index > -1) {
        state.conversations[index].totalMembers = newMember.length;
      }
    },

    updateAvatarWhenUpdateMember: (state, action) => {
      const { conversationId, avatar, totalMembers } = action.payload;

      const index = state.conversations.findIndex(
        (ele) => ele._id === conversationId
      );

      state.conversations[index].totalMembers = totalMembers;
      if (index > -1 && typeof state.conversations[index].avatar === "object") {
        state.conversations[index].avatar = avatar;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListConversations.pending, (state) => {
        state.isConversationLoading = true;
      })
      .addCase(fetchListConversations.fulfilled, (state, action: PayloadAction<ResponseConversations | null>) => {
        state.isConversationLoading = false;

        const type = action.payload.type;
        if (type != null) {
          if (type === 1) {
            state.singleConversations = action.payload.conversations;
          } else {
            state.groupConversations = action.payload.conversations;
          }
        } else {
          state.conversations = action.payload.conversations;
        }
      })
      .addCase(fetchListMessages.pending, (state) => {
        state.isConversationLoading = false;
      })
      .addCase(fetchListMessages.fulfilled, (state, action) => {
        state.isLoading = false;

        const conversationId = action.payload.conversationId;
        const conversationIndex = state.conversations.findIndex(
          (conversationEle) => conversationEle._id === conversationId
        );

        state.conversations[conversationIndex] = {
          ...state.conversations[conversationIndex],
          numberUnread: 0,
        };

        state.currentConversation = state.conversations.find((conver) => conver._id === conversationId);
        state.messages = action.payload.messages.data;
        state.currentPage = action.payload.messages.page;
        state.totalPages = action.payload.messages.totalPages;
      })
      .addCase(fetchMessageInChannel.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchMessageInChannel.fulfilled, (state, action) => {
        state.isLoading = false;

        const { messages, channelId } = action.payload;
        const channelIndex = state.channels.findIndex(
          (channel) => channel._id === channelId
        );

        state.channels[channelIndex] = {
          ...state.channels[channelIndex],
          numberUnread: 0,
        };

        state.currentChannel = channelId;
        state.messages = messages.data;
        state.currentPage = messages.page;
        state.totalPages = messages.totalPages;
      })
      .addCase(fetchMessageInChannel.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchNextPageMessage.fulfilled, (state, action) => {
        state.messages = [...action.payload.messages.data, ...state.messages];
        state.currentPage = action.payload.messages.page;
      })
      .addCase(fetchNextPageMessageOfChannel.fulfilled, (state, action) => {
        state.messages = [...action.payload.data, ...state.messages];
        state.currentPage = action.payload.page;
      })
      // FRIEND
      .addCase(fetchListFriends.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchListFriends.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchListFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.isLoading = false;
      })
      // Conversation
      .addCase(fetchConversationById.fulfilled, (state, action) => {
        const conversations = action.payload;
        state.conversations = [conversations, ...state.conversations];
      })
      .addCase(getMembersConversation.fulfilled, (state, action) => {
        const tempMembers = [...action.payload.data];
        const temp = [];

        tempMembers.forEach((member) => {
          state.friends.forEach((friend) => {
            if (member._id === friend._id) {
              member = { ...member, isFriend: true };
              return;
            }
          });
          temp.push(member);
        });

        state.memberInConversation = temp;
      })
      // classify
      .addCase(fetchListClassify.fulfilled, (state, action) => {
        state.classifies = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchListClassify.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchListClassify.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchListColor.fulfilled, (state, action) => {
        state.colors = action.payload;
      })
      .addCase(fetchPinMessages.fulfilled, (state, action) => {
        state.pinMessages = action.payload.reverse();
      })
      .addCase(getLastViewOfMembers.fulfilled, (state, action) => {
        state.lastViewOfMember = action.payload;
      })
      .addCase(getLastViewChannel.fulfilled, (state, action) => {
        state.lastViewOfMember = action.payload;
      })
      // Channel
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.channels = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchChannels.pending, (state, action) => {
        state.isLoading = true;
      })
      // Sticker
      .addCase(fetchAllSticker.fulfilled, (state, action) => {
        state.stickers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllSticker.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSticker.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchVotes.fulfilled, (state, action) => {
        state.votes = action.payload.data;
        state.totalPagesVote = action.payload.totalPages;
      });
  },
});

const { reducer, actions } = chatSlice;
export const {
  addMessage,
  setFriends,
  removeConversation,
  setTypeOfConversation,
  setRaisePage,
  setRedoMessage,
  deleteMessageClient,
  setToTalUnread,
  setReactionMessage,
  // updateConversationWhenAddMember,
  leaveGroup,
  // updateMemberLeaveGroup,
  isDeletedFromGroup,
  setCurrentConversation,
  updateClassifyToConver,
  setConversations,
  setNumberUnreadForNewFriend,
  updateTimeForConver,
  updateNameOfConver,
  updateLastViewOfMembers,
  updateChannel,
  setCurrentChannel,
  addMessageInChannel,
  updateNameChannel,
  updateAvavarConver,
  removeChannel,
  setTotalChannelNotify,
  updateVoteMessage,
  updateFriendChat,
  deletedMember,
  updateVote,
  addManagers,
  deleteManager,
  updateMemberInconver,
  updateAvatarWhenUpdateMember,
} = actions;

export const isWaitingConversations = (state: any) => state.chat.isConversationLoading;
export const getChatStateValue = (state: any) => state.chat;

export default reducer;
