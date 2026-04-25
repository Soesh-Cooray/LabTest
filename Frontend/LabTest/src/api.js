import axios from 'axios';

const fallbackBaseUrl = 'http://localhost:5000/api';
const rawBaseUrl = (import.meta.env.VITE_API_URL || fallbackBaseUrl).trim();

let normalizedBaseUrl = /^https?:\/\//i.test(rawBaseUrl)
    ? rawBaseUrl
    : `https://${rawBaseUrl}`;

// Avoid mixed-content errors when the app is served over HTTPS.
if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    normalizedBaseUrl.startsWith('http://') &&
    !normalizedBaseUrl.includes('localhost')
) {
    normalizedBaseUrl = normalizedBaseUrl.replace(/^http:\/\//i, 'https://');
}

normalizedBaseUrl = normalizedBaseUrl.replace(/\/+$/, '');

const API = axios.create({
        baseURL: normalizedBaseUrl,
});

export const getItems = () => API.get('/items');
export const createItem = (data) => API.post('/items/add', data);
export const deleteItem = (id) => API.delete(`/items/delete/${id}`);
export const updateItem = (id, data) => API.put(`/items/update/${id}`, data);