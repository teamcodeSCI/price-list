import { createSlice } from '@reduxjs/toolkit';
import { login, register, user } from '../apis/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    loaded: false,
    error: null,
    token: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === false) {
          state.loaded = true;
          state.error = action.payload.message;
          state.user = null;
        } else {
          state.error = null;
          state.user = action.payload;
          state.loaded = true;
        }
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === false) {
          state.loaded = true;
          state.error = action.payload.message;
          state.token = null;
        } else {
          state.loaded = true;
          state.error = null;
          state.token = action.payload.data.token;
        }
      })
      .addCase(user.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(user.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === false) {
          state.loaded = true;
          state.error = action.payload.message;
          state.user = null;
        } else {
          state.loaded = true;
          state.error = null;
          state.user = action.payload;
        }
      });
  },
});

export default authSlice.reducer;

export const authUserSelector = (state) => state.auth.user;
export const authLoadingSelector = (state) => state.auth.loading;
export const authLoadedSelector = (state) => state.auth.loaded;
export const authErrorSelector = (state) => state.auth.error;
export const authTokenSelector = (state) => state.auth.token;
