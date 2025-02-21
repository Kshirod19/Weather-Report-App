import React, { useState } from "react";
import Search from "./Search/Search";
import CurrentWeather from "./current-weather/CurrentWeather";
import Forecast from "./forecast/Forecast"; // Import the Forecast component
import Navbar from "./Navbar";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../api";
import { MdArrowForward } from "react-icons/md";

const AppBody = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForecast, setShowForecast] = useState(false); // New state to toggle forecast view

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setLoading(true);
    setError(null);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(
          `${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        ).then((res) => res.json()),
        fetch(
          `${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        ).then((res) => res.json()),
      ]);

      if (weatherResponse.cod !== 200 || forecastResponse.cod !== "200") {
        throw new Error(
          weatherResponse.message || "Failed to fetch weather data"
        );
      }

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full h-screen px-4 pt-20 pb-5 text-white bg-gradient-to-b from-blue-900 to-blue-600">
        {/* Search Box */}
        <Search onSearchChange={handleOnSearchChange} />

        {loading && (
          <p className="absolute px-6 py-3 text-xl font-bold text-white -translate-x-1/2 -translate-y-1/2 bg-blue-800 rounded-lg shadow-lg top-1/2 left-1/2">
            Fetching weather data...
          </p>
        )}

        {/* Error Message */}
        {error && <p className="mt-4 text-lg text-red-400">{error}</p>}

        {/* Current Weather */}
        {!showForecast && currentWeather && (
          <div className="flex flex-col items-center justify-center w-full max-w-3xl p-6 mt-6 shadow-xl bg-white/10 rounded-xl backdrop-blur-md">
            <CurrentWeather data={currentWeather} />
          </div>
        )}

        {/* Forecast Button */}
        {!showForecast && currentWeather && forecast && (
          <button
            className="flex items-center justify-center px-6 py-3 mt-6 font-semibold text-white transition-all duration-300 bg-blue-500 rounded-full shadow-lg hover:bg-blue-700"
            onClick={() => setShowForecast(true)} // Open forecast
          >
            View Forecast
            <MdArrowForward className="ml-2" />
          </button>
        )}

        {/* Forecast Section */}
        {showForecast && forecast && (
          <Forecast data={forecast} onClose={() => setShowForecast(false)} />
        )}
      </div>
    </>
  );
};

export default AppBody;
