import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Products
export const getProducts = (params = {}) => api.get('/products', { params });
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
export const getCategories = () => api.get('/products/categories');

// Inquiries
export const submitInquiry = (data) => api.post('/inquiries', data);
export const subscribeNewsletter = (data) => api.post('/inquiries/newsletter', data);

// Health
export const getHealth = () => api.get('/health');

export default api;
