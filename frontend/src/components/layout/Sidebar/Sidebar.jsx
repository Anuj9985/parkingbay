import React from 'react';
import { 
  Home, 
  Map, 
  List, 
  Calendar, 
  Heart, 
  Info, 
  HelpCircle 
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'map', label: 'Map View', icon: Map },
  { id: 'list', label: 'Parking List', icon: List },
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'about', label: 'About Kolhapur', icon: Info },
  { id: 'support', label: 'Help & Support', icon: HelpCircle },
];

const Sidebar = () => {
  const { activeNav, setActiveNav } = useApp();

  return (
    <aside className="w-64 bg-[#0a0f1d] text-white flex flex-col shrink-0 min-h-screen relative overflow-hidden select-none border-r border-slate-900/60 z-30">
      {/* Brand Header */}
      <div className="p-6 pb-6 relative z-10">
        <div className="flex items-center gap-3">
          {/* Teardrop Map Pin Logo with 'P' matching screenshot */}
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            <div
              style={{
                backgroundColor: '#f5b014',
                width: '36px',
                height: '36px',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(245, 176, 20, 0.35)',
              }}
            >
              <span
                style={{
                  transform: 'rotate(45deg)',
                  color: '#0a0f1d',
                  fontWeight: '900',
                  fontSize: '18px',
                  fontFamily: 'sans-serif',
                }}
              >
                P
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center font-sans">
              ParkingBay
            </h1>
            <p className="text-[8.5px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
              PARK SMART, EXPLORE MORE.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1 relative z-10">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-150 text-left ${
                isActive
                  ? 'bg-[#f5b014] text-[#0a0f1d] shadow-lg shadow-amber-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon 
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[#0a0f1d] stroke-[2.5]' : 'text-slate-400 stroke-[1.8]'
                }`} 
              />
              <span className="tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Architectural Temple Tower Artwork matching the image */}
      <div className="relative mt-auto w-full h-56 pointer-events-none select-none overflow-hidden">
        {/* Subtle dusk glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-600/25 via-amber-950/10 to-transparent" />
        
        {/* Kolhapur Temple Tower Architecture Silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full opacity-70"
          viewBox="0 0 240 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="templeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#b45309" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Majestic Temple Shikhara & Spire silhouette */}
          <path
            d="M 60,220 L 60,170 L 68,170 L 68,140 L 74,140 L 74,110 L 80,110 L 80,80 L 86,80 L 86,55 L 90,55 L 90,30 L 92,15 L 94,30 L 94,55 L 98,55 L 98,80 L 104,80 L 104,110 L 110,110 L 110,140 L 116,140 L 116,170 L 124,170 L 124,220 Z"
            fill="url(#templeGrad)"
          />
          {/* Temple carved pillars & tiers */}
          <rect x="76" y="90" width="32" height="6" rx="2" fill="#fde047" opacity="0.6" />
          <rect x="72" y="120" width="40" height="6" rx="2" fill="#fde047" opacity="0.6" />
          <rect x="66" y="150" width="52" height="6" rx="2" fill="#fde047" opacity="0.6" />

          {/* Secondary flanking towers */}
          <path
            d="M 12,220 L 12,180 L 18,180 L 18,150 L 24,150 L 24,120 L 30,120 L 30,90 L 34,90 L 34,70 L 36,60 L 38,70 L 38,90 L 42,90 L 42,120 L 48,120 L 48,150 L 54,150 L 54,180 L 60,180 L 60,220 Z"
            fill="url(#templeGrad)"
            opacity="0.8"
          />

          <path
            d="M 126,220 L 126,185 L 132,185 L 132,155 L 138,155 L 138,130 L 144,130 L 148,100 L 150,85 L 152,100 L 156,130 L 162,130 L 162,155 L 168,155 L 168,185 L 174,185 L 174,220 Z"
            fill="url(#templeGrad)"
            opacity="0.65"
          />

          {/* Steps & Base Plinth */}
          <rect x="0" y="210" width="240" height="10" fill="#0f172a" opacity="0.9" />
          <rect x="10" y="200" width="220" height="10" fill="#1e293b" opacity="0.7" />
        </svg>

        {/* Ambient bottom dusk fog */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent" />
      </div>
    </aside>
  );
};

export default Sidebar;
