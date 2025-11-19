// src/services/userService.js
import api from '../axiosConfig';

//import axios from 'axios';
//const API_URL = 'http://localhost:8080/api/users';
//export const getUsers = () => axios.get(`${API_URL}`);
//export const getUserById = (id) => axios.get(`${API_URL}/${id}`);
//export const createUser = (user) => axios.post(API_URL, user);
//export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
//export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

const API_URL = '/users';
export const getUsers = () => api.get(`${API_URL}`);
export const getUserById = (id) => api.get(`${API_URL}/${id}`);
export const createUser = (user) => api.post(API_URL, user);
export const updateUser = (id, user) => api.put(`${API_URL}/${id}`, user);
export const deleteUser = (id) => api.delete(`${API_URL}/${id}`);