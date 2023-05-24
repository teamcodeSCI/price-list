import http from './http';

export const landingFn = (token, brandId) =>
  http.get(`/landing?brand_id=${brandId}`, { headers: { Authorization: token } });
