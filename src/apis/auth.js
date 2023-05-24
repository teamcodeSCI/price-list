import http from './http';

export const registerFn = (body) => http.post('/register', JSON.stringify(body));

export const loginFn = (body) => http.post('/login', JSON.stringify(body));
