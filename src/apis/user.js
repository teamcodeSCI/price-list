import http from './http';

export const userFn = (token) => http.get('/user', { headers: { Authorization: token } });
