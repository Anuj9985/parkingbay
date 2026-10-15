import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button/Button';
import { User, Phone, Mail, Shield, Car } from 'lucide-react';

const Profile = () => {
  const { user, setIsLoginModalOpen } = useAuthContext();

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
        <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">You are not logged in</h3>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Please login to view and edit your profile details, vehicles, and booking history.
        </p>
        <Button onClick={() => setIsLoginModalOpen(true)} className="w-full">
          Login Now
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-2xl border-2 border-amber-400 object-cover shadow"
          />
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-500 font-medium">Kolhapur Resident • FastTag Enabled</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <Phone className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase">Phone Number</p>
              <p className="text-sm font-bold text-slate-800">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <Mail className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase">Email Address</p>
              <p className="text-sm font-bold text-slate-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <Car className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase">Registered Vehicle</p>
              <p className="text-sm font-bold text-slate-800">MH 09 AB 1234 (SUV)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <Shield className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase">Account Verification</p>
              <p className="text-sm font-bold text-emerald-600">KYC Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
