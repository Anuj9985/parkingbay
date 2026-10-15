import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { CITIES } from '../utils/constants';
import { parkingService, favoriteService } from '../services/parkingService';
import { filterParkingSpots, sortParkingSpots, normalizeSpot } from '../utils/helpers';
import { useAuthContext } from './AuthContext';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  const [activeCity, setActiveCity] = useState(CITIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('nearest');
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Parking data from backend
  const [allSpots, setAllSpots] = useState([]);      // raw from API
  const [spots, setSpots] = useState([]);            // filtered/sorted for display
  const [mapPins, setMapPins] = useState([]);        // lightweight pins for map
  const [totalResultsCount, setTotalResultsCount] = useState(0);

  // UI state
  const [isSatellite, setIsSatellite] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Loading & error
  const [parkingLoading, setParkingLoading] = useState(false);
  const [parkingError, setParkingError] = useState(null);

  // Favorites (IDs, synced with backend when logged in)
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  // ---- Fetch parking data from backend ----
  const fetchParkings = useCallback(async () => {
    setParkingLoading(true);
    setParkingError(null);
    try {
      const params = {
        city: activeCity.name,
        limit: 50,
      };
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (activeFilter === 'car') params.vehicleType = 'car';
      else if (activeFilter === 'two_wheeler') params.vehicleType = 'two_wheeler';
      else if (activeFilter === 'covered') params.amenities = 'covered';
      else if (activeFilter === 'open') params.amenities = 'open';
      else if (activeFilter === 'ev_charging') params.amenities = 'ev_charging';

      // Map sort UI keys to backend keys
      if (sortBy === 'rating') params.sortBy = 'rating';
      else if (sortBy === 'price_low') params.sortBy = 'price_asc';
      else if (sortBy === 'price_high') params.sortBy = 'price_desc';

      const result = await parkingService.listParkings(params);
      const raw = result.data || [];
      const normalized = raw.map(normalizeSpot);
      setAllSpots(normalized);
      setTotalResultsCount(result.pagination?.totalItems || normalized.length);
    } catch (err) {
      setParkingError(err.message || 'Failed to load parking spots');
      console.error('[AppContext] fetchParkings error:', err);
    } finally {
      setParkingLoading(false);
    }
  }, [activeCity, searchQuery, activeFilter, sortBy]);

  // ---- Fetch map pins ----
  const fetchMapPins = useCallback(async () => {
    try {
      const result = await parkingService.getMapPins(activeCity.name);
      const pins = (result.data || []).map((p) => ({
        ...normalizeSpot(p),
        _id: p._id,
      }));
      setMapPins(pins);
    } catch (err) {
      console.error('[AppContext] fetchMapPins error:', err);
    }
  }, [activeCity]);

  // ---- Fetch favorites (only when authenticated) ----
  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated) { setFavorites([]); return; }
    setFavoritesLoading(true);
    try {
      const result = await favoriteService.getFavorites();
      // Result is array of { parking: <id> } or populated objects
      const ids = (result.data || []).map((f) =>
        typeof f.parking === 'object' ? f.parking._id : f.parking
      );
      setFavorites(ids);
    } catch (err) {
      console.error('[AppContext] fetchFavorites error:', err);
    } finally {
      setFavoritesLoading(false);
    }
  }, [isAuthenticated]);

  // Initial and city-change fetch
  useEffect(() => {
    fetchParkings();
    fetchMapPins();
  }, [fetchParkings, fetchMapPins]);

  // Sync favorites when auth changes
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Apply client-side sort on top of already-filtered backend data for instant UX
  useEffect(() => {
    const sorted = sortParkingSpots(allSpots, sortBy);
    setSpots(sorted);
  }, [allSpots, sortBy]);

  // ---- Toggle Favorite ----
  const toggleFavorite = async (spotId) => {
    if (!isAuthenticated) return; // do nothing if not logged in
    const isFav = favorites.includes(spotId);
    // Optimistic update
    setFavorites((prev) =>
      isFav ? prev.filter((id) => id !== spotId) : [...prev, spotId]
    );
    try {
      if (isFav) {
        await favoriteService.removeFavorite(spotId);
      } else {
        await favoriteService.addFavorite(spotId);
      }
    } catch (err) {
      // Revert on failure
      setFavorites((prev) =>
        isFav ? [...prev, spotId] : prev.filter((id) => id !== spotId)
      );
      console.error('[AppContext] toggleFavorite error:', err);
    }
  };

  const handleSelectSpot = (spot) => {
    setSelectedSpot(spot);
  };

  return (
    <AppContext.Provider
      value={{
        // City
        activeCity,
        setActiveCity,
        // Search & filter
        searchQuery,
        setSearchQuery,
        activeFilter,
        setActiveFilter,
        sortBy,
        setSortBy,
        // Spots
        spots,
        mapPins,
        allSpots,
        totalResultsCount,
        // Loading / error
        parkingLoading,
        parkingError,
        refetchParkings: fetchParkings,
        // Map
        selectedSpot,
        setSelectedSpot: handleSelectSpot,
        isSatellite,
        setIsSatellite,
        // Nav
        activeNav,
        setActiveNav,
        // Favorites
        favorites,
        favoritesLoading,
        toggleFavorite,
        isFavorite: (id) => favorites.includes(id),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
