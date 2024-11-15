"use client";

import SearchableSelect, {
  CityPropsType,
} from "@/components/Input/SelectInput";
import { useForm } from "react-hook-form";
import DatePickerWithTwoMonths from "../Input/DataSelect";
import { ArrowRightLeft, CircleAlert } from "lucide-react";
import SubmitButton from "../Global/SubmitButton";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/app/utils/utils";

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

const SearchForm = () => {
  // Get the search parameters
  const searchParams = useSearchParams();

  // Access individual parameters
  const fromCityURI = searchParams.get("fromCity");
  const toCityURI = searchParams.get("toCity");
  const departDateURI = formatDate(searchParams.get("departDate"));
  const returnDateURI = formatDate(searchParams.get("returnDate"));
  const modeURI = searchParams.get("mode") ?? TripType.one_way;
  const isSignleLadyURI = searchParams.get("IsSingleLady") ? true : false;

  console.log("isSignleLady", isSignleLadyURI); // Outputs: Fri Nov 29 2024 00:00:00 GMT+0530 (India Standard Time)

  const [tripTypeValue] = useState<string | undefined>(modeURI);
  const [singleLady, setIsSignleLady] = useState<boolean>(isSignleLadyURI);
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors, isSubmitted },
  } = useForm<TicketBookingFormProps>({
    defaultValues: {
      fromCity: fromCityURI ?? "",
      toCity: toCityURI ?? "",
      departureDate: departDateURI ?? undefined,
      returnDate: returnDateURI ?? undefined,
      isSignleLady: singleLady,
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

  useEffect(() => {
    if (isSubmitted && errors) {
      Object.values(errors).forEach((error) => {
        if (error?.message) {
          toast.error(error.message as string, {
            icon: <CircleAlert className="text-red-600" />,
            className: "text-red-600",
          }); // Display error message in toast
        }
      });
    }
  }, [errors, isSubmitted]);

  const handleCheckboxChange = () => {
    console.log("Single Lady changed:", singleLady);
    setIsSignleLady((prev) => !prev);
    // console.log("Single Lady changed:", singleLady);  // Update form state in React Hook Form
    setCustomValue("isSingleLady", !singleLady); // Update form state in React Hook Form
  };

  return (
    <div className="bg-primary/20 p-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
      <div className="w-full md:px-[1rem] xl:px-[4rem]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex  gap-4 items-center h-[3.7rem] w-full">
            <div className="flex flex-col xl:w-[37%]">
              <div className="flex gap-4 relative xl:w-[100%]">
                <SearchableSelect
                  cities={cities}
                  values={fromCity}
                  isError={errors?.fromCity?.message}
                  OnChange={(value: string | null) =>
                    setCustomValue("fromCity", value)
                  }
                  lebelText1="Select Departure City"
                  labelText2="Leaving From"
                  {...register("fromCity", {
                    required: "Departure city is required*",
                  })}
                />
                <div className="absolute w-[3rem] h-[3rem] rounded-full ring-1 ring-gray-400 md:flex items-center justify-center bg-white hidden left-[46%] z-10 top-[6px]">
                  <ArrowRightLeft size={20} className="text-primary" />
                </div>
                <SearchableSelect
                  cities={cities}
                  values={toCity}
                  isError={errors?.toCity?.message}
                  OnChange={(value: string | null) =>
                    setCustomValue("toCity", value)
                  }
                  {...register("toCity", { required: "To city is required" })}
                  lebelText1="Select Destination City"
                  labelText2="Going To"
                />
              </div>
            </div>
            <div className="flex gap-0 xl:w-[37%]">
              <DatePickerWithTwoMonths
                textLabel1="Date of Departure"
                textLabel2="Choose Date"
                {...register("departureDate", {
                  required: "Departure date is required",
                })}
                value={departureDate ? departureDate : undefined}
                className="h-[3.7rem] w-[50%]"
                isError={errors?.departureDate?.message}
                onChange={(value: Date | undefined) =>
                  setCustomValue("departureDate", value)
                }
              />

              <DatePickerWithTwoMonths
                disabled={tripTypeValue == TripType.one_way}
                textLabel1="Return Date"
                textLabel2="Choose Date (Optional)"
                {...register("returnDate", {
                  required:
                    tripTypeValue === TripType.round_trip
                      ? "Return date is required for round trips"
                      : false,
                })}
                isError={errors?.returnDate?.message}
                value={returnDate}
                className="h-[3.7rem] w-[50%]"
                onChange={(value: Date | undefined) =>
                  setCustomValue("returnDate", value)
                }
              />
            </div>
            <div className=" h-full flex gap-4 items-center w-[26%]">
              <div className="items-center flex space-x-2 h-full justify-center px-5 border border-gray-600 rounded-lg w-[50%] bg-white">
                <Checkbox
                  id="terms1"
                  defaultChecked={singleLady}
                  onChange={handleCheckboxChange}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Single Lady
                  </label>
                </div>
              </div>
              <div className="items-center flex h-full justify-center  w-[50%]">
                <SubmitButton
                  btnText={"Modify"}
                  className="h-full font-bold w-full"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
