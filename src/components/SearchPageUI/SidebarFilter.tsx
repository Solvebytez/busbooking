import { cn } from "@/lib/utils";
import {
  AirVent,
  Armchair,
  Bed,
  CloudMoon,

  Moon,
  Sun,
  Sunrise,
} from "lucide-react";
import React from "react";

import "react-range-slider-input/dist/style.css";

import { SideBarFilterOption, useStore } from "@/store/storeFilterData";
import PriceRangeFilter from "../Input/PriceRange";

const FilterComponent = () => {
  // Use Zustand store to manage selected values
  const {
    selectedBusTypes,
    selectedDepartureTimes,
    setSelectedBusTypes,
    setSelectedDepartureTimes,
    clearAll,
  } = useStore();

  const busTypes: SideBarFilterOption[] = ["AC", "Non AC", "Seater", "Sleeper"];
  const departureTimes: SideBarFilterOption[] = [
    "isBeforeTen",
    "tenToFive",
    "fiveToEleven",
    "afterEleven",
  ];


  const toggleSelection = (
    item: SideBarFilterOption,
    selected: SideBarFilterOption[],
    setSelected: (selected: SideBarFilterOption[]) => void
  ) => {
    if (selected[0] === item) {
      // Remove the item if it is already selected
      setSelected([]);
    } else {
      // Otherwise, set the selected item
      setSelected([item]);
    }
  };

  console.log("selectedDepartureTimes",selectedBusTypes)

  return (
    <div className="p-2 w-full bg-white border rounded-lg shadow-md">
      {/* Filter By Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="font-semibold text-secondary">Filter By</h2>
        <button
          onClick={clearAll}
          className="text-blue-600 hover:underline font-bold"
        >
          Clear All
        </button>
      </div>

      {/* Bus Type Section */}
      <div className="mb-6 p-3 bg-secondary/15 rounded-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-secondary">Bus Type</h3>
          {/* <button
            onClick={() => {
              // clearAll(setSelectedBusTypes)
            }}
            className="text-blue-600 hover:underline font-bold"
          >
            Clear All
          </button> */}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {busTypes.map((type) => (
            <button
              key={type}
              onClick={() =>
                toggleSelection(type, selectedBusTypes, setSelectedBusTypes)
              }
              className={`p-2 flex flex-col items-center justify-center border rounded ${
                selectedBusTypes.includes(type)
                  ? "bg-secondary text-white"
                  : "bg-white"
              }`}
            >
              {type === "AC" && (
                <AirVent
                  size={23}
                  className={cn(
                    "",
                    selectedBusTypes.includes(type)
                      ? "text-white"
                      : "text-secondary"
                  )}
                />
              )}
              {type === "Non AC" && (
                <AirVent
                  size={23}
                  className={cn(
                    "",
                    selectedBusTypes.includes(type)
                      ? "text-white"
                      : "text-secondary"
                  )}
                />
              )}
              {type === "Seater" && (
                <Armchair
                  size={23}
                  className={cn(
                    "",
                    selectedBusTypes.includes(type)
                      ? "text-white"
                      : "text-secondary"
                  )}
                />
              )}
              {type === "Sleeper" && (
                <Bed
                  size={23}
                  className={cn(
                    "",
                    selectedBusTypes.includes(type)
                      ? "text-white"
                      : "text-secondary"
                  )}
                />
              )}
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Departure Time Section */}
      <div className="mb-6 p-3 bg-secondary/15 rounded-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-secondary">Departure Time</h3>
          {/* <button
            onClick={() => {
              // clearAll(setSelectedDepartureTimes)
            }}
            className="text-blue-600 hover:underline font-bold"
          >
            Clear All
          </button> */}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {departureTimes.map((time) => (
            <button
              key={time}
              onClick={() =>
                toggleSelection(
                  time,
                  selectedDepartureTimes,
                  setSelectedDepartureTimes
                )
              }
              className={`p-2 flex flex-col items-center justify-center border rounded ${
                selectedDepartureTimes.includes(time)
                  ? "bg-secondary text-white"
                  : "bg-white"
              }`}
            >
              {time === "isBeforeTen" && (
                <Sunrise
                  size={23}
                  className={cn(
                    "",
                    selectedDepartureTimes.includes(time)
                      ? "text-white"
                      : "text-secondary"
                  )}
                />
              )}
              {time === "tenToFive" && (
                <Sun
                  size={23}
                  className={cn(
                    "",
                    selectedDepartureTimes.includes(time)
                      ? "text-white"
                      : "text-secondary"
                  )}
                />
              )}
              {time === "fiveToEleven" && (
                <CloudMoon
                  size={23}
                  className={cn(
                    "",
                    selectedDepartureTimes.includes(time)
                      ? "text-white"
                      : "text-secondary"
                  )}
                />
              )}
              {time === "afterEleven" && (
                <Moon
                  size={23}
                  className={cn(
                    "",
                    selectedDepartureTimes.includes(time)
                      ? "text-white"
                      : "text-secondary"
                  )}
                />
              )}
              {/* TEXT */}
              {time === "tenToFive" && "10AM to 5PM"}
              {time === "isBeforeTen" && "Before-10AM"}
              {time === "fiveToEleven" && "5PM-11PM"}
              {time === "afterEleven" && "After-11PM"}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <PriceRangeFilter />
      {/* <div className="mb-4 bg-secondary/15 px-2 py-2 rounded-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-secondary">Price Range</h3>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex justify-between text-secondary font-semibold mt-2 w-full my-4">
            <div className="border border-secondary flex items-center justify-center w-[30%] h-[45px] rounded-sm">
              <IndianRupee size={14} />
              <input
                value={pricevalue[0]}
                onChange={() => {}}
                type="text"
                className="text-center rounded-sm w-[100%] h-full focus:border-none border-none focus:outline-none !focus-visible:ring-0 px-2"
              />
            </div>
            <div className="border border-secondary flex items-center justify-center w-[30%] rounded-sm">
              <IndianRupee size={14} />
              <input
                value={pricevalue[1]}
                onChange={() => {}}
                type="text"
                className="text-center rounded-sm w-[100%] h-full focus:border-none border-none focus:outline-none !focus-visible:ring-0 px-2"
              />
            </div>
          </div>
          <RangeSlider
            className="single-thumb"
            defaultValue={[0, 50]}
            thumbsDisabled={[true, false]}
            rangeSlideDisabled={true}
            onValueChange={() => {}}
          />
          <div className="flex justify-between text-secondary font-semibold mt-2">
            <span>{pricevalue[0]}</span>
            <span>{pricevalue[1]}</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FilterComponent;
