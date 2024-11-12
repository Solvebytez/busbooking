'use client'
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

export type CityPropsType={ 
    value: string; 
    label: string; 
    datakey: string 
}

const SearchableDropdown = ({ cities,values,OnChange,lebelText1,labelText2 }:{cities:CityPropsType[];values:string;OnChange:(val:string)=>void;lebelText1:string;labelText2:string}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(values);
  const [showDropdown, setShowDropdown] = useState(false);

//   const cities = [
//     "Aatingal", "Achampet", "Adoni", "Afzalpur", "Agumbe",
//     "Ahmed Nagar", "Ajjampura"
//   ];

  const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectCity = (city: React.SetStateAction<string>) => {
  
    OnChange(city as string)
    setShowDropdown(false);
    setSearchTerm('');
  };

  const clearSelection = () => {
    setSelectedCity(''); // Clear the selected city
    setSearchTerm('');    // Clear the search term
    setShowDropdown(false);
  };

  const filteredCities = cities.filter((city:CityPropsType) =>
    city.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-[18rem]">
      {/* Dropdown Toggle */}
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className={cn("flex flex-col items-start  border border-gray-600 rounded-lg p-2 cursor-pointer h-[3.7rem] pl-2",labelText2==="Going To"?'pl-8':'')}
      >
         <span className="text-gray-500 text-xs">
         {labelText2}
        </span>
        <span className="text-gray-900 w-[150px] line-clamp-1">
          {values || lebelText1}
        </span>
        {/* Close Icon to Clear Selection */}
        
      </div>
      {selectedCity && (
          <AiOutlineClose
            onClick={clearSelection}
            className="text-gray-500 cursor-pointer ml-2"
          />
        )}
      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {/* Search Input Inside Dropdown */}
          <div className="flex items-center p-2 border-b border-gray-200">
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
              filteredCities.map((city:CityPropsType) => (
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

export default SearchableDropdown;
