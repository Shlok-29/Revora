import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('revora_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const isAuthAttempt = url.includes('/auth/login') || url.includes('/auth/signup');
    const hadToken = Boolean(localStorage.getItem('revora_token'));
    if (error.response?.status === 401 && hadToken && !isAuthAttempt) {
      localStorage.removeItem('revora_token');
      localStorage.removeItem('revora_user');
      window.dispatchEvent(new Event('revora:unauthorized'));
    }
    return Promise.reject(error);
  },
);

export const unwrap = (request) => request.then((response) => response.data);
