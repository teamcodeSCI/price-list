import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/const';

const initialState = {
  logged: false,
  loading: false,
  message: '',
  currentUser: {},
  status: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, actions) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, actions) => {
        state.loading = false;
        state.message = actions.payload.message;
        state.status = actions.payload.status;
      })
      .addCase(register.rejected, (state, actions) => {
        state.loading = false;
      })
      .addCase(getLogin.pending, (state, actions) => {
        state.logging = true;
      })
      .addCase(getLogin.fulfilled, (state, actions) => {
        state.logging = false;
        state.currentUser = actions.payload.data;
        state.logged = actions.payload.status;
        state.message = actions.payload;
      })
      .addCase(getLogin.rejected, (state, actions) => {
        state.logging = false;
        state.logged = false;
      })
      .addCase(getLogout.pending, (state, actions) => {
        state.logging = true;
      })
      .addCase(getLogout.fulfilled, (state, actions) => {
        state.logging = false;
        state.currentUser = null;
        state.message = '';
        state.logged = false;
      })
      .addCase(getLogout.rejected, (state, actions) => {
        state.logging = false;
      })
      .addCase(getUser.pending, (state, actions) => {
        state.logging = true;
      })
      .addCase(getUser.fulfilled, (state, actions) => {
        state.logging = false;
        state.currentUser = actions.payload.data;
        state.logged = true;
        state.message = '';
      })
      .addCase(getUser.rejected, (state, actions) => {
        state.logging = false;
      });
  },
});
export const register = createAsyncThunk('auth/register', async (info) => {
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
    body: JSON.stringify(info),
  });
  const data = await response.json();
  if (data.error) {
    return data.error;
  }
  localStorage.clear();
  return data;
});
export const getLogin = createAsyncThunk('auth/getLogin', async (info) => {
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
    body: JSON.stringify(info),
  });
  const data = await response.json();
  if (data.error) {
    return data.error;
  }
  localStorage.setItem('access_token', data.data.token);
  return data;
});
export const getLogout = createAsyncThunk('auth/getLogout', async () => {
  localStorage.clear();
});
export const getUser = createAsyncThunk('auth/getUser', async () => {
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (response.status === 500) {
    return { data: { brand: '' } };
  }
  return await response.json();
});
const authReducer = authSlice.reducer;
export default authReducer;

export const messageSelector = (state) => state.auth.message;
export const statusSelector = (state) => state.auth.status;
export const currentUserSelector = (state) => state.auth.currentUser;
export const loggedSelector = (state) => state.auth.logged;
export const loggingSelector = (state) => state.auth.logging;
