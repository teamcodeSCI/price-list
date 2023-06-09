import { createAsyncThunk } from '@reduxjs/toolkit';
import http from './http';
import { removeAccents } from '../utils/help';

export const createLanding = createAsyncThunk('landing/createLanding', async ({ body, token }) => {
  const response = await http.post(`/landing/create`, JSON.stringify(body), { headers: { Authorization: token } });
  return response;
});

export const fetchLanding = createAsyncThunk('landing/fetchLanding', async ({ token, brandId, pageNum, filter }) => {
  const response = await http.get(`/landing?brand_id=${brandId}`, {
    headers: {
      Authorization: token,
    },
  });
  const paginationLimit = 10;
  const search = removeAccents(filter);

  const landing =
    search === ''
      ? response.data.data
      : response.data.data.filter((item) => removeAccents(item.url).search(search) !== -1);
  const pageCount = Math.ceil(landing.length / paginationLimit);
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;
  const renderData = [];
  landing.forEach((item, index) => {
    if (index >= prevRange && index < currRange) {
      renderData.push(item);
    }
  });

  return {
    status: response.data.status,
    message: response.data.message,
    data: renderData,
    pageCount: pageCount,
    landingNumber: landing.length,
  };
});
