import http from './http';

export const landingFn = (token, brandId) =>
  http.get(`/landing?brand_id=${brandId}`, { headers: { Authorization: token } });

export const createLandingFn = (body, token) =>
  http.post(`/landing/create`, JSON.stringify(body), { headers: { Authorization: token } });
