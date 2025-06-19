import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = 'ce3b595a4ecf19d41d1ae15bdab357ea'; // Replace with your own key

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Unable to fetch weather');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        console.error(err);
        setError('Location access denied. Please turn on location.');
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="bg-transparent rounded-lg shadow-md p-6 max-w-sm w-full">

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        weather && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">
                  {weather.name}, {weather.sys?.country}
                </h3>
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
              <div className="bg-transparent p-3 rounded-md ">
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="text-2xl font-bold">{Math.round(weather.main?.temp)}°C</p>
              </div>
              <div className="bg-transparent p-3 rounded-md ">
                <p className="text-sm text-gray-500">Feels Like</p>
                <p className="text-2xl font-bold">{Math.round(weather.main?.feels_like)}°C</p>
              </div>
              <div className="bg-transparent p-3 rounded-md ">
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="text-2xl font-bold">{weather.main?.humidity}%</p>
              </div>
              <div className="bg-transparent p-3 rounded-md">
                <p className="text-sm text-gray-500">Wind</p>
                <p className="text-2xl font-bold">{weather.wind?.speed} m/s</p>
              </div>
            </div>
          </div>
        )
      )}

      <p className="text-xs text-gray-400 mt-4 text-center">
        Powered by OpenWeather
      </p>
    </div>
  );
};

export default WeatherWidget;
