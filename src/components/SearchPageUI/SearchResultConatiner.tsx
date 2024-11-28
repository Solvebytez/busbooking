/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import TripFilterHeader from "./TripFilterHeader";
import SearchForm from "./SearchForm";
import SidebarFilter from "./SidebarFilter";
import { ChevronDown, ChevronUp } from "lucide-react";
import AdditionalBusInfo from "./SearchAdditionalComp/AdditionalBusInfo";
import {
  cn,
  formatDateToIST,
  getLowestPrice,
  parseCityData,
} from "@/lib/utils";
import BusInfoModal from "./SearchAdditionalComp/BusInfoModal";
import useFilterData, {
  BusService,
  FilterData,
} from "@/ClientApi/scheduleList";
import { CityPropsType } from "../Input/SelectInput";


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
}


const SearchResultConatiner = () => {
  const [schedulesList, setschedulesList] = useState<BusService[]>([]);
  const [allcityList, setAllCityList] = useState<CityPropsType[]>([]);
  const [openItems, setOpenItems] = useState<Record<any, any>>({});

  const handleClick = useCallback((scheduleId: any, item: any) => {
   
    setOpenItems((prev) => ({
      ...prev,
      [scheduleId]: prev[scheduleId] === item ? "" : item,
    }));
  },[]);


  const [filterData, setFilterData] = useState<FilterData>({
    destination: Number(825),
    onward_date: new Date().toISOString().split("T")[0],
    origin: Number(1273),
  });

  // Use the query hook
  const { data, error, isLoading } = useFilterData(filterData);
  useEffect(() => {
    if (data) {
      setschedulesList(data.data);
    }
  }, [data]);

  if (error instanceof Error) return <div>Error: {error.message}</div>;



  return (
    <div>
      <SearchForm
        setFilterData={setFilterData}
        getAllCityList={setAllCityList!}      
      />
      <TripFilterHeader />
      <div className="px-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
        <div className="w-full md:px-[1rem] xl:px-[4rem]">
          <div className="flex gap-4">
            <div className="flex flex-col w-[20%] mb-10">
              <SidebarFilter />
            </div>
            <div className="col-span-9  w-[80%]">
              {isLoading
                ? "Loading....."
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
                        className="shadow-md p-3 bg-white rounded-md mb-8"
                      >
                        {/* First Row */}
                        <div className="flex justify-start">
                          <div className="w-[34.5%]">
                            <h2 className="flex gap-2 text-primary/90 font-bold items-center text-xl">
                              {schedule.name} <BusInfoModal />
                            </h2>
                          </div>
                          <div>
                            <h2 className="text-primary/90 font-bold items-center text-xl">
                              {schedule.bus_type}
                            </h2>
                          </div>
                          <div className="ms-auto">
                            <h2 className="font-bold items-center text-xl">
                              ₹{getLowestPrice(schedule.fare_str).price}
                            </h2>
                          </div>
                        </div>

                        {/* Second Row */}
                        <div className="flex justify-between mt-4">
                          <div className="w-[20%]">
                            <h2 className="flex gap-2 font-bold items-center">
                              Starts at
                            </h2>
                          </div>
                          <div className="w-[15%]">
                            <h2 className="flex gap-2 font-bold items-center">
                              Duration
                            </h2>
                          </div>
                          <div className="w-[28%]">
                            <h2 className="flex gap-2 font-bold items-center">
                              Reaches on
                            </h2>
                          </div>
                          <div className="w-[23%]">
                            <h2 className="font-bold items-center">Via</h2>
                          </div>
                          <div className="w-[15%] text-right">
                            <h2 className="font-bold items-center">
                              {schedule.status}
                            </h2>
                          </div>
                        </div>

                        {/* Third Row */}
                        <div className="flex justify-between mt-4">
                          <div className="w-[20%]">
                            <h2 className="flex gap-2 font-bold items-center text-xl">
                              {schedule.dep_time}, {boardingStages[0].cityName}
                            </h2>
                          </div>
                          <div className="w-[15%]">
                            <h2 className="flex gap-1 font-bold items-center">
                              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-green-500"></div>
                              <span className="h-[1px] w-[30px] bg-red block border border-green-500"></span>
                              {schedule.duration}HRS
                              <span className="h-[1px] w-[30px] bg-red block border border-red-500"></span>
                              <span className="h-[10px] w-[10px] bg-red-500 block border border-red-500"></span>
                            </h2>
                          </div>
                          <div className="w-[28%]">
                            <h2 className="flex gap-2 font-bold items-center ">
                              {formatDateToIST(schedule.main_dep_time)},{" "}
                              <span className="text-xl">
                                {schedule.arr_time},{" "}
                                {dropoffStages.at(-1)?.cityName}
                              </span>
                            </h2>
                          </div>
                          <div className="w-[23%]">
                            <h2 className="font-bold items-center">
                              {schedule.via}
                            </h2>
                          </div>
                          <div className="w-[15%] text-right text-lg">
                            <h2 className="font-bold items-center">
                              {schedule.available_seats}
                            </h2>
                          </div>
                        </div>

                        {/* Options Section */}
                        <div className="flex justify-between mt-4">
                          {options.map((item) => (
                            <div key={item}>
                              {item !== "Select Berth" && (
                                <button
                                  onClick={() => handleClick(schedule.id, item)}
                                  className={cn(
                                    "w-full text-left text-sm py-2 px-4 mb-2 flex gap-0 items-center justify-center text-secondary bg-primary/5 rounded-2xl",
                                    openItems[schedule.id] === item &&
                                      "bg-secondary/10 font-semibold"
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
                                  className={cn("w-full text-left p-2 mb-2 flex gap-2 items-center justify-center text-secondary bg-primary text-white font-bold rounded-md", {"cursor-not-allowed bg-zinc-400":!schedule.available_seats})}
                                >
                                  Select Berth
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Conditional Rendering */}
                        {openItems[schedule.id] && (
                          <div className="bg-secondary/10 p-4">
                            <p>Details for: {openItems[schedule.id]}</p>
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
              {/* Loop for each main div */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultConatiner;
