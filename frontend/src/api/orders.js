import api from './axios';

export const orderAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/orders?skip=${skip}&limit=${limit}`),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  delete: (id) => api.delete(`/orders/${id}`)
};
