import React from 'react';
import { 
  LayoutGrid, 
  Navigation, 
  Car, 
  Bike, 
  Building, 
  Sun, 
  Zap 
} from 'lucide-react';
import { FILTER_CATEGORIES } from '../../../utils/constants';
import { useApp } from '../../../context/AppContext';

const ICON_MAP = {
  LayoutGrid,
  Navigation,
  Car,
  Bike,
  Building,
  Sun,
  Zap,
};

const FilterPills = () => {
  const { activeFilter, setActiveFilter, setSearchQuery } = useApp();

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    // Clicking "All Parking" resets any active search so all locations immediately reappear!
    if (filterId === 'all') {
      setSearchQuery('');
    }
  };

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto py-1 custom-scrollbar no-scrollbar">
      {FILTER_CATEGORIES.map((cat) => {
        const Icon = ICON_MAP[cat.icon];
        const isActive = activeFilter === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => handleFilterClick(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-150 select-none ${
              isActive
                ? 'bg-[#0f172a] text-white shadow-sm ring-1 ring-slate-900'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-sm'
            }`}
          >
            {Icon && (
              <Icon 
                className={`w-4 h-4 shrink-0 ${
                  cat.id === 'ev_charging' 
                    ? 'text-emerald-500 fill-emerald-500' 
                    : isActive ? 'text-white' : 'text-slate-600'
                }`} 
              />
            )}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterPills;
