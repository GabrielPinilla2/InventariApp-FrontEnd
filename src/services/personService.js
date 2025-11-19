// src/services/personService.js
import api from '../axiosConfig';

//import axios from "axios";
//
//const API_URL = "http://localhost:8080/api/persons";
//
//export const getPersons = () => {
//  return axios.get(`${API_URL}`);
//};
//
//export const getPersonById = (id) => {
//  return axios.get(`${API_URL}/${id}`);
//};
//
//export const createPerson = (person) => {
//  return axios.post(API_URL, person);
//};
//
//export const updatePerson = (id, person) => {
//  return axios.put(`${API_URL}/${id}`, person);
//};
//
//export const deletePerson = (id) => {
//  return axios.delete(`${API_URL}/${id}`);
//};

const API_URL = "/persons";

export const getPersons = () => {
  return api.get(`${API_URL}`);
};

export const getPersonById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const getPersonByName = (name) => api.get(`${API_URL}/findByName/${name}`);

export const createPerson = (person) => {
  return api.post(API_URL, person);
};

export const updatePerson = (id, person) => {
  return api.put(`${API_URL}/${id}`, person);
};

export const deletePerson = (id) => {
  return api.delete(`${API_URL}/${id}`);
};