/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import TripFilterHeader from "./TripFilterHeader";
import SearchForm from "./SearchForm";
import SidebarFilter from "./SidebarFilter";
import { ChevronDown, ChevronUp, LocateFixed } from "lucide-react";
import AdditionalBusInfo from "./SearchAdditionalComp/AdditionalBusInfo";
import {
  cn, 
  formatDateToIST, 
  getLowestPrice,
  parseCityData,
} from "@/lib/utils";
// import BusInfoModal from "./SearchAdditionalComp/BusInfoModal";
import useFilterData, {
  BusService,
  FilterData,
} from "@/ClientApi/scheduleList";
import { CityPropsType } from "../Input/SelectInput";
import { useStore } from "@/store/storeFilterData";
// import { DateFormatter } from "../Global/DateFormatter";
import { usePriceRangeStore } from "@/store/priceRange";

import BusSkeletonList from "@/app/search/BusDetailsSkeleton";

export const options = [
  "Boarding Points",
  "Cancellation Policy",
  "Dropping Points",
  "Via Cities",
  "Amenities",
  "Bus Pictures",
  "Select Berth",
];

export type TripDetailsQueryProps = {
  destination: number;
  onward_date: string;
  origin: number;
};

const SearchResultConatiner = () => {
  const [schedulesList, setschedulesList] = useState<BusService[]>([]);
  const [allcityList, setAllCityList] = useState<CityPropsType[]>([]);
  const [openItems, setOpenItems] = useState<Record<any, any>>({});

  const { selectedBusTypes, selectedDepartureTimes } = useStore();
  const {maxPrice,minPrice}= usePriceRangeStore()

  const [prevScheduleId, setPrevScheduleId] = useState<string | null>(null);

  const handleClick = useCallback(
    (scheduleId: any, item: string) => {
      setOpenItems((prev) => {
        // If clicking a different schedule, close previous items
        if (prevScheduleId !== scheduleId) {
          setPrevScheduleId(scheduleId);
          return {
            [scheduleId]: item,
          };
        }

        // Same schedule, toggle current item
        return {
          ...prev,
          [scheduleId]: prev[scheduleId] === item ? "" : item,
        };
      });
    },
    [prevScheduleId]
  );

  const [filterData, setFilterData] = useState<FilterData>({
    destination: Number(825),
    onward_date: new Date().toISOString().split("T")[0],
    origin: Number(1273),
    // bus_type:"",
    // bus_time: "",
    // // "price_range_min": ,
    // // "price_range_max": 600
  });

  console.log("prevScheduleId", prevScheduleId);

  // Use the query hook
  const { data, error, isLoading } = useFilterData({
    ...filterData,
    ...(selectedBusTypes.length > 0 && { bus_type: selectedBusTypes[0] }),
    ...(selectedDepartureTimes.length > 0 && { bus_time: selectedDepartureTimes[0] }),
    price_range_min: minPrice,
    price_range_max:maxPrice
  });
  useEffect(() => {
    if (data) {
      setschedulesList(data.data);
    }
  }, [data]);

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  // if(isLoading) {
  //   return <div>Loading...</div>;
  // }

  console.log("schedulesList", schedulesList);

  return (
    <div>
      <SearchForm
        setFilterData={setFilterData}
        getAllCityList={setAllCityList!}
      />
    
      <div className="px-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
        <div className="w-full md:px-[1rem] xl:px-[4rem]">
          <div className="flex gap-4">
            <div className="flex flex-col w-[20%] mb-10 mt-5">
              <SidebarFilter/>
            </div>
            <div className="col-span-9  w-[80%]">
            <TripFilterHeader schedulesListCount={schedulesList.length} />
              {isLoading
                ? (<BusSkeletonList/>)
                : schedulesList?.map((schedule) => {
                    const boardingStages =
                      allcityList &&
                      parseCityData(schedule.boarding_stages, allcityList);
                    const dropoffStages =
                      allcityList &&
                      parseCityData(schedule.dropoff_stages, allcityList);

                    return (
                      <div
                        key={schedule.id}
                        className="shadow-none px-3 pt-3 bg-white rounded-sm mb-4 border"
                      >
                        {/* First Row */}
                        <div className="flex justify-start">
                          <div className="w-[37%]">
                            <h2 className="flex gap-2 text-gray-700 font-semibold items-center text-sm capitalize">
                              <div>{schedule.operator_service_name} </div>
                           
                            </h2>
                          </div>
                          <div className="w-[20%]">
                            <h2 className="text-gray-500 flex flex-col justify-start text-xs">
                            <div className="text-gray-700 font-semibold items-center text-[16px] capitalize">{schedule.dep_time}</div> 
                            </h2>
                           
                          </div>
                          <div className="w-[20%]">
                            <h2 className="text-gray-700 font-semibold items-center text-sm capitalize">
                            {schedule.duration}HRS
                            </h2>
                          </div>
                          <div className="w-[20%] text-gray-500 flex flex-col justify-start text-xs">
                          <div className="text-gray-700 font-semibold items-center text-[16px] capitalize">{schedule.arr_time}</div>
                          {/* {dropoffStages.at(-1)?.cityName} */}

                          </div>
                          <div className="w-[20%] text-gray-700 font-semibold items-center text-[16px] capitalize pl-2">
                          ₹{getLowestPrice(schedule.fare_str).price}
                          </div>
                          <div className="w-[20%] text-gray-500 flex flex-col justify-start text-sm pl-2">
                          {schedule.available_seats} Seats Available
                          </div>
                        </div>

                        {/* Second Row */}
                        <div className="flex justify-start mt-4">
                          <div className="w-[37%]">
                            <h2 className="text-gray-500 justify-start text-xs">
                            {schedule.bus_type}
                            </h2>
                          </div>
                          <div className="w-[20%]">
                            <h2 className="text-gray-500 justify-start text-xs">
                            {formatDateToIST(schedule.main_dep_time)},{" "}
                            {boardingStages[0].cityName}
                            </h2>
                          </div>
                          <div className="w-[20%]">
                            {/* <h2 className="flex gap-2 font-bold items-center">
                              Reaches on
                            </h2> */}
                          </div>
                          <div className="w-[20%]">
                            <h2 className="text-gray-500 justify-start text-xs">
                            {dropoffStages.at(-1)?.cityName}
                            </h2>
                          </div>
                          <div className="w-[20%]">
                            {/* <h2 className="flex gap-2 font-bold items-center">
                              Reaches on
                            </h2> */}
                          </div>
                          <div className="w-[20%]">
                            {/* <h2 className="flex gap-2 font-bold items-center">
                              Reaches on
                            </h2> */}
                          </div>
                        </div>

                         {/* Third Row */}
                         <div className="flex justify-start mt-4">
                          <div className="w-[37%]">
                            <h2 className="text-gray-600 justify-start text-[13px] bg-primary/5 w-max p-1 flex gap-1 items-center">
                            <LocateFixed size={14} /> Live Tracking
                            </h2>
                          </div>
                          <div className="w-[20%]">
                            {/* <h2 className="text-gray-500 justify-start text-xs">
                            {formatDateToIST(schedule.main_dep_time)},{" "}
                            {boardingStages[0].cityName}
                            </h2> */}
                          </div>
                          <div className="w-[20%]">
                            {/* <h2 className="flex gap-2 font-bold items-center">
                              Reaches on
                            </h2> */}
                          </div>
                          <div className="w-[20%]">
                            {/* <h2 className="text-gray-500 justify-start text-xs">
                            {dropoffStages.at(-1)?.cityName}
                            </h2> */}
                          </div>
                          <div className="w-[20%]">
                            {/* <h2 className="flex gap-2 font-bold items-center">
                              Reaches on
                            </h2> */}
                          </div>
                          <div className="w-[20%]">
                            {/* <h2 className="flex gap-2 font-bold items-center">
                              Reaches on
                            </h2> */}
                          </div>
                        </div>
                      

                        {/* Options Section */}
                        <div className="flex justify-end mt-4 items-center">
                          {options.map((item) => (
                            <div key={item}>
                              {item !== "Select Berth" && (
                                <button
                                  onClick={() => handleClick(schedule.id, item)}
                                  className={cn(
                                    "w-full text-left text-xs py-2 px-2 mb-2 flex gap-0 items-center justify-center text-secondary bg-primary/0 rounded-sm",
                                    openItems[schedule.id] === item &&
                                      "bg-secondary/10 font-semibold text-primary"
                                  )}
                                >
                                  {item}{" "}
                                  {openItems[schedule.id] === item ? (
                                    <ChevronUp size={17} />
                                  ) : (
                                    <ChevronDown size={17} />
                                  )}
                                </button>
                              )}
                              {item === "Select Berth" && (
                                <button
                                  disabled={!schedule.available_seats}
                                  onClick={() => handleClick(schedule.id, item)}
                                  className={cn(
                                    "w-full text-left px-2 py-1 text-sm mb-2 flex gap-2 items-center justify-center text-secondary bg-primary text-white font-normal rounded-sm",
                                    {
                                      "cursor-not-allowed bg-zinc-500":
                                        !schedule.available_seats,
                                    }
                                  )}
                                >
                                  Select Berth
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Conditional Rendering */}
                        {openItems[schedule.id] && (
                          <div className="bg-[#f8f9fa] p-4 -mx-[12px]">
                            {/* <p>Details for: {openItems[schedule.id]}</p> */}
                            <AdditionalBusInfo
                              scheduleId={schedule.id.toString()}
                              openItem={openItems[schedule.id]}
                              allcityList={allcityList}
                            />
                            {/* Additional content for the opened option */}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {!isLoading &&
                    schedulesList.length <1 &&
                    <div className="flex justify-center items-center h-[100vh]">
                      No Result Found
                      </div>
                  }
              {/* Loop for each main div */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultConatiner;
