import { createSlice } from '@reduxjs/toolkit';
import { createCategory, deleteCategory, fetchCategory, updateCategory } from '../apis/category';

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
        state.categoryList = action.payload.data.data;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.payload.error;
      })
      .addCase(createCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoryList.push(action.payload.data.data);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoryList = state.categoryList.map((item) =>
          item.id === action.payload.data.data.id ? action.payload.data.data : item
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoryList = state.categoryList.filter((item) => item.id !== action.payload.data.data.id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.error.message;
      });
  },
});
export default categorySlice.reducer;

export const categorySelector = (state) => state.category.categoryList;
export const categoryLoadingSelector = (state) => state.category.loading;
export const categoryLoadedSelector = (state) => state.category.loaded;
