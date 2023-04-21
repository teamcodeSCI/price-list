import { createSlice } from '@reduxjs/toolkit';
import { getBrand, getBrandById } from './brandApi';

const initialState = {
  loading: false,
  brands: [],
};
const brandSlice = createSlice({
  name: 'brand',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBrand.pending, (state, actions) => {
        state.loading = true;
      })
      .addCase(getBrand.fulfilled, (state, actions) => {
        state.loading = false;
        state.brands = actions.payload.data;
      })
      .addCase(getBrand.rejected, (state, actions) => {
        state.loading = false;
      });
  },
});
const authReducer = brandSlice.reducer;
export default authReducer;
export const loadingSelector = (state) => state.brand.loading;
export const brandsSelector = (state) => state.brand.brands;
