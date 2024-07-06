import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ServiceMe from "@/api/meApi";

const KEY = "global";


interface GlobalState {
  isLoading: boolean;
  isJoinChatLayout: boolean;
  isJoinFriendLayout: boolean;
  tabActive: number;
}


const initialState: GlobalState = {
  isLoading: false,
  isJoinChatLayout: false,
  isJoinFriendLayout: false,
  tabActive: 0,
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
    setTabActive: (state, action: PayloadAction<number>) => {
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
