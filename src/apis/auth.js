import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../utils/const';
import http from './http';

export const register = createAsyncThunk('auth/register', async (body) => {
  try {
    const res = await http.post(`/register`, JSON.stringify(body));
    console.log('res: ', res);
    return res;
  } catch (e) {
    return e;
  }
});

export const login = createAsyncThunk('auth/login', async (body) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(body),
  });
  return await response.json();
});

export const user = createAsyncThunk('auth/user', async (token) => {
  const response = await http.get(`/user`, {
    headers: {
      Authorization: token,
    },
  });

  return response;
});
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.clear();
});
