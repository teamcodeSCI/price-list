import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';

export const fetchPrice = createAsyncThunk('price/fetchPrice', async ({ token, landingId }) => {
  const response = await http.get(`/price?landing_id=${landingId}`, {
    headers: {
      Authorization: token,
    },
  });
  return response;
});
