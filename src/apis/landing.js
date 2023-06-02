import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';
import { API_URL } from '../utils/const';

export const createLandingFn = (body, token) =>
  http.post(`/landing/create`, JSON.stringify(body), { headers: { Authorization: token } });

export const fetchLanding = createAsyncThunk('landing/fetchLanding', async (token, brandId) => {
  const response = await fetch(`${API_URL}/landing?brand_id=${brandId}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
  });
  return await response.json();
});
