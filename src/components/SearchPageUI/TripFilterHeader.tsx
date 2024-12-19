"use client";

import { cn } from "@/lib/utils";
import useOnwardTripStore from "@/store/onwardTripStore";
import useSearchParamsStore from "@/store/useSearchParamsStore";
// import { ArrowDownUp, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { TripType } from "../Form/TicketBookingForm";
import { format } from "date-fns";


const labels = [
  "Departure Time",
  "Journey Duration",
  "Arrival Time",
  "Seat Fare",
  "Available Seats",
];

const TripFilterHeader = ({schedulesListCount=0}:{schedulesListCount:number|string}) => {
  const { setOnwardTrip, parsedOnwardTrip, setParsedOnwardTrip } =
    useOnwardTripStore();
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

  const isPassengerDetailHas =
    Object.keys(parsedOnwardTrip).length > 0 ? true : false;

  return (
    <div className="pb-4 pt-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
      <div className="w-full md:px-[1rem] xl:px-[0rem]">
        <div className="space-y-4">
          {/* Trip Details */}
          <div className="flex justify-between space-x-2">
            <div className="flex space-x-2">
              {/* <button className="bg-secondary text-white font-semibold px-4 py-2 rounded-full">
                Onward Trip: Achampet - Srisailam, 15 Nov
              </button> */}
              <button
                className={cn("font-semibold px-4 py-2 rounded-sm text-sm", {
                  "cursor-not-allowed bg-gray-300 text-secondary":
                    isPassengerDetailHas, // Style when disabled
                  "bg-secondary text-white": !isPassengerDetailHas, // Style when active
                })}
                disabled={!isPassengerDetailHas}
              >
                Onward Trip: {state.fromCity} - {state.toCity},{" "}
                {state.departureDate &&
                  format(state.departureDate, "MMM do, yyyy")}
              </button>
              {state.returnDate && state.tripType === TripType.round_trip && (
                <button
                  className={cn(
                    "text-gray-700 font-semibold px-4 py-2 rounded-sm text-sm",
                    {
                      "cursor-not-allowed bg-gray-200 opacity-65": !isPassengerDetailHas, // Style when disabled
                      "bg-secondary text-white": isPassengerDetailHas, // Style when active
                    }
                  )}
                  disabled={!isPassengerDetailHas}
                >
                  Return Trip: {state.toCity} - {state.fromCity},{" "}
                  {state.returnDate && format(state.returnDate, "PPP")}
                </button>
              )}
            </div>
            <div className="flex space-x-2">
              {/* <button
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
              </button> */}
            </div>
          </div>

          {/* Sort and Navigation */}
          <div className="bg-secondary/0 rounded-sm p-1">
            <div className="flex justify-start items-center font-semibold">
              {/* Sort Options */}
              <div className="w-[37%] flex justify-between  items-center">
                <button className="flex items-center space-x-1 text-gray-700 text-xs uppercase">
                  {schedulesListCount} Buses found
                </button>
                <button className="flex items-center space-x-1 text-gray-700 text-xs uppercase pr-[3rem]">
                  <span className="material-icons">
                    {" "}
                    {/* <ArrowDownUp size={16} /> */}
                  </span>
                  <span>Sort By:</span>
                </button>
              </div>
              {labels.map((label, index) => (
                <button
                  key={index}
                  className="flex items-center text-gray-700 text-xs font-normal w-[20%]"
                >
                  <span>{label}</span>
                  <span className="material-icons">
                    {/* <ChevronsUpDown size={16} /> */}
                  </span>
                </button>
              ))}

              {/* Navigation Buttons */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripFilterHeader;
