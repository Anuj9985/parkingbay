export const env = {
  appName: import.meta.env.VITE_APP_NAME || 'ParkingBay',
  apiUrl: import.meta.env.VITE_API_URL || 'http://13.233.74.199:5000/api',
  defaultCity: import.meta.env.VITE_DEFAULT_CITY || 'Kolhapur',
  defaultLat: Number(import.meta.env.VITE_DEFAULT_LAT) || 16.7050,
  defaultLng: Number(import.meta.env.VITE_DEFAULT_LNG) || 74.2433,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
