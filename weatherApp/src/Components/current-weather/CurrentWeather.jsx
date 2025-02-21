import React from "react";

const CurrentWeather = ({ data }) => {
  if (!data || !data.main || !data.weather || !data.wind) {
    return <p className="text-sm text-white sm:text-lg">Loading weather data...</p>;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md gap-4 p-4 text-white transition-all duration-300 ease-in-out transform border shadow-lg sm:p-6 bg-gradient-to-br from-blue-500 to-blue-800 rounded-xl hover:scale-105 backdrop-blur-xl bg-opacity-30 border-white/20">
      
      {/* City and Temperature */}
      <div className="flex items-center gap-4">
        <p className="text-3xl font-extrabold sm:text-4xl drop-shadow-lg">{Math.round(data.main.temp)}°C</p>
        <div className="text-center">
          <p className="text-xl font-bold sm:text-2xl">{data.city}</p>
          <p className="text-sm capitalize sm:text-base opacity-90">{data.weather[0].description}</p>
        </div>
      </div>

      {/* Weather Icon */}
      <img
        className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg animate-pulse"
        src={`Weathers/${data.weather[0].icon}.png`}
        alt={`Weather condition: ${data.weather[0].description}`}
      />

      {/* Additional Weather Details */}
      <div className="grid w-full grid-cols-2 gap-4 text-center">
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium underline sm:text-base opacity-80">Feels Like</p>
          <p className="text-sm font-semibold sm:text-base">{Math.round(data.main.feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium underline sm:text-base opacity-80">Humidity</p>
          <p className="text-sm font-semibold sm:text-base">{data.main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium underline sm:text-base opacity-80">Wind Speed</p>
          <p className="text-sm font-semibold sm:text-base">{data.wind.speed} m/s</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium underline sm:text-base opacity-80">Pressure</p>
          <p className="text-sm font-semibold sm:text-base">{data.main.pressure} hPa</p>
        </div>
      </div>

      {/* Visibility */}
      <p className="text-xs font-light sm:text-sm opacity-80">Visibility: {data.visibility / 1000} km</p>
    </div>
  );
};

export default CurrentWeather;
