import { cn } from "@/lib/utils";
import {
  AirVent,
  Armchair,
  Bed,
  CloudMoon,

  Moon,
  Square,
  SquareCheck,
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
    <div className="p-4 w-full bg-white border rounded-sm">
      {/* Filter By Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-0">
        <h2 className="font-semibold uppercase text-[13px] text-gray-700">Filter By</h2>
        <button
          onClick={clearAll}
          className="text-blue-500 hover:underline font-semibold uppercase text-[13px]"
        >
          Clear All
        </button>
      </div>

      {/* Bus Type Section */}
      <div className=" py-3 rounded-sm mb-0">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold uppercase text-[13px] text-gray-700">Bus Types</h3>
          {/* <button
            onClick={() => {
              // clearAll(setSelectedBusTypes)
            }}
            className="text-blue-500 hover:underline font-bold"
          >
            Clear All
          </button> */}
        </div>
        <div className="grid grid-cols-1 gap-1">
          {busTypes.map((type) => (
            <button
              key={type}
              onClick={() =>
                toggleSelection(type, selectedBusTypes, setSelectedBusTypes)
              }
              className={`pb-2 flex gap-1 items-center justify-start rounded text-xs text-gray-500 ${
                selectedBusTypes.includes(type)
                  ? " text-gray-500"
                  : "bg-white"
              }`}
            >
              {
                  selectedBusTypes.includes(type)
                  ?  <SquareCheck size={16} />
                  : <Square size={16} className="text-gray-400" />
              }
              {type === "AC" && (
                <AirVent
                  size={15}
                  className={cn(
                    "",
                    selectedBusTypes.includes(type)
                      ? "text-gray-500"
                      : "text-gray-500"
                  )}
                />
              )}
              {type === "Non AC" && (
                <AirVent
                  size={15}
                  className={cn(
                    "",
                    selectedBusTypes.includes(type)
                      ? "text-gray-500"
                      : "text-gray-500"
                  )}
                />
              )}
              {type === "Seater" && (
                <Armchair
                  size={15}
                  className={cn(
                    "",
                    selectedBusTypes.includes(type)
                      ? "text-gray-500"
                      : "text-gray-500"
                  )}
                />
              )}
              {type === "Sleeper" && (
                <Bed
                  size={15}
                  className={cn(
                    "",
                    selectedBusTypes.includes(type)
                      ? "text-gray-500"
                      : "text-gray-500"
                  )}
                />
              )}
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Departure Time Section */}
      <div className="mb-0 rounded-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold uppercase text-[13px] text-gray-700">Departure Time</h3>
          {/* <button
            onClick={() => {
              // clearAll(setSelectedDepartureTimes)
            }}
            className="text-blue-500 hover:underline font-bold"
          >
            Clear All
          </button> */}
        </div>
        <div className="grid grid-cols-1 gap-1">
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
              className={`pb-2 flex gap-1 items-center justify-start rounded text-xs text-gray-500 ${
                selectedDepartureTimes.includes(time)
                  ? "text-gray-500"
                  : "bg-white"
              }`}
            >
               {
                  selectedDepartureTimes.includes(time)
                  ?  <SquareCheck size={16} />
                  : <Square size={16} className="text-gray-400" />
              }
              {time === "isBeforeTen" && (
                <Sunrise
                  size={15}
                  className={cn(
                    "",
                    selectedDepartureTimes.includes(time)
                      ? "text-gray-500"
                      : "text-gray-500"
                  )}
                />
              )}
              {time === "tenToFive" && (
                <Sun
                  size={15}
                  className={cn(
                    "",
                    selectedDepartureTimes.includes(time)
                      ? "text-gray-500"
                      : "text-gray-500"
                  )}
                />
              )}
              {time === "fiveToEleven" && (
                <CloudMoon
                  size={15}
                  className={cn(
                    "",
                    selectedDepartureTimes.includes(time)
                      ? "text-gray-500"
                      : "text-gray-500"
                  )}
                />
              )}
              {time === "afterEleven" && (
                <Moon
                  size={15}
                  className={cn(
                    "",
                    selectedDepartureTimes.includes(time)
                      ? "text-gray-500"
                      : "text-gray-500"
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
      {/* <div className="mb-4 bg-gray-500/15 px-2 py-2 rounded-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-500">Price Range</h3>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex justify-between text-gray-500 font-semibold mt-2 w-full my-4">
            <div className="border border-gray-500 flex items-center justify-center w-[30%] h-[45px] rounded-sm">
              <IndianRupee size={14} />
              <input
                value={pricevalue[0]}
                onChange={() => {}}
                type="text"
                className="text-center rounded-sm w-[100%] h-full focus:border-none border-none focus:outline-none !focus-visible:ring-0 px-2"
              />
            </div>
            <div className="border border-gray-500 flex items-center justify-center w-[30%] rounded-sm">
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
          <div className="flex justify-between text-gray-500 font-semibold mt-2">
            <span>{pricevalue[0]}</span>
            <span>{pricevalue[1]}</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FilterComponent;
