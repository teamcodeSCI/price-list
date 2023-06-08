import { createSlice } from '@reduxjs/toolkit';
import { fetchBrand } from '../apis/brand';

const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    loading: false,
    brandList: [],
    loaded: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrand.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.brandList = action.payload.data;
      }).addCase(fetchBrand.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.error = action.payload;
      });;
  },
});
export default brandSlice.reducer;

export const brandSelector = (state) => state.brand.brandList;
export const brandLoadingSelector = (state) => state.brand.loading;
export const brandLoadedSelector = (state) => state.brand.loaded;
