import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (brandId) => await http.get(`/category?brand_id=${brandId}`)
);
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (body) => await http.post(`/category/create`, JSON.stringify(body))
);
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ body, categoryId }) => await http.put(`/category/${categoryId}`, JSON.stringify(body))
);
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async ({ categoryId }) => await http.delete(`/category/${categoryId}`)
);
