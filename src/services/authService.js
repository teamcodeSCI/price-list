import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, user } from '../apis/auth';

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
        state.loaded = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
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
          state.user = action.payload.data;
        }
      })
      .addCase(user.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(user.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.data;
        state.loaded = true;
      })
      .addCase(user.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.loaded = false;
        state.error = null;
        state.token = '';
      });
  },
});

export default authSlice.reducer;

export const authUserSelector = (state) => state.auth.user;
export const authLoadingSelector = (state) => state.auth.loading;
export const authLoadedSelector = (state) => state.auth.loaded;
export const authErrorSelector = (state) => state.auth.error;
export const authTokenSelector = (state) => state.auth.token;
