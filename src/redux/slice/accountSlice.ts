import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ServiceAuth from '@/api/loginApi'
import ServiceMe from '@/api/meApi';

const KEY = "account";

export type ResponseToken = {
  token?: string,
  refreshToken?: string,
}

type FetchTokenArgs = {
  username: string,
  password: string,
}

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

export const  fetchToken = createAsyncThunk(
  `${KEY}/fetchToken`,
  async (params: FetchTokenArgs): Promise<ResponseToken> => {
    const response = await ServiceAuth.login(params.username, params.password);
    return response.data as ResponseToken;
  }
);

export const fetchUserProfile = createAsyncThunk(
  `${KEY}/fetchUserProfile`,
  async (): Promise<UserProfile> => {
    const userProfile = await ServiceMe.fetchProfile();
    return userProfile.data as UserProfile;
  }
);

type AccountState = {
  isLogged: boolean,
  isLoading: boolean,
  errorMessage: string,
  tokens: ResponseToken | null,
  userProfile: UserProfile | null,
}

const initialState: AccountState = {
  isLogged: false,
  isLoading: false,
  errorMessage: '',
  tokens: null,
  userProfile: null,
}

const accountSlice = createSlice({
  name: KEY,
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAvatarProfile: (state, action: PayloadAction<string>) => {
      if (state.userProfile) {
        state.userProfile.avatar = action.payload;
      }
    },
    defaultAccount: (state) => {
      state.userProfile = null;
      state.tokens = null;
      state.errorMessage = '';
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.tokens = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isLogged = false;
        localStorage.removeItem("token");
      });
  },
});

const { reducer, actions } = accountSlice;
export const { 
  setLogged,
  setLoading,
  setAvatarProfile,
  defaultAccount,
} = actions;

export const getTokens = (state: any) => state.account.tokens;
export const getLoading = (state: any) => state.account.isLoading;
export const getUserProfile = (state: any) => state.account.userProfile;

export default reducer;
