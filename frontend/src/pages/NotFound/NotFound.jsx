import React from 'react';
import Button from '../../components/common/Button/Button';
import { useApp } from '../../context/AppContext';

const NotFound = () => {
  const { setActiveNav } = useApp();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center text-[#f5b014] text-4xl font-extrabold mb-4">
        404
      </div>
      <h3 className="text-xl font-bold text-slate-800">Page Not Found</h3>
      <p className="text-sm text-slate-500 mt-1 mb-6 max-w-sm">
        The parking view or resource you are looking for does not exist or has been moved.
      </p>
      <Button onClick={() => setActiveNav('home')}>
        Return to Home Map
      </Button>
    </div>
  );
};

export default NotFound;
