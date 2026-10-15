import React, { useState, useEffect } from 'react';
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';
import { useApp } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import ParkingCard from '../components/shared/ParkingList/ParkingCard';
import ParkingMap from '../components/shared/ParkingMap/ParkingMap';
import { bookingService, favoriteService } from '../services/parkingService';
import { normalizeSpot } from '../utils/helpers';
import { formatDateTime } from '../utils/helpers';
import {
  Loader2, AlertTriangle, Calendar, X, MapPin,
  CheckCircle2, Clock, XCircle, Car, User, LogIn
} from 'lucide-react';
import Button from '../components/common/Button/Button';

// ---- BookingCard ----
const BookingCard = ({ booking, onCancel }) => {
  const [cancelling, setCancelling] = useState(false);

  const statusColors = {
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    active: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-slate-50 text-slate-500 border-slate-200',
    cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const canCancel = ['confirmed', 'pending'].includes(booking.status);

  const handleCancel = async () => {
    if (!window.confirm('Cancel this booking?')) return;
    setCancelling(true);
    try {
      await onCancel(booking._id);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-800 text-sm md:text-base">
            {booking.parking?.name || 'Parking Spot'}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            <MapPin className="w-3 h-3 inline mr-1 text-blue-400" />
            {booking.parking?.address || booking.parking?.city || ''}
          </p>
        </div>
        <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusColors[booking.status] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
          {booking.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Car className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium">{booking.vehicleNumber}</span>
          <span className="text-slate-400">({booking.vehicleType?.replace('_', ' ')})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Code:</span>
          <span className="font-bold text-amber-600">{booking.bookingCode}</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{formatDateTime(booking.startTime)} → {formatDateTime(booking.endTime)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="text-sm font-extrabold text-slate-900">
          ₹{booking.totalAmount}
          <span className="text-xs font-normal text-slate-400 ml-1">
            ({booking.totalHours}hr × ₹{booking.hourlyRate})
          </span>
        </div>
        {canCancel && (
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors disabled:opacity-60"
          >
            {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

// ---- My Bookings Page ----
const MyBookingsPage = () => {
  const { isAuthenticated, setIsLoginModalOpen } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await bookingService.getMyBookings(statusFilter ? { status: statusFilter } : {});
      setBookings(result.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadBookings();
  }, [isAuthenticated, statusFilter]);

  const handleCancel = async (bookingId) => {
    try {
      await bookingService.cancelBooking(bookingId);
      loadBookings();
    } catch (err) {
      alert(err.message || 'Failed to cancel booking');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">Login to see your bookings</h3>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Your booking history and active passes will appear here after login.
        </p>
        <Button onClick={() => setIsLoginModalOpen(true)} className="w-full">
          <LogIn className="w-4 h-4 mr-2" /> Login Now
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xl font-bold text-slate-800">My Bookings</h3>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <option value="">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <p className="text-xs text-slate-500 mb-6">Show your digital pass or QR code at entry/exit gates</p>

      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        </div>
      )}

      {!loading && error && (
        <div className="bg-rose-50 rounded-2xl p-6 text-center border border-rose-100">
          <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
          <p className="text-sm text-rose-700">{error}</p>
          <button onClick={loadBookings} className="mt-3 text-xs text-rose-600 underline">Retry</button>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-sm text-slate-600">No bookings yet</p>
          <p className="text-xs text-slate-400 mt-1">Book a parking spot to see your history here</p>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((b) => (
            <BookingCard key={b._id} booking={b} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
};

// ---- Favorites Page ----
const FavoritesPage = () => {
  const { isAuthenticated, setIsLoginModalOpen } = useAuthContext();
  const [favSpots, setFavSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await favoriteService.getFavorites();
      const populated = (result.data || [])
        .filter((f) => f.parking && typeof f.parking === 'object')
        .map((f) => normalizeSpot(f.parking));
      setFavSpots(populated);
    } catch (err) {
      setError(err.message || 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadFavorites();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
        <h3 className="text-lg font-bold text-slate-800">Login to see your favourites</h3>
        <p className="text-xs text-slate-400 mt-1 mb-6">Save parking spots for quick access later.</p>
        <Button onClick={() => setIsLoginModalOpen(true)} className="w-full">
          <LogIn className="w-4 h-4 mr-2" /> Login Now
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 pt-6">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Saved Parking Spots</h3>

      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        </div>
      )}

      {!loading && error && (
        <p className="text-rose-600 text-sm">{error}</p>
      )}

      {!loading && !error && favSpots.length === 0 && (
        <p className="text-slate-400 text-sm">No favourites added yet. Tap the heart icon on any parking spot.</p>
      )}

      {!loading && !error && favSpots.length > 0 && (
        <div className="space-y-3">
          {favSpots.map((spot) => (
            <ParkingCard key={spot.id} spot={spot} />
          ))}
        </div>
      )}
    </div>
  );
};

// ---- Main AppRoutes ----
const AppRoutes = () => {
  const { activeNav } = useApp();

  switch (activeNav) {
    case 'home':
      return <Home />;

    case 'map':
      return (
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800">Fullscreen Live Parking Map</h3>
            <p className="text-xs text-slate-500">Live GPS sensor feed across Kolhapur</p>
          </div>
          <ParkingMap />
        </div>
      );

    case 'list':
      return (
        <div className="max-w-4xl mx-auto px-6 md:px-8 pt-4">
          <h3 className="text-xl font-bold text-slate-800 mb-4">All Parking Lots in Kolhapur</h3>
          <AllParkingListView />
        </div>
      );

    case 'bookings':
      return <MyBookingsPage />;

    case 'favorites':
      return <FavoritesPage />;

    case 'about':
      return (
        <div className="max-w-4xl mx-auto px-6 md:px-8 pt-6 space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">About Kolhapur Parking Guide</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Kolhapur is a city known for its rich heritage, the sacred Mahalaxmi (Ambabai) Temple, historic New Palace, and scenic Rankala Lake. ParkingBay has partnered with the Kolhapur Municipal Corporation (KMC) to provide real-time parking availability, reducing congestion and helping pilgrims and tourists park smart and explore more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-800 text-sm">Mahalaxmi Temple Zone</h5>
              <p className="text-xs text-slate-500 mt-1">Recommended: Mahadwar Parking & Bhavani Mandap grounds (0.3 - 0.5 km walking distance).</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-800 text-sm">Rankala Lake Promenade</h5>
              <p className="text-xs text-slate-500 mt-1">Recommended: RK Nagar & Rankala Chowpatty open parking slots.</p>
            </div>
          </div>
        </div>
      );

    case 'support':
      return <SupportPage />;

    default:
      return <NotFound />;
  }
};

// ---- All Parking List View (for "list" nav item) ----
const AllParkingListView = () => {
  const { spots, parkingLoading, parkingError, refetchParkings } = useApp();

  if (parkingLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
      </div>
    );
  }

  if (parkingError) {
    return (
      <div className="bg-rose-50 rounded-2xl p-6 text-center border border-rose-100">
        <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
        <p className="text-sm text-rose-700 mb-3">{parkingError}</p>
        <button onClick={refetchParkings} className="text-xs text-rose-600 underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {spots.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-8">No parking spots found.</p>
      ) : (
        spots.map((spot) => <ParkingCard key={spot.id} spot={spot} />)
      )}
    </div>
  );
};

// ---- Support Page with functional form ----
const SupportPage = () => {
  const [form, setForm] = useState({ subject: '', message: '', category: 'general' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { supportService } = await import('../services/parkingService');
      await supportService.submitTicket(form);
      setSuccess(true);
      setForm({ subject: '', message: '', category: 'general' });
    } catch (err) {
      setError(err.message || 'Failed to submit ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-6">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Help & 24x7 Support</h3>
      <p className="text-xs text-slate-500 mb-6">Need assistance with your parking slot or billing in Kolhapur?</p>

      {/* Contact Info */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-sm mb-6">
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="font-semibold text-slate-700">Toll Free Helpline</span>
          <span className="font-bold text-amber-600">1800 233 4567</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="font-semibold text-slate-700">WhatsApp Assistance</span>
          <span className="font-bold text-emerald-600">+91 94220 12345</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-semibold text-slate-700">KMC Parking Control Room</span>
          <span className="text-slate-500">Bhausinghji Road, Kolhapur</span>
        </div>
      </div>

      {/* Support Ticket Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-4">Submit a Support Ticket</h4>

        {success && (
          <div className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5 text-emerald-700 text-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Your ticket has been submitted! We'll respond within 24 hours.
          </div>
        )}

        {error && (
          <div className="mb-4 flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2.5 text-rose-700 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value="general">General Query</option>
              <option value="booking">Booking Issue</option>
              <option value="payment">Payment Problem</option>
              <option value="technical">Technical Issue</option>
              <option value="complaint">Complaint</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subject</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              placeholder="Briefly describe your issue"
              required
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={4}
              placeholder="Describe your issue in detail…"
              required
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting…</> : 'Submit Ticket'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppRoutes;
