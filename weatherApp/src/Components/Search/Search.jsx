import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import { IoSearch, IoClose } from "react-icons/io5";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
        geoApiOptions
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Check your API key.");
        } else if (response.status === 429) {
          throw new Error("Too Many Requests: Please wait before making more requests.");
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      }

      const data = await response.json();

      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (err) {
      console.error(err);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const handleClear = () => {
    setSearch(null);
    onSearchChange(null);
  };

  return (
    <div className="relative z-20 w-full max-w-lg px-4 md:px-0">
      <div className="flex items-center gap-3 px-5 py-3 transition-all duration-300 border rounded-full shadow-lg bg-white/20 backdrop-blur-lg border-white/30 hover:border-white/50 focus-within:border-white/70">
        <IoSearch className="text-xl text-white md:text-2xl opacity-80" />
        <AsyncPaginate
          className="w-full text-base font-normal text-white placeholder-white bg-transparent md:text-lg focus:outline-none"
          placeholder="Search for a city..."
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          styles={{
            control: (base) => ({
              ...base,
              background: "transparent",
              border: "none",
              boxShadow: "none",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            input: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "white",
            }),
            menu: (base) => ({
              ...base,
              background: "#1E3A8A",
              color: "white",
              borderRadius: "8px",
              padding: "5px",
            }),
            option: (base, { isFocused }) => ({
              ...base,
              background: isFocused ? "#3B82F6" : "transparent",
              color: "white",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "6px",
              transition: "background 0.2s ease-in-out",
            }),
          }}
        />
        {search && (
          <IoClose
            className="text-xl text-white transition-opacity duration-200 cursor-pointer md:text-2xl opacity-80 hover:opacity-100"
            onClick={handleClear}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
