// src/services/categoryService.js
import api from '../axiosConfig';

const API_URL = '/customer';

export const getCustomers = () => api.get(API_URL);
export const getCustomerById = (id) => api.get(`${API_URL}/${id}`);
export const getCustomerByName = (name) => api.get(`${API_URL}/findByName/${name}`);
export const createCustomer = (customer) => api.post(API_URL, customer);
export const updateCustomer = (id, customer) => api.put(`${API_URL}/${id}`, customer);
export const deleteCustomer = (id) => api.delete(`${API_URL}/${id}`);
