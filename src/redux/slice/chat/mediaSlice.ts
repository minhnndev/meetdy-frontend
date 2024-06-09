import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ServiceMedia from "@/api/mediaApi";
import { get } from "react-hook-form";
const KEY = "MEDIA";

export const fetchAllMedia = createAsyncThunk(
  `${KEY}/fetchAllMedia`,
  async (params) => {
    const conversationId = get(params, "conversationId");
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMedia.fulfilled, (state, action) => {
        state.media = action.payload;
      })
      .addCase(fetchAllMedia.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMedia.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const { reducer } = mediaSlice;

export default reducer;
