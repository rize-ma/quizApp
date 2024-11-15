import axios from 'axios';

export const api = () => {
  const asiosInstane = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
  });

  asiosInstane.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return asiosInstane;
};
