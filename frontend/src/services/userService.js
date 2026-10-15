import { apiClient } from './api';
import { apiConfig } from '../config/apiConfig';
import { storage } from '../utils/storage';

export const userService = {
  /**
   * Get the current user's profile from backend
   */
  getProfile: async () => {
    const userId = storage.get('user', null)?.id;
    if (!userId) return null;
    const result = await apiClient.get(`${apiConfig.endpoints.users}/${userId}`);
    return result.data;
  },

  /**
   * Update the current user's profile
   */
  updateProfile: async (updatedData) => {
    const userId = storage.get('user', null)?.id;
    if (!userId) throw new Error('Not authenticated');
    const result = await apiClient.patch(`${apiConfig.endpoints.users}/${userId}`, updatedData);
    // Update local storage to keep user info in sync
    const updated = { ...storage.get('user', {}), ...result.data };
    storage.set('user', updated);
    return updated;
  },
};
