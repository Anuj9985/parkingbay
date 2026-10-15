import React, { useState } from 'react';
import { Star, MapPin, ChevronRight, Heart, Calendar, Loader2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { useAuthContext } from '../../../context/AuthContext';

const ParkingCard = ({ spot }) => {
  const { selectedSpot, setSelectedSpot, favorites, toggleFavorite, isFavorite } = useApp();
  const { isAuthenticated, setIsLoginModalOpen } = useAuthContext();

  const isSelected = selectedSpot?.id === spot.id || selectedSpot?._id === spot._id;
  const isFav = isFavorite(spot._id || spot.id);
  const [togglingFav, setTogglingFav] = useState(false);

  const getStatusBadge = () => {
    switch (spot.statusType) {
      case 'limited':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Limited
          </span>
        );
      case 'full':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Full
          </span>
        );
      case 'ev':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            EV ⚡
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Available
          </span>
        );
    }
  };

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    setTogglingFav(true);
    try {
      await toggleFavorite(spot._id || spot.id);
    } finally {
      setTogglingFav(false);
    }
  };

  return (
    <div
      onClick={() => setSelectedSpot(spot)}
      className={`group cursor-pointer bg-white rounded-2xl p-3.5 border transition-all duration-200 flex items-center justify-between gap-4 ${
        isSelected
          ? 'border-amber-400 shadow-md ring-2 ring-amber-400/20 bg-amber-50/10'
          : 'border-slate-100 hover:border-slate-200 hover:shadow-md'
      }`}
    >
      {/* Left: Thumbnail & Details */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
          <img
            src={spot.image || 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'}
            alt={spot.name}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Favourite button over image */}
          <button
            type="button"
            onClick={handleFavoriteToggle}
            disabled={togglingFav}
            className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow transition-transform active:scale-90"
            title={isFav ? 'Remove from favourites' : 'Add to favourites'}
          >
            {togglingFav ? (
              <Loader2 className="w-3 h-3 animate-spin text-rose-400" />
            ) : (
              <Heart className={`w-3 h-3 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            )}
          </button>
        </div>

        <div className="min-w-0">
          <h4 className="font-bold text-slate-800 text-sm md:text-base truncate group-hover:text-amber-600 transition-colors">
            {spot.name}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
            <div className="flex items-center text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
              <span>{spot.rating}</span>
            </div>
            <span>({spot.reviewsCount})</span>
          </div>

          {/* Landmark */}
          <p className="text-xs text-slate-400 truncate mt-0.5">{spot.landmark}</p>

          {/* Status Badge & Slots */}
          <div className="flex items-center gap-2 mt-2">
            {getStatusBadge()}
            <span className="text-xs font-medium text-slate-500">
              {spot.slotsAvailable} slots
            </span>
          </div>
        </div>
      </div>

      {/* Right: Distance, Price, Arrow */}
      <div className="flex flex-col items-end justify-between self-stretch shrink-0 py-0.5">
        <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-blue-500" />
          <span>{spot.distanceKm != null ? `${spot.distanceKm} km` : '—'}</span>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <span className="text-sm md:text-base font-extrabold text-slate-900">
            ₹{spot.hourlyRate}/hr
          </span>
          <button
            type="button"
            className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;
