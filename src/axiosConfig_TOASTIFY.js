// src/axiosConfig_TOASTIFY.js
import axios from 'axios';
import { toast } from 'react-toastify';

const apiTOAST = axios.create({
  baseURL: "https://inventariapp.jdav01.duckdns.org/api",
  //'http://localhost:8080/api',
});

// ✅ Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Interceptor para manejar errores globales con toast
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401 || status === 403) {
      toast.error('No autorizado o sesión expirada. Inicia sesión nuevamente.');
      localStorage.removeItem('token');
      window.location.href = '/';
    } else if (status === 404) {
      toast.warn('Recurso no encontrado.');
    } else if (status >= 500) {
      toast.error('Error interno del servidor. Intenta más tarde.');
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default apiTOAST;
