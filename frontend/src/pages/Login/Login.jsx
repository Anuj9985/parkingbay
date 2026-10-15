import React, { useState } from 'react';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';
import { useAuthContext } from '../../context/AuthContext';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';

const Login = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login, register, user, logout, authError, setAuthError } = useAuthContext();

  // Tab: 'login' | 'register'
  const [tab, setTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);

  // Login form
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Register form
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', phone: '' });

  const handleTabSwitch = (t) => {
    setTab(t);
    setAuthError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email: loginForm.email, password: loginForm.password });
    } catch (_) {
      // error displayed via authError state
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({
        name: regForm.name,
        email: regForm.email,
        password: regForm.password,
        ...(regForm.phone ? { phone: regForm.phone } : {}),
      });
    } catch (_) {
      // error displayed via authError state
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsLoginModalOpen(false);
  };

  // ---- Logged-in account panel ----
  if (user) {
    return (
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="My Account"
      >
        <div className="flex flex-col items-center py-4 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 mb-3 shadow flex items-center justify-center">
            <User className="w-8 h-8 text-amber-600" />
          </div>
          <h4 className="text-lg font-bold text-slate-800">{user.name}</h4>
          <p className="text-sm text-slate-500">{user.email}</p>
          {user.phone && <p className="text-xs text-slate-400 mt-0.5">{user.phone}</p>}
          <span className="mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 capitalize">
            {user.role || 'user'}
          </span>
          <div className="w-full mt-6 pt-4 border-t border-slate-100 flex gap-3">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setIsLoginModalOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="dark"
              className="w-full"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onClose={() => { setIsLoginModalOpen(false); setAuthError(null); }}
      title="Welcome to ParkingBay"
    >
      {/* Tabs */}
      <div className="flex border-b border-slate-100 mb-5">
        <button
          onClick={() => handleTabSwitch('login')}
          className={`flex-1 py-2.5 text-sm font-bold transition-colors border-b-2 ${
            tab === 'login'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => handleTabSwitch('register')}
          className={`flex-1 py-2.5 text-sm font-bold transition-colors border-b-2 ${
            tab === 'register'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Register
        </button>
      </div>

      {/* Error */}
      {authError && (
        <div className="mb-4 flex items-start gap-2 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2.5 text-rose-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{authError}</span>
        </div>
      )}

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <p className="text-xs text-slate-500">
            Enter your registered email and password to access your bookings.
          </p>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
              <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
              <Lock className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-sm font-bold"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in…' : 'Login'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <p className="text-xs text-slate-500">
            Create your ParkingBay account to start booking parking spots.
          </p>

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
              <User className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={regForm.name}
                onChange={(e) => setRegForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Anuj Jadhav"
                className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
              <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="email"
                value={regForm.email}
                onChange={(e) => setRegForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Phone (optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mobile Number <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
              <Phone className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="tel"
                value={regForm.phone}
                onChange={(e) => setRegForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password <span className="font-normal text-slate-400">(min. 6 characters)</span>
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
              <Lock className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="password"
                value={regForm.password}
                onChange={(e) => setRegForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                minLength={6}
                className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-sm font-bold"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default Login;
