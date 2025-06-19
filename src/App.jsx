import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskManager from './components/TaskManager/TaskManager';
import QuoteGenerator from './components/QuoteGenerator';
import WeatherView from './components/WeatherView';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const backgroundClass = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';

  if (showSplash) return <SplashScreen />;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${backgroundClass}`}>
      {/* Pass toggleDarkMode to header */}
      <Header onToggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <TaskManager/>
          </div>
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
