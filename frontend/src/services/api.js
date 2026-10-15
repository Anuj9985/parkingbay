import { apiConfig } from '../config/apiConfig';
import { storage } from '../utils/storage';

/**
 * Full-featured fetch client with:
 * - Auth token injection
 * - JSON parsing
 * - Consistent error extraction
 * - PUT, PATCH, DELETE support
 */
const buildHeaders = (extra = {}) => {
  const headers = { ...apiConfig.headers, ...extra };
  const token = storage.get('token', null);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({ message: 'Invalid JSON response' }));
  if (!response.ok) {
    const errorMessage = data?.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

export const apiClient = {
  get: async (endpoint, params = {}) => {
    const url = new URL(`${apiConfig.baseURL}${endpoint}`);
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        url.searchParams.append(key, val);
      }
    });
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: buildHeaders(),
    });
    return handleResponse(response);
  },

  post: async (endpoint, data = {}) => {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (endpoint, data = {}) => {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: buildHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  patch: async (endpoint, data = {}) => {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: buildHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: buildHeaders(),
    });
    return handleResponse(response);
  },
};
