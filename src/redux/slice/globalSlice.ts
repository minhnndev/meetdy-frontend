import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ServiceMe from "@/api/meApi";

const KEY = "global";

// export interface UserProfile {
//   avatar?: string;
//   isAdmin?: boolean;
// }

export type UserProfile = {
  name?: string,
  username?: string,
  dateOfBirth?: DateOfBirth,
  gender?: boolean,
  avatar?: string,
  avatarColor?: string,
  coverImage?: string,
  isAdmin?: boolean,
}

export type DateOfBirth = {
  day: number,
  month: number,
  year: number,
}

interface GlobalState {
  isLoading: boolean;
  isLogin: boolean;
  user: UserProfile | null;
  isJoinChatLayout: boolean;
  isJoinFriendLayout: boolean;
  tabActive: number;
}

export const fetchUserProfile = createAsyncThunk(
  `${KEY}/fetchUserProfile`,
  async (): Promise<UserProfile> => {
    const userProfile = await ServiceMe.fetchProfile();
    return userProfile as UserProfile;
  }
);

const initialState: GlobalState = {
  isLoading: false,
  isLogin: false,
  user: {} as UserProfile,
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
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
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
    setAvatarProfile: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
    removeProfile: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isLogin = false;
        localStorage.removeItem("token");
      });
  },
});

const { reducer, actions } = globalSlice;
export const {
  setLoading,
  setLogin,
  setJoinChatLayout,
  setJoinFriendLayout,
  setTabActive,
  setAvatarProfile,
  removeProfile,
} = actions;

export const getUserProfile = (state: any) => state.global.user;
export default reducer;
