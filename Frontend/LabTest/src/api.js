import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const normalizedBaseUrl = /^https?:\/\//i.test(rawBaseUrl)
    ? rawBaseUrl
    : `http://${rawBaseUrl}`;

const API = axios.create({
        baseURL: normalizedBaseUrl,
});

export const getItems = () => API.get('/items');
export const createItem = (data) => API.post('/items/add', data);
export const deleteItem = (id) => API.delete(`/items/delete/${id}`);
export const updateItem = (id, data) => API.put(`/items/update/${id}`, data);