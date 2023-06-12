import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';

export const fetchPrice = createAsyncThunk('price/fetchPrice', async ({ token, landingId }) => {
  return await http.get(`/price?landing_id=${landingId}`, {
    headers: {
      Authorization: token,
    },
  });
});
export const createPrice = createAsyncThunk('price/createPrice', async ({ token, body }) => {
  return await http.post(`/price/create`, JSON.stringify(body), {
    headers: {
      Authorization: token,
    },
  });
});
