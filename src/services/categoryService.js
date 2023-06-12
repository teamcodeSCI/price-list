import { createSlice } from '@reduxjs/toolkit';
import { fetchCategory } from '../apis/category';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    loading: false,
    categoryList: [],
    loaded: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoryList = action.payload.data;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.payload;
      });
  },
});
export default categorySlice.reducer;

export const categorySelector = (state) => state.category.categoryList;
export const categoryLoadingSelector = (state) => state.category.loading;
export const categoryLoadedSelector = (state) => state.category.loaded;
