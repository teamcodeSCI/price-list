import http from './http';

export const categoryFn = (brandId) => http.get(`/category?brand_id=${brandId}`);
