import { createSlice } from '@reduxjs/toolkit';
import { fetchLanding } from '../apis/landing';
const initialState = {
  loading: false,
  landingList: [],
  loaded: false,
  error: null,
  pageCount: 0,
  landingNumber: 0,
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
        state.landingList = action.payload.data;
        state.pageCount = action.payload.pageCount;
        state.landingNumber = action.payload.landingNumber;
      })
      .addCase(fetchLanding.rejected, (state, action) => {
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
