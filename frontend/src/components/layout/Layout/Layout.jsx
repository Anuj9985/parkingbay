import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../../../pages/Login/Login';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f1f5f9] text-slate-800">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />
        
        {/* Main Content Frame */}
        <main className="flex-1 pb-10">
          {children}
        </main>

        <Footer />
      </div>

      {/* Login Modal mounted globally */}
      <Login />
    </div>
  );
};

export default Layout;
