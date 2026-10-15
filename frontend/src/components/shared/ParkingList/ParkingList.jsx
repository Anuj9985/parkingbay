import React from 'react';
import { ChevronDown, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import ParkingCard from './ParkingCard';
import { useApp } from '../../../context/AppContext';
import { SORT_OPTIONS } from '../../../utils/constants';

const ParkingList = () => {
  const { spots, totalResultsCount, sortBy, setSortBy, activeCity, parkingLoading, parkingError, refetchParkings } = useApp();

  return (
    <div className="flex flex-col h-full">
      {/* Header with Title and Results Count */}
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight">
          Parking Spots in {activeCity.name}
        </h3>
        <span className="text-xs md:text-sm font-medium text-slate-400">
          {parkingLoading ? '…' : `${totalResultsCount} results`}
        </span>
      </div>

      {/* Sort Dropdown */}
      <div className="pb-3.5">
        <div className="relative inline-block">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-slate-200/90 text-slate-700 text-xs md:text-sm font-semibold rounded-xl pl-3.5 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Cards Scrollable Container */}
      <div className="space-y-3 overflow-y-auto pr-1.5 custom-scrollbar max-h-[580px] lg:max-h-[660px]">
        {/* Loading state */}
        {parkingLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-amber-400" />
            <p className="text-sm font-semibold">Loading parking spots…</p>
          </div>
        )}

        {/* Error state */}
        {!parkingLoading && parkingError && (
          <div className="bg-rose-50 rounded-2xl p-6 text-center border border-rose-100">
            <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
            <p className="font-semibold text-sm text-rose-700 mb-1">Failed to load parking data</p>
            <p className="text-xs text-rose-500 mb-4">{parkingError}</p>
            <button
              onClick={refetchParkings}
              className="flex items-center gap-2 mx-auto px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!parkingLoading && !parkingError && spots.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-100">
            <p className="font-semibold text-sm">No parking spots found</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your filters or search term</p>
          </div>
        )}

        {/* Parking cards */}
        {!parkingLoading && !parkingError && spots.map((spot) => (
          <ParkingCard key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default ParkingList;
