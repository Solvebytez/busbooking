"use client";

import SearchableSelect, {
  CityPropsType,
} from "@/components/Input/SelectInput";
import { useForm } from "react-hook-form";
import DatePickerWithTwoMonths from "../Input/DataSelect";
import { ArrowRightLeft, Bus, Luggage } from "lucide-react";
import SubmitButton from "../Global/SubmitButton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"


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

enum TripType {
  one_way = "one_way",
  round_trip = "round_trip",
}

type TicketBookingFormProps = {
  fromCity: string;
  toCity: string;
  returnDate?: Date;
  departureDate: Date | undefined;
  isSignleLady: boolean;
  tripType: string;
};

const TicketBookingForm = () => {
  const [tripTypeValue, setTripTypeValue] = useState<string>(TripType.one_way);
  const [singleLady, setIsSignleLady] = useState<boolean>(false);
  const { handleSubmit, setValue, watch, register } =
    useForm<TicketBookingFormProps>({
      defaultValues: {
        fromCity: "",
        toCity: "",
        tripType: "",
        isSignleLady: false,
      },
    });

  const fromCity = watch("fromCity");
  const toCity = watch("toCity");
  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");
  // const isSignleLady = watch("isSignleLady");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setCustomValue = (name: any, value: unknown) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    console.log("Custom value changed:", name, value);
  };

  const onSubmit = (data: TicketBookingFormProps) => {
    console.log("Form submitted:", data);
  };

  const tripTypeHandler = (val: string) => {
    console.log("Trip Type Changed:", val);
    setCustomValue("tripType", val);
    setTripTypeValue(val);
  };

  const handleCheckboxChange = () => {
    console.log("Single Lady changed:", singleLady);  
     setIsSignleLady((prev) => !prev);
    // console.log("Single Lady changed:", singleLady);  // Update form state in React Hook Form
     setCustomValue("isSingleLady", !singleLady); // Update form state in React Hook Form
  };

  return (
    <div className="bg-white p-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative">
      <div className="flex absolute -top-[40px] left-0">
        <div className="bg-white  px-5 py-2 rounded-tl-md">
          <h2 className="text-md font-bold flex items-center gap-1">  <Bus size={18} /> Bus Ticket Booking</h2>
        </div>
        <div className="bg-primary text-white px-5 py-2 rounded-tr-md">
          <h2 className="text-md font-bold flex items-center gap-1"><Luggage size={18} /> Package Tour Booking</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <RadioGroup
          {...register("tripType")}
          defaultValue={tripTypeValue}
          onValueChange={(val) => tripTypeHandler(val)} // Use onValueChange if provided, otherwise use onChange
        >
          <div className="flex gap-3 mb-7">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="one_way"
                id="r1"
                className="w-[20px] h-[20px]"
              />
              <Label htmlFor="r1">One Way</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="round_trip"
                id="r2"
                className="w-[20px] h-[20px]"
              />
              <Label htmlFor="r2">Round Trip</Label>
            </div>
          </div>
        </RadioGroup>
        <div className="flex gap-4 items-center h-[3.7rem]">
          <div className="flex gap-4 relative">
            <SearchableSelect
              cities={cities}
              values={fromCity}
              OnChange={(value: string | null) =>
                setCustomValue("fromCity", value)
              }
              lebelText1="Select Departure City"
              labelText2="Leaving From"
            />
            <div className="absolute w-[3rem] h-[3rem] rounded-full ring-1 ring-gray-400 md:flex items-center justify-center bg-white hidden left-[17rem] z-10 top-[6px]">
              <ArrowRightLeft size={20} className="text-primary" />
            </div>
            <SearchableSelect
              cities={cities}
              values={toCity}
              OnChange={(value: string | null) =>
                setCustomValue("toCity", value)
              }
              lebelText1="Select Destination City"
              labelText2="Going To"
            />
          </div>
          <div className="">
            <DatePickerWithTwoMonths
              textLabel1="Date of Departure"
              textLabel2="Choose Date"
              value={departureDate ? departureDate : undefined}
              className="h-[3.7rem]"
              onChange={(value: Date | undefined) =>
                setCustomValue("departureDate", value)
              }
            />

            <DatePickerWithTwoMonths
              disabled={tripTypeValue == TripType.one_way}
              textLabel1="Return Date"
              textLabel2="Choose Date (Optional)"
              value={returnDate}
              className="h-[3.7rem]"
              onChange={(value: Date | undefined) =>
                setCustomValue("returnDate", value)
              }
            />
          </div>
          <div className="border border-gray-600 rounded-lg h-full flex flex-col items-center">
          <div className="items-center flex space-x-2 h-full justify-center px-5">
      <Checkbox id="terms1" onChange={handleCheckboxChange} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Single Lady
        </label>
       
      </div>
    </div>
          </div>
          <SubmitButton btnText={"Submit"} className="h-full font-bold" />
        </div>
      </form>
    </div>
  );
};

export default TicketBookingForm;
