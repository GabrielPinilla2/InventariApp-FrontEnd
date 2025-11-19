// src/services/measurementService.js
import api from '../axiosConfig';

//import axios from 'axios';
//const API_URL = 'http://localhost:8080/api/measurement';
//export const getMeasurements = () => axios.get(`${API_URL}`);
//export const getMeasurementById = (id) => axios.get(`${API_URL}/${id}`);
//export const createMeasurement = (measurement) => axios.post(API_URL, measurement);
//export const updateMeasurement = (id, measurement) => axios.put(`${API_URL}/${id}`, measurement);
//export const deleteMeasurement = (id) => axios.delete(`${API_URL}/${id}`);

const API_URL = '/measurement';
export const getMeasurements = () => api.get(`${API_URL}`);
export const getMeasurementById = (id) => api.get(`${API_URL}/${id}`);
export const createMeasurement = (measurement) => api.post(API_URL, measurement);
export const updateMeasurement = (id, measurement) => api.put(`${API_URL}/${id}`, measurement);
export const deleteMeasurement = (id) => api.delete(`${API_URL}/${id}`);