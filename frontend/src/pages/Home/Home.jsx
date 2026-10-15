import React from 'react';
import SearchFilter from '../../components/shared/SearchFilter/SearchFilter';
import ParkingList from '../../components/shared/ParkingList/ParkingList';
import ParkingMap from '../../components/shared/ParkingMap/ParkingMap';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Floating Search & Category Filter Section */}
      <SearchFilter />

      {/* Main Split Content: Left List + Right Interactive Map */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8">
        <div className="home-split-layout">
          {/* Left Column: Parking Spot Cards */}
          <div className="w-full">
            <ParkingList />
          </div>

          {/* Right Column: Interactive Map */}
          <div className="w-full">
            <ParkingMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
