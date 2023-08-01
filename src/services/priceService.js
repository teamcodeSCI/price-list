import { createSlice } from '@reduxjs/toolkit';
import { createPrice, deletePrice, fetchPrice, updatePrice } from '../apis/price';

const initialState = { loading: false, loaded: false, error: null, priceList: [] };
const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPrice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.priceList = action.payload.data.data;
      })
      .addCase(fetchPrice.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(createPrice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.priceList.push(action.payload.data.data);
      })
      .addCase(createPrice.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(updatePrice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.priceList = state.priceList.map((item) =>
          item.id === action.payload.data.data.id ? action.payload.data.data : item
        );
      })
      .addCase(updatePrice.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(deletePrice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.priceList = state.priceList.filter((item) => item.id !== action.payload.data.data.id);
      })
      .addCase(deletePrice.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      }),
});
export default priceSlice.reducer;

export const priceSelector = (state) => state.price.priceList;
export const priceLoadingSelector = (state) => state.price.loading;
export const priceLoadedSelector = (state) => state.price.loaded;
export const priceErrorSelector = (state) => state.price.error;
