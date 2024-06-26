import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ServiceAuth from '@/api/loginApi'

const KEY = "account";

export type ResponseToken = {
  token?: string,
  refreshToken?: string,
}

type FetchTokenArgs = {
  username: string,
  password: string,
}

export const  fetchToken = createAsyncThunk(
  `${KEY}/fetchToken`,
  async (params: FetchTokenArgs): Promise<ResponseToken> => {
    const response = await ServiceAuth.login(params.username, params.password);
    return response as ResponseToken;
  }
);

const accountSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    errorMessage: '',
    tokens: {} as ResponseToken,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.tokens = action.payload;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
  },
});

const { reducer, actions } = accountSlice;
export const { setLoading } = actions;

export const getTokens = (state: any) => state.account.tokens;
export const getLoading = (state: any) => state.account.isLoading;

export default reducer;
