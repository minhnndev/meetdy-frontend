import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ServiceMe from "@/api/meApi";

const KEY = "global";


export type GlobalState = {
  isLoading: boolean;
  isJoinChatLayout: boolean;
  isJoinFriendLayout: boolean;
  tabActive: TabActive;
}

export enum TabActive {
  Chat = 0,
  Friend,
}


const initialState: GlobalState = {
  isLoading: false,
  isJoinChatLayout: false,
  isJoinFriendLayout: false,
  tabActive: TabActive.Chat,
};

const globalSlice = createSlice({
  name: KEY,
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setJoinChatLayout: (state, action: PayloadAction<boolean>) => {
      state.isJoinChatLayout = action.payload;
    },
    setJoinFriendLayout: (state, action: PayloadAction<boolean>) => {
      state.isJoinFriendLayout = action.payload;
    },
    setTabActive: (state, action: PayloadAction<TabActive>) => {
      state.tabActive = action.payload;
    },
  },
  // extraReducers: (builder) => {},
});

const { reducer, actions } = globalSlice;
export const {
  setLoading,
  setJoinChatLayout,
  setJoinFriendLayout,
  setTabActive,
} = actions;

export default reducer;
