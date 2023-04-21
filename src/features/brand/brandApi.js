import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/const';

export const getBrand = createAsyncThunk('brand/getBrand', async () => {
  const response = await fetch(`${API_URL}/brand`);
  const data = await response.json();
  return data;
});
