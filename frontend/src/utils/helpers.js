/**
 * Formats a number to Indian Rupee representation (e.g. ₹30/hr)
 */
export const formatCurrency = (amount, suffix = '/hr') => {
  return `₹${amount}${suffix}`;
};

/**
 * Formats a distance in kilometers
 */
export const formatDistance = (km) => {
  if (km === null || km === undefined) return '';
  return `${km.toFixed(1)} km`;
};

/**
 * Normalizes a backend parking document to the shape expected by frontend UI components.
 * Backend uses _id, pricingPerHour.car, availableSlots, location.coordinates [lng, lat]
 * Frontend uses id, hourlyRate, slotsAvailable, coordinates [lat, lng]
 */
export const normalizeSpot = (spot) => {
  if (!spot) return spot;

  // Derive statusType from the backend status string
  const statusMap = {
    Available: 'available',
    Limited: 'limited',
    Full: 'full',
  };
  const statusType =
    spot.amenities?.includes('ev_charging') && spot.status === 'Available'
      ? 'ev'
      : statusMap[spot.status] || 'available';

  // Backend GeoJSON coordinates are [longitude, latitude]; Leaflet needs [lat, lng]
  const coords = spot.location?.coordinates;
  const coordinates = coords ? [coords[1], coords[0]] : [16.705, 74.2433];

  const availableSlots =
    (spot.availableSlots?.car || 0) + (spot.availableSlots?.two_wheeler || 0);
  const totalSlots =
    (spot.totalSlots?.car || 0) + (spot.totalSlots?.two_wheeler || 0);

  return {
    // Map _id to id for React key / selection
    id: spot._id || spot.id,
    _id: spot._id || spot.id,
    name: spot.name,
    landmark: spot.landmark,
    address: spot.address,
    city: spot.city,
    rating: spot.rating || 4.5,
    reviewsCount: spot.totalReviews || 0,
    status: spot.status || 'Available',
    statusType,
    slotsAvailable: availableSlots,
    totalSlots,
    availableSlots: spot.availableSlots,
    distanceKm: spot.distanceKm ?? null,
    hourlyRate: spot.pricingPerHour?.car || 30,
    pricingPerHour: spot.pricingPerHour,
    coordinates,
    image: spot.image || '',
    images: spot.images || [],
    type: spot.vehicleTypes || [],
    amenities: spot.amenities || [],
    isCovered: spot.amenities?.includes('covered') || false,
    hasEV: spot.amenities?.includes('ev_charging') || false,
  };
};

/**
 * Filter spots by search text and filter pill category.
 * Used for client-side search on already-loaded results.
 */
export const filterParkingSpots = (spots, query = '', activeFilter = 'all') => {
  return spots.filter((spot) => {
    const matchesQuery =
      !query.trim() ||
      spot.name?.toLowerCase().includes(query.toLowerCase()) ||
      spot.landmark?.toLowerCase().includes(query.toLowerCase());

    if (!matchesQuery) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'near_me') return spot.distanceKm !== null && spot.distanceKm <= 1.0;
    if (activeFilter === 'car') return spot.type?.includes('car');
    if (activeFilter === 'two_wheeler') return spot.type?.includes('two_wheeler');
    if (activeFilter === 'covered') return spot.isCovered;
    if (activeFilter === 'open') return !spot.isCovered;
    if (activeFilter === 'ev_charging') return spot.hasEV;

    return true;
  });
};

/**
 * Sorts spots based on selected sort key
 */
export const sortParkingSpots = (spots, sortKey = 'nearest') => {
  const sorted = [...spots];
  switch (sortKey) {
    case 'nearest':
      return sorted.sort((a, b) => {
        if (a.distanceKm === null && b.distanceKm === null) return 0;
        if (a.distanceKm === null) return 1;
        if (b.distanceKm === null) return -1;
        return a.distanceKm - b.distanceKm;
      });
    case 'price_low':
      return sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
    case 'price_high':
      return sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'availability':
      return sorted.sort((a, b) => b.slotsAvailable - a.slotsAvailable);
    default:
      return sorted;
  }
};

/**
 * Format a Date to a human-readable string in Indian locale
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
