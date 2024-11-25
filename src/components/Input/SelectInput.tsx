"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export type CityPropsType = {
  id: string;
  city_name: string;
};

const SearchableDropdown = ({
  cities,
  values,
  OnChange,
  lebelText1,
  labelText2,
  isError,
  isDisabled,
}: {
  cities: CityPropsType[];
  values: CityPropsType | null;
  OnChange: (val: CityPropsType) => void;
  lebelText1: string;
  labelText2: string;
  isError?: string;
  isDisabled?: boolean
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedCity, setSelectedCity] = useState(values);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectCity = (city: CityPropsType) => {
    OnChange(city as CityPropsType);
    setShowDropdown(false);
    setSearchTerm("");
    // setSelectedCity(city)
  };

  // const clearSelection = () => {
  //   setSelectedCity(null); // Clear the selected city
  //   setSearchTerm(""); // Clear the search term
  //   setShowDropdown(false);
  // };

  const filteredCities = cities.filter((city: CityPropsType) =>
    city.city_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    const divElement = document.querySelector(".searchInput");

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      (!divElement || !divElement.contains(event.target as Node))
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  return (
    <div className="relative w-full">
      {/* Dropdown Toggle */}
      <div

        ref={dropdownRef}
        onClick={() => !isDisabled && setShowDropdown(true)}
        className={cn(
          "flex flex-col items-start bg-white border border-gray-600 rounded-lg p-2 cursor-pointer h-[3.7rem] pl-2",
          labelText2 === "Going To" ? "pl-8" : "",
          isError && "text-red-600 border-red-600",
          isDisabled && "cursor-not-allowed pointer-events-none opacity-45"
        )}
      >
        <span
          className={cn("text-gray-500 text-xs", isError && "text-red-600")}
        >
          {labelText2} {isError && "- Required*"}
        </span>
        <span className="text-gray-900 w-[150px] line-clamp-1">
          {values?.city_name || lebelText1}
        </span>
        {/* Close Icon to Clear Selection */}
      </div>
      {/* {selectedCity && (
        <AiOutlineClose
          onClick={clearSelection}
          className="text-gray-500 cursor-pointer ml-2"
        />
      )} */}
      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {/* Search Input Inside Dropdown */}
          <div className="flex items-center p-2 border-b border-gray-200 searchInput">
            <AiOutlineSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Your City Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full outline-none text-gray-700"
            />
          </div>
          {/* City Options */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city: CityPropsType) => (
                <div
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-700"
                >
                  {city.city_name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No cities found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
