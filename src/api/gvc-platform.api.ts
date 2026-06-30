import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const gvcPlatformApi = axios.create({
  baseURL: BASE_URL,
});

gvcPlatformApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
