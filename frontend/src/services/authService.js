import { apiClient } from './api';
import { apiConfig } from '../config/apiConfig';
import { storage } from '../utils/storage';

export const authService = {
  /**
   * Register a new user (email + password based)
   */
  register: async ({ name, email, password, phone }) => {
    const result = await apiClient.post(apiConfig.endpoints.auth.register, {
      name,
      email,
      password,
      ...(phone ? { phone } : {}),
    });
    const { user, accessToken, refreshToken } = result.data;
    storage.set('token', accessToken);
    storage.set('refreshToken', refreshToken);
    storage.set('user', user);
    return user;
  },

  /**
   * Login with email + password
   */
  login: async ({ email, password }) => {
    const result = await apiClient.post(apiConfig.endpoints.auth.login, { email, password });
    const { user, accessToken, refreshToken } = result.data;
    storage.set('token', accessToken);
    storage.set('refreshToken', refreshToken);
    storage.set('user', user);
    return user;
  },

  /**
   * Logout — revoke refresh token on backend and clear local storage
   */
  logout: async () => {
    try {
      const refreshToken = storage.get('refreshToken', null);
      if (refreshToken) {
        await apiClient.post(apiConfig.endpoints.auth.logout, { refreshToken });
      }
    } catch (_) {
      // Ignore logout errors — clean up locally regardless
    } finally {
      storage.remove('token');
      storage.remove('refreshToken');
      storage.remove('user');
    }
  },

  getCurrentUser: () => {
    return storage.get('user', null);
  },

  isAuthenticated: () => {
    return Boolean(storage.get('token', null));
  },
};
