import { createSlice } from '@reduxjs/toolkit';
import { fetchPrice } from '../apis/price';

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
      }),
});
export default priceSlice.reducer;

export const priceSelector = (state) => state.price.priceList;
export const priceLoadingSelector = (state) => state.price.loading;
export const priceLoadedSelector = (state) => state.price.loaded;
export const priceErrorSelector = (state) => state.price.error;
