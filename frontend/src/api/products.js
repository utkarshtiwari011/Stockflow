import api from './axios';

export const productAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/products?skip=${skip}&limit=${limit}`),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};
