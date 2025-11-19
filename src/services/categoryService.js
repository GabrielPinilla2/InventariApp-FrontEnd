// src/services/categoryService.js
import api from '../axiosConfig';

//import axios from 'axios';
//const API_URL = 'http://localhost:8080/api/categories';
//export const getCategories = () => axios.get(`${API_URL}`);
//export const getCategoryById = (id) => axios.get(`${API_URL}/${id}`);
//export const getCategoryByName = (name) => axios.get(`${API_URL}/findByName/${name}`);
//export const createCategory = (category) => axios.post(API_URL, category);
//export const updateCategory = (id, category) => axios.put(`${API_URL}/${id}`, category);
//export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`);

const API_URL = '/categories';

export const getCategories = () => api.get(API_URL);
export const getCategoryById = (id) => api.get(`${API_URL}/${id}`);
export const getCategoryByName = (name) => api.get(`${API_URL}/findByName/${name}`);
export const createCategory = (category) => api.post(API_URL, category);
export const updateCategory = (id, category) => api.put(`${API_URL}/${id}`, category);
export const deleteCategory = (id) => api.delete(`${API_URL}/${id}`);
