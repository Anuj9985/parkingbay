import React, { useState, useEffect } from 'react';
import { Search, Navigation, ChevronDown, X } from 'lucide-react';
import FilterPills from './FilterPills';
import { useApp } from '../../../context/AppContext';
import { CITIES } from '../../../utils/constants';

const SearchFilter = () => {
  const { searchQuery, setSearchQuery, activeCity, setActiveCity, setActiveFilter } = useApp();
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Keep local search input synchronized whenever searchQuery resets
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setLocalSearch(val);
    // If user deletes all text, immediately restore all locations
    if (val.trim() === '') {
      setSearchQuery('');
    }
  };

  const handleClear = () => {
    setLocalSearch('');
    setSearchQuery('');
    setActiveFilter('all');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-8 -mt-8 relative z-30">
      {/* Exact Single White Floating Search Capsule */}
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/70 border border-slate-100 p-2 pl-4 md:pl-5">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2">
          {/* Left: Search Input Box with Search Icon and Clear 'X' */}
          <div className="relative flex-1 w-full flex items-center min-w-0">
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              value={localSearch}
              onChange={handleInputChange}
              placeholder="Search location, landmark or parking name..."
              className="w-full bg-transparent text-sm md:text-[15px] font-medium text-slate-800 placeholder-slate-400 focus:outline-none py-2 pr-8"
            />
            {localSearch && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors mr-2"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Section: City Selector + Yellow Search Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
            {/* Subtle Divider */}
            <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1" />

            {/* City Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-slate-600 rotate-45" />
                <span>{activeCity.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* City Dropdown Menu */}
              {cityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-fadeIn">
                  {CITIES.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => {
                        setActiveCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs md:text-sm font-semibold transition-colors ${
                        activeCity.id === city.id
                          ? 'bg-amber-50 text-amber-800'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bright Yellow Search Button matching screenshot */}
            <button
              type="submit"
              className="px-7 py-2.5 bg-[#f5b014] hover:bg-[#e09f0e] active:scale-95 text-slate-900 font-extrabold rounded-xl text-sm shadow-sm transition-all duration-150"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Filter Options Row sitting cleanly on the background directly below */}
      <div className="mt-3.5">
        <FilterPills />
      </div>
    </div>
  );
};

export default SearchFilter;
