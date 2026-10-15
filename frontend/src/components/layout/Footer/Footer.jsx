import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 px-8 border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-700">ParkingBay</span>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </div>
      <div className="flex items-center gap-4 text-slate-400">
        <a href="#privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-slate-600 transition-colors">Terms of Service</a>
        <a href="#contact" className="hover:text-slate-600 transition-colors">Contact Support</a>
      </div>
    </footer>
  );
};

export default Footer;
