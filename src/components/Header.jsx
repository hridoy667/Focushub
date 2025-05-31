import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          {/* Logo with smooth hover effect */}
          <img
            src={logo}
            alt="FocusHub Logo"
            className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-110"
          />
          
          {/* Site title with better typography */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            <span className="text-yellow-500">Focus</span>
            <span className="text-white">Hub</span>
            </h1>
            <p className="text-sm md:text-base text-blue-100 mt-1">
              Productivity • Weather • Inspiration
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;