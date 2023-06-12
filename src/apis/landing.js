import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';

export const createLanding = createAsyncThunk('landing/createLanding', async ({ body, token }) => {
  const response = await http.post(`/landing/create`, JSON.stringify(body), { headers: { Authorization: token } });
  return response;
});

export const fetchLanding = createAsyncThunk('landing/fetchLanding', async ({ token, brandId, pageNum, filter }) => {
  const response = await http.get(`/landing?brand_id=${brandId}&page=${pageNum}&perPage=${10}&link=${filter}`, {
    headers: {
      Authorization: token,
    },
  });
  return response;
});
export const updateLanding = createAsyncThunk('landing/updateLanding', async ({ id, body, token }) => {
  const response = await http.put(`/landing/${id}`, JSON.stringify(body), { headers: { Authorization: token } });
  return response;
});
