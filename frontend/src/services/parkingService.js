import { apiClient } from './api';
import { apiConfig } from '../config/apiConfig';
import { storage } from '../utils/storage';

export const parkingService = {
  /**
   * Fetch paginated list with optional filters
   * @param {Object} params - city, search, vehicleType, amenities, status, sortBy, latitude, longitude, page, limit
   */
  listParkings: async (params = {}) => {
    return apiClient.get(apiConfig.endpoints.parkings, params);
  },

  /**
   * Fetch lightweight map pins for the interactive map
   */
  getMapPins: async (city = 'Kolhapur') => {
    return apiClient.get(apiConfig.endpoints.mapPins, { city });
  },

  /**
   * Get single parking spot by MongoDB _id
   */
  getParkingById: async (id, coords = null) => {
    const params = {};
    if (coords?.lat) params.latitude = coords.lat;
    if (coords?.lng) params.longitude = coords.lng;
    return apiClient.get(`${apiConfig.endpoints.parkings}/${id}`, params);
  },
};

export const bookingService = {
  /**
   * Create a new booking (requires authentication)
   * @param {{ parkingId, vehicleType, vehicleNumber, startTime, endTime }} data
   */
  createBooking: async (data) => {
    return apiClient.post(apiConfig.endpoints.bookings, data);
  },

  /**
   * Get the current user's bookings
   */
  getMyBookings: async (params = {}) => {
    return apiClient.get(apiConfig.endpoints.myBookings, params);
  },

  /**
   * Get a single booking by id
   */
  getBookingById: async (id) => {
    return apiClient.get(`${apiConfig.endpoints.bookings}/${id}`);
  },

  /**
   * Cancel a booking
   */
  cancelBooking: async (id) => {
    return apiClient.patch(`${apiConfig.endpoints.bookings}/${id}/cancel`);
  },
};

export const favoriteService = {
  /**
   * Get the current user's favorites
   */
  getFavorites: async () => {
    return apiClient.get(apiConfig.endpoints.favorites);
  },

  /**
   * Add a parking spot to favorites
   */
  addFavorite: async (parkingId) => {
    return apiClient.post(apiConfig.endpoints.favorites, { parkingId });
  },

  /**
   * Remove a parking spot from favorites
   */
  removeFavorite: async (parkingId) => {
    return apiClient.delete(`${apiConfig.endpoints.favorites}/${parkingId}`);
  },
};

export const reviewService = {
  /**
   * Get reviews for a parking spot
   */
  getReviews: async (parkingId, params = {}) => {
    return apiClient.get(apiConfig.endpoints.reviews, { parkingId, ...params });
  },

  /**
   * Submit a review (requires authentication)
   */
  addReview: async (data) => {
    return apiClient.post(apiConfig.endpoints.reviews, data);
  },
};

export const supportService = {
  /**
   * Submit a support ticket
   */
  submitTicket: async (data) => {
    return apiClient.post(apiConfig.endpoints.support, data);
  },
};
