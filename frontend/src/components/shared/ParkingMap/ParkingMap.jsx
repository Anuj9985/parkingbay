import React, { useEffect, useRef, useState } from 'react';
import { Crosshair, Plus, Minus, MapPin, X, Calendar, Loader2, AlertCircle } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../../context/AppContext';
import { useAuthContext } from '../../../context/AuthContext';
import MapLegend from './MapLegend';
import { bookingService } from '../../../services/parkingService';

const PIN_COLORS = {
  available: '#10b981',
  limited: '#f59e0b',
  full: '#ef4444',
  ev: '#0284c7',
};

const KOLHAPUR_BOUNDS = [
  [16.6200, 74.1300],
  [16.7900, 74.3500],
];
const KOLHAPUR_CENTER = [16.7050, 74.2433];

// ---- Booking Modal ----
const BookingModal = ({ spot, onClose, onBooked }) => {
  const { user } = useAuthContext();
  const [form, setForm] = useState({
    vehicleType: 'car',
    vehicleNumber: '',
    startTime: '',
    endTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const now = new Date();
  const minStart = now.toISOString().slice(0, 16);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await bookingService.createBooking({
        parkingId: spot._id || spot.id,
        vehicleType: form.vehicleType,
        vehicleNumber: form.vehicleNumber.toUpperCase(),
        startTime: new Date(form.startTime).toISOString(),
        endTime: new Date(form.endTime).toISOString(),
      });
      setSuccess(result.data);
      onBooked && onBooked();
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Book Parking Spot</h3>
            <p className="text-xs text-slate-500 mt-0.5">{spot.name}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="font-bold text-slate-800 text-lg mb-1">Booking Confirmed!</h4>
              <p className="text-xs text-slate-500 mb-4">Your booking code:</p>
              <div className="bg-slate-900 text-white font-mono text-xl font-bold py-3 px-6 rounded-xl mb-4">
                {success.bookingCode}
              </div>
              <p className="text-xs text-slate-500 mb-1">
                {spot.name} • ₹{success.totalAmount} for {success.totalHours}hr
              </p>
              <p className="text-xs text-slate-400">Show this code at the parking gate</p>
              <button onClick={onClose} className="mt-5 w-full py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2.5 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              {/* Pricing Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
                <div className="text-xs text-amber-800">
                  <span className="font-bold">Car: ₹{spot.pricingPerHour?.car || spot.hourlyRate}/hr</span>
                  {spot.pricingPerHour?.two_wheeler && (
                    <span className="ml-3 text-amber-700">Two-Wheeler: ₹{spot.pricingPerHour.two_wheeler}/hr</span>
                  )}
                </div>
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Vehicle Type</label>
                <div className="flex gap-2">
                  {['car', 'two_wheeler'].map((vt) => (
                    <button
                      key={vt}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, vehicleType: vt }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        form.vehicleType === vt
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {vt === 'car' ? '🚗 Car' : '🏍️ Two Wheeler'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Vehicle Number</label>
                <input
                  type="text"
                  value={form.vehicleNumber}
                  onChange={(e) => setForm((f) => ({ ...f, vehicleNumber: e.target.value }))}
                  placeholder="MH 09 AB 1234"
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm uppercase font-medium focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Start Time</label>
                <input
                  type="datetime-local"
                  value={form.startTime}
                  min={minStart}
                  onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">End Time</label>
                <input
                  type="datetime-local"
                  value={form.endTime}
                  min={form.startTime || minStart}
                  onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0f172a] hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Booking…</>
                ) : (
                  <><Calendar className="w-4 h-4" /> Confirm Booking</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ---- ParkingMap ----
const ParkingMap = () => {
  const { mapPins, spots, selectedSpot, setSelectedSpot, isSatellite, setIsSatellite, refetchParkings } = useApp();
  const { isAuthenticated, setIsLoginModalOpen } = useAuthContext();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersGroupRef = useRef(null);
  const [notification, setNotification] = useState('Scroll & click a parking pin to preview details');
  const [bookingSpot, setBookingSpot] = useState(null);

  // Use map pins from backend if available, else fall back to spots
  const displayPins = mapPins.length > 0 ? mapPins : spots;

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    const map = L.map(mapContainerRef.current, {
      center: KOLHAPUR_CENTER,
      zoom: 14,
      minZoom: 12,
      maxZoom: 18,
      maxBounds: KOLHAPUR_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
    });

    const tileUrl = isSatellite
      ? 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
      : 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';

    const tileLayer = L.tileLayer(tileUrl, {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    markersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    const resizeTimer = setTimeout(() => map.invalidateSize(), 150);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapInstanceRef.current = null;
      if (mapContainerRef.current) delete mapContainerRef.current._leaflet_id;
    };
  }, []);

  // Switch tile layer on satellite toggle
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const tileUrl = isSatellite
      ? 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
      : 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    const newLayer = L.tileLayer(tileUrl, { subdomains: ['0', '1', '2', '3'], maxZoom: 19 }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newLayer;
  }, [isSatellite]);

  // Render markers from backend map pins
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;
    const group = markersGroupRef.current;
    group.clearLayers();

    displayPins.forEach((spot) => {
      if (!spot.coordinates || spot.coordinates.length < 2) return;
      const isSelected = selectedSpot?.id === spot.id || selectedSpot?._id === spot._id;
      const color = PIN_COLORS[spot.statusType] || PIN_COLORS.available;

      const pinHtml = `
        <div class="custom-map-pin ${isSelected ? 'pin-selected scale-125' : ''}" style="cursor: pointer;">
          <div style="
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
          ">
            <span style="transform: rotate(45deg); color: #ffffff; font-weight: 800; font-size: 13px; font-family: sans-serif;">P</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-leaflet-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      // spot.coordinates from normalizeSpot is [lat, lng]
      const marker = L.marker(spot.coordinates, { icon: customIcon }).addTo(group);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        setSelectedSpot(spot);
        mapInstanceRef.current?.flyTo(spot.coordinates, 15, { duration: 0.8 });
        setNotification(`Selected: ${spot.name}`);
        setTimeout(() => setNotification(null), 3000);
      });
    });
  }, [displayPins, selectedSpot]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleRecenter = () => {
    if (selectedSpot?.coordinates && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedSpot.coordinates, 15);
    } else if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(KOLHAPUR_CENTER, 14);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    setBookingSpot(selectedSpot);
  };

  return (
    <>
      <div className="relative w-full h-[580px] lg:h-[660px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 select-none">
        {/* Map Container */}
        <div
          ref={mapContainerRef}
          className="w-full h-full z-10"
          style={{ minHeight: '580px', width: '100%', height: '100%' }}
        />

        {/* Map / Satellite Toggle */}
        <div className="absolute top-4 left-4 z-[400] flex items-center bg-white rounded-xl shadow-md border border-slate-200/80 p-1">
          <button
            onClick={() => setIsSatellite(false)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${!isSatellite ? 'bg-[#0f172a] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Google Map
          </button>
          <button
            onClick={() => setIsSatellite(true)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${isSatellite ? 'bg-[#0f172a] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Satellite
          </button>
        </div>

        {/* Notification Pill */}
        {notification && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-slate-900/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm pointer-events-none transition-all">
            📍 {notification}
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-[400] flex flex-col gap-2">
          <button onClick={handleRecenter} className="w-10 h-10 bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-md border border-slate-200/80 flex items-center justify-center transition-transform active:scale-90" title="Recenter">
            <Crosshair className="w-4 h-4" />
          </button>
          <div className="flex flex-col bg-white rounded-xl shadow-md border border-slate-200/80 overflow-hidden divide-y divide-slate-100">
            <button onClick={handleZoomIn} className="w-10 h-10 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors active:bg-slate-100" title="Zoom In">
              <Plus className="w-4 h-4 font-bold" />
            </button>
            <button onClick={handleZoomOut} className="w-10 h-10 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors active:bg-slate-100" title="Zoom Out">
              <Minus className="w-4 h-4 font-bold" />
            </button>
          </div>
        </div>

        {/* Spot Preview Card */}
        {selectedSpot && (
          <div className="absolute top-14 right-16 z-[400] hidden sm:block">
            <div className="bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-100 w-64 md:w-72 select-none relative">
              {/* Thumbnail */}
              <div className="relative w-full h-28 rounded-xl overflow-hidden bg-slate-100 mb-2.5">
                {selectedSpot.image ? (
                  <img
                    src={selectedSpot.image}
                    alt={selectedSpot.name}
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'; }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-slate-400" />
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedSpot(null); }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight">{selectedSpot.name}</h4>
              <p className="text-xs text-slate-400 truncate mt-0.5">{selectedSpot.landmark}</p>

              <div className="flex items-center justify-between text-xs mt-1.5 text-slate-500">
                <div className="flex items-center gap-1 font-bold text-slate-700">
                  <span className="text-amber-500">★</span>
                  <span>{selectedSpot.rating || 4.5}</span>
                  <span className="font-normal text-slate-400">({selectedSpot.reviewsCount || 0})</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>{selectedSpot.slotsAvailable} slots</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                <span className="text-sm md:text-base font-extrabold text-slate-900">₹{selectedSpot.hourlyRate}/hr</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                  selectedSpot.statusType === 'full'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : selectedSpot.statusType === 'limited'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {selectedSpot.status || 'Available'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleBookNow}
                disabled={selectedSpot.statusType === 'full'}
                className="w-full mt-3 py-2 bg-[#0f172a] hover:bg-slate-800 active:scale-[0.98] text-white text-xs md:text-sm font-bold rounded-xl shadow-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                {selectedSpot.statusType === 'full' ? 'Full — No Slots' : 'Book Now'}
              </button>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 z-[400]">
          <MapLegend />
        </div>
      </div>

      {/* Booking Modal */}
      {bookingSpot && (
        <BookingModal
          spot={bookingSpot}
          onClose={() => setBookingSpot(null)}
          onBooked={() => {
            setBookingSpot(null);
            refetchParkings();
          }}
        />
      )}
    </>
  );
};

export default ParkingMap;
