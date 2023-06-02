import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';

export const fetchBrand = createAsyncThunk('brand/fetchBrand', async () => http.get('/brand'));
