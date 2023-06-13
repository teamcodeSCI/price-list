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
export const updatePrice = createAsyncThunk('price/updatePrice', async ({ token, body, priceId }) => {
  return await http.put(`/price/${priceId}`, JSON.stringify(body), {
    headers: {
      Authorization: token,
    },
  });
});
export const deletePrice = createAsyncThunk('price/deletePrice', async ({ token, priceId }) => {
  return await http.delete(`/price/${priceId}`, {
    headers: {
      Authorization: token,
    },
  });
});
