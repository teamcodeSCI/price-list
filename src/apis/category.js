import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (brandId) => await http.get(`/category?brand_id=${brandId}`)
);
