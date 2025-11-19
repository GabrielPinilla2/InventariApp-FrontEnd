// src/services/categoryService.js
import api from '../axiosConfig';

const API_URL = '/sellers';

export const getSellers = () => api.get(API_URL);
export const getSellerById = (id) => api.get(`${API_URL}/${id}`);
export const getSellerByName = (name) => api.get(`${API_URL}/findByName/${name}`);
export const createSeller = (seller) => api.post(API_URL, seller);
export const updateSeller = (id, seller) => api.put(`${API_URL}/${id}`, seller);
export const deleteSeller = (id) => api.delete(`${API_URL}/${id}`);