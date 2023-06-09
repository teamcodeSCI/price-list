import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../utils/const';
import http from './http';

export const fetchBrand = createAsyncThunk('brand/fetchBrand', async () => await http.get(`${API_URL}/brand`));
