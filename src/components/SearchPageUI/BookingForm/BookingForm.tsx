"use client";
import { Clock } from "lucide-react";
import SelectLocationFromTo, { CityPropsType } from "./SelectLocationFromTo";
import { Button } from "@/components/ui/button";


const cities: CityPropsType[] = [
  { value: "2568", label: "Aatingal", datakey: "AAT" },
  { value: "9", label: "Achampet", datakey: "APT" },
  { value: "4", label: "Adoni", datakey: "ADT" },
  { value: "673", label: "Afzalpur", datakey: "AFZ" },
  { value: "854", label: "Agumbe", datakey: "AGB" },
  { value: "2826", label: "Ahmed Nagar", datakey: "AHN" },
  { value: "810", label: "Ajjampura", datakey: "AJP" },
  { value: "1513", label: "Alakkot", datakey: "AKK" },
  { value: "1152", label: "Alamatti", datakey: "ATT" },
  { value: "2943", label: "Alappuzha", datakey: "ALE" },
  { value: "2573", label: "Alapuzha", datakey: "ALP" },
  { value: "25", label: "Alike", datakey: "ALK" },
  { value: "30", label: "Alleppey", datakey: "AVP" },
  { value: "3047", label: "Alnavar", datakey: "LNR" },
  { value: "29", label: "Aluva", datakey: "AWY" },
  { value: "2574", label: "Alwaye", datakey: "ALW" },
  { value: "2544", label: "Ambikanager", datakey: "AMB" },
  { value: "3056", label: "Ambur", datakey: "ABR" },
  { value: "962", label: "Amingad", datakey: "AMN" },
  { value: "30", label: "Aminkot", datakey: "AMT" },
  { value: "975", label: "Ammakal", datakey: "AKL" },
  { value: "1298", label: "Amravati", datakey: "AMT" },
  { value: "4759", label: "Anand Ga Border", datakey: "AMOGKA" },
  { value: "964", label: "Anmod Ka Ga Border", datakey: "AMOGK" },
];

const BookingForm = ({onClick}:{onClick:()=>void}) => {

  return (
    <div className="flex flex-col relative border rounded-lg p-4 bg-background h-full">
      <div className="flex flex-col">
        <SelectLocationFromTo
          values={""}
          cities={cities}
          OnChange={() => {}}
          lebelText1="Select Bosrding Point"
          selectFor="pick-up"
        />
        <div className="flex items-center gap-1 mb-6 text-sm mt-1">
          <Clock size={15} /> 19:00 BALIJAKANDRIGA BUS STAND
        </div>
        <SelectLocationFromTo
          values={""}
          cities={cities}
          OnChange={() => {}}
          lebelText1="Select Dropping Point"
          selectFor="drop-off"
        />
        <div className="flex items-center gap-1 text-sm mt-1">
          <Clock size={15} /> 19:00 BALIJAKANDRIGA BUS STAND
        </div>
      </div>
      <div className="absolute left-5 bottom-4">
        <div className="text-[#777] italic">
          Please select seat(s), pick up & drop off location to continue
        </div>
        <Button
          type="button"
          onClick={onClick}
          variant={"default"}
          size={"lg"}
          className="w-full text-xl h-14 mt-1"
        >
          Provide Passenger Details
        </Button>
      </div>
      
    </div>
  );
};

export default BookingForm;
