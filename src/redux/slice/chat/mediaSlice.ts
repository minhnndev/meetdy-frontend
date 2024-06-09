import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ServiceMedia from "@/api/mediaApi";
const KEY = "MEDIA";

export const fetchAllMedia = createAsyncThunk(
  `${KEY}/fetchAllMedia`,
  async (params) => {
    const { conversationId } = params;
    const media = await ServiceMedia.fetchAllMedia(conversationId);
    return media;
  }
);

export const fetchMediaByType = createAsyncThunk(
  `${KEY}/fetchMediaByType`,
  async () => {}
);

const mediaSlice = createSlice({
  name: KEY,
  initialState: {
    media: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [fetchAllMedia.fulfilled]: (state, action) => {
      state.media = action.payload;
    },
  },
});

const { reducer } = mediaSlice;

export default reducer;
