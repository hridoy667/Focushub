import React, { useState, useEffect } from 'react';

const WeatherWidget = ({ defaultCity = "London" }) => {
  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // IMPORTANT: In production, move this to a backend API route
  const API_KEY = 'ce3b595a4ecf19d41d1ae15bdab357ea'; // Replace with your key

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Weather</h2>
        <div className="flex items-center space-x-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-blue-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
            />
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          ⚠️ {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {weather && !loading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">{weather.name}, {weather.sys?.country}</h3>
              <p className="text-gray-500 capitalize">{weather.weather[0]?.description}</p>
            </div>
            {weather.weather[0]?.icon && (
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].main}
                className="w-16 h-16"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-2xl font-bold">{Math.round(weather.main?.temp)}°C</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Feels Like</p>
              <p className="text-2xl font-bold">{Math.round(weather.main?.feels_like)}°C</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-2xl font-bold">{weather.main?.humidity}%</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Wind</p>
              <p className="text-2xl font-bold">{weather.wind?.speed} m/s</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400 text-center">
        Powered by OpenWeather
      </div>
    </div>
  );
};

export default WeatherWidget;