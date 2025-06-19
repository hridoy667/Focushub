import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import TaskManager from './components/TaskManager/TaskManager';
import QuoteGenerator from './components/QuoteGenerator';
import WeatherView from './components/WeatherView';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    return !hasSeenSplash; // showSplash = true if not seen
  });

  useEffect(() => {
    let timer;
    if (showSplash) {
      sessionStorage.setItem('hasSeenSplash', 'true');
      timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);
    }

    return () => clearTimeout(timer); // always clear timeout
  }, [showSplash]);

  if (showSplash) return <SplashScreen />;

  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-300 via-purple-200 to-blue-100 bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Task Manager (2/3 width) */}
          <div className="w-full lg:w-2/3">
            <TaskManager />
          </div>

          {/* Sidebar (1/3 width) */}
          <div className="w-full lg:w-1/3 space-y-6">
            <WeatherView />
            <QuoteGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
