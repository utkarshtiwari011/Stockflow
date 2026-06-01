import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add timestamps
api.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally and parse FastAPI validation errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = 'An unexpected error occurred';

    if (error.response) {
      const data = error.response.data;
      
      // Parse FastAPI validation details
      if (data && data.detail) {
        if (typeof data.detail === 'string') {
          message = data.detail;
        } else if (Array.isArray(data.detail)) {
          // If FastAPI returns an array of validation errors
          message = data.detail
            .map((err) => {
              const field = err.loc ? err.loc.join(' -> ') : 'Field';
              return `${field}: ${err.msg}`;
            })
            .join(', ');
        }
      } else {
        message = data.message || message;
      }
    } else if (error.request) {
      message = 'Network error: Cannot reach the backend API server';
    } else {
      message = error.message;
    }

    // Trigger toast notification
    toast.error(message, { id: message }); // Use message as toast ID to prevent duplicates

    return Promise.reject(new Error(message));
  }
);

export default api;
