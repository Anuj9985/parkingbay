import React from 'react';
import { Star, MapPin, X } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const MapPopup = ({ spot, onClose }) => {
  if (!spot) return null;

  return (
    <div className="bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-100 w-64 md:w-72 select-none animate-fadeIn">
      {/* Thumbnail */}
      <div className="relative w-full h-28 rounded-xl overflow-hidden bg-slate-100 mb-2.5">
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Spot Info */}
      <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight">
        {spot.name}
      </h4>

      {/* Rating & Distance */}
      <div className="flex items-center justify-between text-xs mt-1 text-slate-500">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-slate-700">{spot.rating}</span>
          <span>({spot.reviewsCount})</span>
        </div>
        <div className="flex items-center gap-1 font-medium">
          <MapPin className="w-3.5 h-3.5 text-blue-500" />
          <span>{spot.distanceKm} km</span>
        </div>
      </div>

      {/* Price & Status */}
      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
        <div>
          <span className="text-base font-extrabold text-slate-900">
            ₹{spot.hourlyRate}/hr
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          {spot.status}
        </span>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        className="w-full mt-3 py-2 bg-[#0f172a] hover:bg-slate-800 active:scale-[0.98] text-white text-xs md:text-sm font-bold rounded-xl shadow-sm transition-all duration-150"
      >
        View Details
      </button>
    </div>
  );
};

export default MapPopup;
