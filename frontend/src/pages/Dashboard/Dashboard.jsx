import React from 'react';
import { useApp } from '../../context/AppContext';
import { Car, Clock, ShieldCheck, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { activeCity } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Smart City Dashboard - {activeCity.name}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time parking analytics, occupancy rates, and occupancy forecast.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Capacity</p>
            <h4 className="text-xl font-extrabold text-slate-800">1,240 Slots</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Available Now</p>
            <h4 className="text-xl font-extrabold text-slate-800">485 Slots</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Avg Hourly Rate</p>
            <h4 className="text-xl font-extrabold text-slate-800">₹25/hr</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Active CCTV Bays</p>
            <h4 className="text-xl font-extrabold text-slate-800">100% Secure</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
