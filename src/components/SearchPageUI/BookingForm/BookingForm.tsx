"use client";
import { Clock } from "lucide-react";
import SelectLocationFromTo, { CityPropsType } from "./SelectLocationFromTo";
import { Button } from "@/components/ui/button";
import TotalFareDetails from "./TotalFareDetails";
import { useEffect, useState } from "react";
import {  cn,  SeatData } from "@/lib/utils";
import useDropOffStore from "@/store/boarding_dropOff_store";
import { usePriceStore } from "@/store/store_price";


export type GstPropsType = {
  gstValue: number;
  total: number;
  gstAvailable: boolean;
  seat: string | null;
  price: number | null;
  gst: number | false;
}

const BookingForm = ({
  onClick,
  boarding_stopies,
  droping_stopies,
  selectedSeats,

}: {
  onClick: () => void;
  boarding_stopies: CityPropsType[];
  droping_stopies: CityPropsType[];
  selectedSeats: SeatData[];

}) => {
  const [boardingData, setBoardingData] = useState<CityPropsType|null>(null);
  const { addSeats } = usePriceStore();
  const [droppingData, setDroppingData] = useState<CityPropsType|null>(null);

  // const setDropOffList = useDropOffStore((state) => state.setDropOffList);
  // const setBoardingPoint = useDropOffStore((state) => state.setBoardingPoint);
  const {selected_boardingPoint,selected_dropOffList,setBoardingPoint,setDropOffList}= useDropOffStore()
   // Handle change for boarding point
   const handleBoardingChange = (selectedOption: CityPropsType) => {
    setBoardingData({
      ...selectedOption
    });
    setBoardingPoint({...selectedOption});
  };

  // Handle change for dropping point
  const handleDroppingChange = (selectedOption: CityPropsType) => {
    setDroppingData({
      ...selectedOption
    });
    setDropOffList({...selectedOption})
  };

  
  useEffect(() => { 
    addSeats(selectedSeats)    
  }, [addSeats, selectedSeats]);


  return (
    <div className="flex flex-col relative border rounded-lg p-4 bg-background h-full">
      <div className="flex flex-col">
        <SelectLocationFromTo
          values={boardingData}
          cities={boarding_stopies}
          OnChange={(value) => handleBoardingChange(value)}
          lebelText1="Select Boarding Point"
          selectFor="pick-up"
        />
        {!boardingData && <div className="flex items-center gap-1 mb-6 text-sm mt-1"></div>}
        {boardingData && <div className="flex items-center gap-1 mb-6 text-sm mt-1">
          <Clock size={15} /> {boardingData?.bus_time} {boardingData?.bus_stop_location}
        </div>}
        
        <SelectLocationFromTo
          values={droppingData}
          cities={droping_stopies}
          OnChange={(value) => handleDroppingChange(value)}
          lebelText1="Select Dropping Point"
          selectFor="drop-off"
        />
        {droppingData &&  <div className="flex items-center gap-1 text-sm mt-1 uppercase">
          <Clock size={15} /> {droppingData?.bus_time} {droppingData?.bus_stop_location}
        </div>}
       
      </div>
      <div className="absolute left-5 bottom-4 w-[91%]">
        <div className="flex w-full">
          <TotalFareDetails />
        </div>
        <div className="text-[#777] italic text-sm py-1">
          Please select seat(s), pick up & drop off location to continue
        </div>
        <Button
        disabled={!selectedSeats.length || // Check if no seats are selected
          selected_boardingPoint.bus_location_id.length === 0 ||
          selected_dropOffList.bus_location_id.length === 0
          }
          type="button"
          onClick={onClick}
          variant={"default"}
          size={"lg"}
          className={cn("w-full text-xl h-14 mt-1 font-bold", {"bg-zinc-400":!selectedSeats && (!selected_boardingPoint && !selected_dropOffList)})}
        >
          Provide Passenger Details
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
