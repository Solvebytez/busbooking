"use client";

import { cn } from "@/lib/utils";
import useOnwardTripStore from "@/store/onwardTripStore";
import useSearchParamsStore from "@/store/useSearchParamsStore";
import {
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";

import { useEffect } from "react";
import { TripType } from "../Form/TicketBookingForm";

import { format } from "date-fns";

const TripFilterHeader = () => {
  const {  setOnwardTrip, parsedOnwardTrip, setParsedOnwardTrip } = useOnwardTripStore();
  const state = useSearchParamsStore();
  

  useEffect(() => {
    const savedData = localStorage.getItem("Onward_Trip");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setOnwardTrip(savedData); // Keep the original string in onwardTrip
        setParsedOnwardTrip(parsedData); // Set the parsed object to parsedOnwardTrip
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }, [setOnwardTrip, setParsedOnwardTrip]);

  const isPassengerDetailHas = Object.keys(parsedOnwardTrip).length > 0?true:false;



  return (
    <div className="p-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
      <div className="w-full md:px-[1rem] xl:px-[4rem]">
        <div className="space-y-4">
          {/* Trip Details */}
          <div className="flex justify-between space-x-2">
            <div className="flex space-x-2">
              {/* <button className="bg-secondary text-white font-semibold px-4 py-2 rounded-full">
                Onward Trip: Achampet - Srisailam, 15 Nov
              </button> */}
              <button
                className={cn(
                  "font-semibold px-4 py-2 rounded-full",
                  {
                    "cursor-not-allowed bg-gray-300 text-secondary": isPassengerDetailHas, // Style when disabled
                    "bg-secondary text-white": !isPassengerDetailHas, // Style when active
                  }
                )}
                disabled={!isPassengerDetailHas}
              >
                Onward Trip: {state.fromCity} - {state.toCity}, {state.departureDate && format(state.departureDate, "MMM do, yyyy")}
              </button>
              {state.returnDate && state.tripType===TripType.round_trip &&  <button
                className={cn(
                  "text-gray-700 font-semibold px-4 py-2 rounded-full",
                  {
                    "cursor-not-allowed bg-gray-300": !isPassengerDetailHas, // Style when disabled
                    "bg-secondary text-white": isPassengerDetailHas, // Style when active
                  }
                )}
                disabled={!isPassengerDetailHas}
              >
                Return Trip: {state.toCity} - {state.fromCity}, {state.returnDate && format(state.returnDate, "PPP")}
              </button>}
             
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className="bg-white shadow-md text-secondary px-4 py-2 rounded-full flex gap-4 items-center justify-center font-bold"
              >
                <ChevronLeft size={15} /> Previous Day Trips
              </button>
              <button
                type="button"
                className="bg-white shadow-md text-secondary px-4 py-2 rounded-full flex gap-4 items-center justify-center font-bold"
              >
                Next Day Trips <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Sort and Navigation */}
          <div className="bg-secondary/15 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center font-semibold">
              {/* Sort Options */}
              <button className="flex items-center space-x-1 text-gray-700 ">
                <span className="material-icons">
                  {" "}
                  <ArrowDownUp size={16} />
                </span>
                <span>Sort By</span>
              </button>
              <button className="flex items-center">
                <span>Departure Time</span>
                <span className="material-icons">
                  <ChevronsUpDown size={16} />
                </span>
              </button>
              <button className="flex items-center ">
                <span>Journey Duration</span>
                <span className="material-icons">
                  <ChevronsUpDown size={16} />
                </span>
              </button>
              <button className="flex items-center ">
                <span>Arrival Time</span>
                <span className="material-icons">
                  <ChevronsUpDown size={16} />
                </span>
              </button>
              <button className="flex items-center">
                <span>Seat Fare</span>
                <span className="material-icons">
                  <ChevronsUpDown size={16} />
                </span>
              </button>

              {/* Navigation Buttons */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripFilterHeader;
