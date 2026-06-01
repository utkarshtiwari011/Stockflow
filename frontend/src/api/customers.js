import api from './axios';

export const customerAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/customers?skip=${skip}&limit=${limit}`),
  getById: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
  delete: (id) => api.delete(`/customers/${id}`)
};
