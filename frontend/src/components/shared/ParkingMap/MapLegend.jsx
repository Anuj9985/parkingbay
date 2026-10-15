import React from 'react';
import { MAP_LEGEND_ITEMS } from '../../../utils/constants';

const MapLegend = () => {
  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-slate-200/80 text-xs font-semibold text-slate-700 select-none">
      {MAP_LEGEND_ITEMS.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${item.dotClass}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MapLegend;
