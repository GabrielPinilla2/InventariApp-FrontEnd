// src/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:8080/api',
  baseURL: "https://inventariapp.onrender.com/api",
});

// ✅ Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // Token inválido o sin permisos
      alert('Sesión expirada o sin autorización. Vuelve a iniciar sesión.');
      localStorage.removeItem('token');

      // Redirigir al login
      window.location.href = '/';
    }

    // Puedes agregar más manejos: 404, 500, etc. si lo necesitas

    return Promise.reject(error); // Propagar el error para los .catch locales
  }
);

export default api;
