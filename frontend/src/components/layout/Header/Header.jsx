import React from 'react';
import { User } from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';

const Header = () => {
  const { user, setIsLoginModalOpen } = useAuthContext();
  const { activeCity } = useApp();

  return (
    <header className="relative w-full h-48 md:h-56 bg-slate-900 overflow-hidden select-none">
      {/* Background Hero Image with Dusk Overlay matching the image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        {/* Gradient overlays to achieve the exact twilight/sunset tone with the dark architecture */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-amber-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
      </div>

      {/* Header Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-between py-6">
        {/* Top Bar with Login Button */}
        <div className="flex justify-end items-center">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 bg-white/95 hover:bg-white text-slate-800 rounded-full text-xs md:text-sm font-semibold shadow-md transition-all duration-150 hover:shadow-lg active:scale-95 border border-white/40"
          >
            <User className="w-3.5 h-3.5 text-slate-700" />
            <span>{user ? user.name : 'Login'}</span>
          </button>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="mb-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            Find Parking in{' '}
            <span className="text-[#f5b014]">{activeCity.name}</span>
          </h2>
          <p className="text-slate-200 text-sm md:text-base font-medium mt-1 drop-shadow">
            Easy Parking. Happier Journeys.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
