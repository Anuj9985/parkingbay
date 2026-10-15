import { env } from './env';

export const apiConfig = {
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  endpoints: {
    // ---- Auth ----
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
    },
    // ---- Parking ----
    parkings: '/parkings',
    mapPins: '/parkings/map-pins',
    // ---- Bookings ----
    bookings: '/bookings',
    myBookings: '/bookings/my-bookings',
    // ---- Favorites ----
    favorites: '/favorites',
    // ---- Reviews ----
    reviews: '/reviews',
    // ---- User ----
    users: '/users',
    // ---- Support ----
    support: '/support',
    // ---- Cities ----
    cities: '/cities',
    // ---- Health ----
    health: '/health',
  }
};
