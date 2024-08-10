import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const AppBody = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCityChange = async (event) => {
    const input = event.target.value;
    setCity(input);

    if (input.length > 1) {
      setIsLoading(true);
      try {
        const url = `https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&appid=80227594a0b210de78b510d7fada0403`;
        console.log("Request URL:", url); // Debugging URL
        const response = await axios.get(url);
        const { list } = response.data;
        setSuggestions(list);
      } catch (error) {
        console.error(
          "Error fetching city suggestions",
          error.response?.data || error.message
        );
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=80227594a0b210de78b510d7fada0403`
      );
      setWeather(response.data);
      setSuggestions([]);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error fetching weather data",
        error.response?.data || error.message
      );
    }
  };

  const handleClick = () => {
    fetchWeather(city);
  };

  const handleSuggestionClick = (suggestedCity) => {
    setCity(suggestedCity.name);
    fetchWeather(suggestedCity.name);
  };

  return (
    <div className="bg-color3 flex justify-center items-center h-[94vh] w-full">
      <div className="bg-color5 h-[450px] p-5 rounded-md box-border md:h-[650px] md:w-[650px] lg:w-[950px] lg:px-10">
        <div className="bg-color1 px-5 py-2 w-auto h-auto rounded-2xl flex items-center gap-3 box-border">
          <input
            className="font-medium text-xl px-3 py-2 outline-none text-black w-full rounded-xl"
            type="text"
            placeholder="Search"
            value={city}
            onChange={handleCityChange}
          />
          <button onClick={handleClick}>
            <FaSearch className="text-2xl" />
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {suggestions.length > 0 && !isLoading && (
          <ul className="absolute bg-white text-black rounded-lg mt-2 shadow-lg w-1/2">
            {suggestions.map((suggestedCity) => (
              <li
                key={suggestedCity.id}
                onClick={() => handleSuggestionClick(suggestedCity)}
                className="px-4 py-2 cursor-pointer text-black hover:bg-gray-200 rounded-lg"
              >
                {suggestedCity.name}, {suggestedCity.sys.country}
              </li>
            ))}
          </ul>
        )}
        {weather && (
          <div className="text-white flex flex-col gap-4 items-center h-4/5 justify-end p-3 box-border lg:justify-center md:justify-center">
            <h3 className="text-3xl font-bold lg:text-5xl">
              {weather.name}, {weather.sys.country}
            </h3>

            <h4 className="text-2xl lg:text-3xl font-medium">
              {(weather.main.temp - 273.15).toFixed(2)}°C
            </h4>
            <h5 className="text-3xl lg:text-4xl font-medium">
              {weather.weather[0].description}
            </h5>
            <div className="weather photo"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBody;
