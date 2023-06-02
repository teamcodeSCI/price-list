import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../utils/const';

export const fetchBrand = createAsyncThunk('brand/fetchBrand', async () => {
  const response = await fetch(`${API_URL}/brand`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return await response.json();
});
