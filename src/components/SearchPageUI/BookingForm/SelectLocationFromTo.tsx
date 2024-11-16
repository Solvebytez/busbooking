"use client";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export type CityPropsType = {
  value: string;
  label: string;
  datakey: string;
};

const SelectLocationFromTo = ({
  cities,
  values,
  OnChange,
  lebelText1,
  selectFor,
  isError,
}: {
  cities: CityPropsType[];
  values: string;
  OnChange: (val: string) => void;
  lebelText1: string;
  isError?: string;
  selectFor: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(values);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setSearchTerm(e.target.value);
  // };

  const handleSelectCity = (city: React.SetStateAction<string>) => {
    OnChange(city as string);
    setShowDropdown(false);
    setSearchTerm("");
  };

  const clearSelection = () => {
    setSelectedCity(""); // Clear the selected city
    setSearchTerm(""); // Clear the search term
    setShowDropdown(false);
  };

  const filteredCities = cities.filter((city: CityPropsType) =>
    city.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
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
        onClick={() => setShowDropdown(!showDropdown)}
        className={cn(
          "flex flex-col items-start bg-white border border-gray-600 rounded-lg p-2 cursor-pointer h-[3.7rem] pl-2",
          isError && "text-red-600 border-red-600"
        )}
      >
        {/* <span className={cn("text-gray-500 text-xs", isError && "text-red-600",)}>
         {labelText2}  {isError && "- Required*"}
        </span> */}
        <span className="text-gray-700 line-clamp-3 flex items-center gap-3 leading-10 font-bold justify-between w-full">
          <div className="line-clamp-3 flex items-center gap-3 leading-10 font-bold">
            {selectFor === "pick-up" ? (
              <TrendingUp size={18} />
            ) : (
              <TrendingDown size={18} />
            )}
            {values || lebelText1}
          </div>
          {showDropdown ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
        {/* Close Icon to Clear Selection */}
      </div>
      {selectedCity && (
        <AiOutlineClose
          onClick={clearSelection}
          className="text-gray-500 cursor-pointer ml-2 hidden"
        />
      )}
      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {/* Search Input Inside Dropdown */}
          {/* <div className="flex items-center p-2 border-b border-gray-200">
            <AiOutlineSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Your City Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full outline-none text-gray-700"
            />
          </div> */}
          {/* City Options */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city: CityPropsType) => (
                <div
                  key={city.label}
                  onClick={() => handleSelectCity(city.label)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-700"
                >
                  {city.label}
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

export default SelectLocationFromTo;
