import React from 'react';

const Loader = ({ size = 'md', text = 'Loading parking spots...' }) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-full border-amber-500 border-t-transparent animate-spin`}
      />
      {text && <p className="text-xs font-medium text-slate-500">{text}</p>}
    </div>
  );
};

export default Loader;
