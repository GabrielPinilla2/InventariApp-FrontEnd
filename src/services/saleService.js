import api from '../axiosConfig';

const API_URL = 'https://inventariapp.onrender.com/api/sales';

export const getSales = () => {
  return api.get(`${API_URL}`);
};

export const getSaleById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const createSale = async (sale) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sale)
  });
};

export const updateSale = async (id, sale) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sale)
  });
};

export const deleteSale = async (id) => {
  return fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
