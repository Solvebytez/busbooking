'use client'

import { cn } from "@/lib/utils"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"

export type CityPropsType = {
  id: number
  city_name: string
}

const SearchableDropdown = ({
  cities,
  values,
  OnChange,
  lebelText1,
  labelText2,
  isError,
  isDisabled,
}: {
  cities: CityPropsType[]
  values: CityPropsType | null
  OnChange: (val: CityPropsType) => void
  lebelText1: string
  labelText2: string
  isError?: string
  isDisabled?: boolean
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredCities, setFilteredCities] = useState<CityPropsType[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.city_name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCities(filtered.slice(0, 100)) // Limit to first 100 results
    } else {
      setFilteredCities([])
    }
  }, [cities])

  const handleSelectCity = useCallback((city: CityPropsType) => {
    OnChange(city)
    setShowDropdown(false)
    setSearchTerm("")
    setFilteredCities([])
  }, [OnChange])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className="relative w-full">
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
        <span className={cn("text-gray-500 text-xs", isError && "text-red-600")}>
          {labelText2} {isError && "- Required*"}
        </span>
        <span className="text-gray-900 w-[150px] line-clamp-1">
          {values?.city_name || lebelText1}
        </span>
      </div>
      {showDropdown && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="flex items-center p-2 border-b border-gray-200">
            <AiOutlineSearch className="text-gray-500 mr-2" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Your City Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full outline-none text-gray-700"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <div
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-700"
                >
                  {city.city_name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">
                {searchTerm ? "No cities found" : "Type to search cities"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchableDropdown

