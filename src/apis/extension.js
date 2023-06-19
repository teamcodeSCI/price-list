import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';

export const fetchExtension = createAsyncThunk(
  'extension/fetchExtension',
  async ({ landingId, token }) =>
    await http.get(`/extension?landing_id=${landingId}`, {
      headers: { Authorization: token },
    })
);
export const createExtension = createAsyncThunk(
  'extension/createExtension',
  async ({ body, token }) =>
    await http.post(`/extension/create`, JSON.stringify(body), { headers: { Authorization: token } })
);
export const updateExtension = createAsyncThunk(
  'extension/updateExtension',
  async ({ body, token, extensionId }) =>
    await http.put(`/extension/${extensionId}`, JSON.stringify(body), {
      headers: { Authorization: token },
    })
);
export const deleteExtension = createAsyncThunk(
  'extension/deleteExtension',
  async ({ token, extensionId }) =>
    await http.delete(`/extension/${extensionId}`, {
      headers: { Authorization: token },
    })
);
