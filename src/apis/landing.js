import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';

export const createLanding = createAsyncThunk(
  'landing/createLanding',
  async ({ body, token }) =>
    await http.post(`/landing/create`, JSON.stringify(body), { headers: { Authorization: token } })
);

export const fetchLanding = createAsyncThunk(
  'landing/fetchLanding',
  async ({ token, brandId, pageNum, filter }) =>
    await http.get(`/landing?brand_id=${brandId}&page=${pageNum}&perPage=${10}&link=${filter}`, {
      headers: {
        Authorization: token,
      },
    })
);
export const updateLanding = createAsyncThunk(
  'landing/updateLanding',
  async ({ id, body, token }) =>
    await http.put(`/landing/${id}`, JSON.stringify(body), { headers: { Authorization: token } })
);
export const deleteLanding = createAsyncThunk(
  'landing/deleteLanding',
  async ({ id, token }) => await http.delete(`/landing/${id}`, { headers: { Authorization: token } })
);
