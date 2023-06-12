import { createSlice } from '@reduxjs/toolkit';
import { createLanding, deleteLanding, fetchLanding, updateLanding } from '../apis/landing';
const initialState = {
  loading: false,
  loaded: false,
  landingList: [],
  landingNumber: 0,
  pageCount: 0,
  error: null,
};

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanding.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLanding.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.landingList = action.payload.data.data;
        state.landingNumber = action.payload.data.pagination.total;
        state.pageCount = action.payload.data.pagination.last_page;
      })
      .addCase(fetchLanding.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      })
      .addCase(createLanding.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createLanding.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.landingNumber += 1;
        state.landingList.unshift(action.payload.data.data);
      })
      .addCase(createLanding.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      })
      .addCase(updateLanding.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateLanding.fulfilled, (state, action) => {
        state.loading = false;
        state.landingList = state.landingList.map((item) =>
          item.id === action.payload.data.data.id ? action.payload.data.data : item
        );
      })
      .addCase(updateLanding.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      })
      .addCase(deleteLanding.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteLanding.fulfilled, (state, action) => {
        state.loading = false;
        state.landingList = state.landingList.filter((item) => item.id !== action.payload.data.data.id);
      })
      .addCase(deleteLanding.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      });
  },
});
export default landingSlice.reducer;

export const landingSelector = (state) => state.landing.landingList;
export const landingPageCountSelector = (state) => state.landing.pageCount;
export const landingNumberSelector = (state) => state.landing.landingNumber;
export const landingLoadingSelector = (state) => state.landing.loading;
export const landingLoadedSelector = (state) => state.landing.loaded;
export const landingErrorSelector = (state) => state.landing.error;
