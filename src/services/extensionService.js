import { createSlice } from '@reduxjs/toolkit';
import { fetchExtension } from '../apis/extension';

const extensionSlice = createSlice({
  name: 'extension',
  initialState: {
    loading: false,
    loaded: false,
    extensionList: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExtension.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchExtension.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.extensionList = action.payload.data;
      })
      .addCase(fetchExtension.rejected, (state, action) => {
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
