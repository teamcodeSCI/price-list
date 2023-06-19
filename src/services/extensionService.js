import { createSlice } from '@reduxjs/toolkit';
import { createExtension, fetchExtension, updateExtension } from '../apis/extension';

const initialState = {
  loading: false,
  loaded: false,
  extensionList: [],
  error: null,
};
const extensionSlice = createSlice({
  name: 'extension',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExtension.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchExtension.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.extensionList = action.payload.data.data;
      })
      .addCase(fetchExtension.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      })
      .addCase(createExtension.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createExtension.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.extensionList.unshift(action.payload.data.data);
      })
      .addCase(createExtension.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      })
      .addCase(updateExtension.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateExtension.fulfilled, (state, action) => {
        state.loading = false;
        state.extensionList = state.extensionList.map((item) =>
          item.id === action.payload.data.data.id ? action.payload.data.data : item
        );
      })
      .addCase(updateExtension.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      });
  },
});
export default extensionSlice.reducer;
export const extensionSelector = (state) => state.extension.extensionList;
export const extensionLoadingSelector = (state) => state.extension.loading;
export const extensionLoadedSelector = (state) => state.extension.loaded;
export const extensionErrorSelector = (state) => state.extension.error;
