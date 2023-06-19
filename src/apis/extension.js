import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';

export const fetchExtension = createAsyncThunk('extension/fetchExtension', async ({ landingId, token }) => {
  const res = await http.get(`/extension?landing_id=${landingId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
});
