const { calculateDistanceKm } = require('../../src/utils/helpers');

describe('Parking Helper Unit Tests', () => {
  it('should calculate distance correctly between two coordinates in km', () => {
    // Distance between Mahalakshmi Temple and New Palace Kolhapur (~3.2 km)
    const lat1 = 16.6946;
    const lon1 = 74.2238;
    const lat2 = 16.7135;
    const lon2 = 74.2384;

    const distance = calculateDistanceKm(lat1, lon1, lat2, lon2);
    expect(distance).toBeGreaterThan(2);
    expect(distance).toBeLessThan(4);
  });
});
