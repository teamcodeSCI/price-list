import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../utils/const';

export const register = createAsyncThunk('auth/register', async (body) => {
  const response = await fetch(`${API_URL}/register`, {
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
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
  });
  console.log(await response.json());
  return await response.json();
});
