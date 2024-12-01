"use client";

import SearchableSelect, {
  CityPropsType,
} from "@/components/Input/SelectInput";
import { useForm } from "react-hook-form";
import DatePickerWithTwoMonths from "../Input/DataSelect";
import { ArrowRightLeft, Bus, CircleAlert, Luggage } from "lucide-react";
import SubmitButton from "../Global/SubmitButton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { useGetAllCities } from "@/ClientApi/cities";
import { useRouter } from "next/navigation";
import TravelFormSkeleton from "../Global/TravelFormSkeleton";
import useOnwardTripStore from "@/store/onwardTripStore";
import Link from "next/link";
import { useStore } from "@/store/storeFilterData";

//
export enum TripType {
  one_way = "one_way",
  round_trip = "round_trip",
}

type TicketBookingFormProps = {
  fromCity: CityPropsType | null;
  toCity: CityPropsType | null;
  returnDate?: Date;
  departureDate: Date | undefined;
  isSignleLady: boolean;
  tripType: string;
};

const TicketBookingForm = () => {
  const { data: allcities, isLoading, isError } = useGetAllCities();
  const router = useRouter();
  const {   setOnwardTrip, setParsedOnwardTrip } = useOnwardTripStore();
  const {setSelectedBusTypes,setSelectedDepartureTimes} = useStore()
  // Filter the toCity options based on the selected fromCity
  const [toCities, setToCities] = useState<CityPropsType[]>([]);
  const [tripTypeValue, setTripTypeValue] = useState<string>(TripType.one_way);
  const [singleLady, setIsSignleLady] = useState<boolean>(false);
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors, isSubmitted },
  } = useForm<TicketBookingFormProps>({
    defaultValues: {
      fromCity: null,
      toCity: null,
      tripType: TripType.one_way,
      departureDate: undefined,
      returnDate: undefined,
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
 
  };

  const onSubmit = (data: TicketBookingFormProps) => {
 

    const queryParams = new URLSearchParams({
      fromCityId: data.fromCity?.id.toString() || "",
      fromCity: data.fromCity?.city_name || "",
      toCity: data.toCity?.city_name || "",
      toCityId: data.toCity?.id.toString() || "",
      tripType: data.tripType,
      departureDate: data.departureDate
        ? data.departureDate.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
          })
        : "",
      isSignleLady: data.isSignleLady.toString(),
    });

    if (data.returnDate) {
      queryParams.append(
        "returnDate",
        data.returnDate.toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        })
      );
    }

    // if(tripTypeValue === TripType.round_trip){
    //   const onwardTripData = {
    //     from: "Achampet",
    //     to: "Srisailam",
    //     date: "15 Nov",
    //   };
      
    //   // Save it in localStorage
    //   localStorage.setItem("Onward_Trip", JSON.stringify(onwardTripData));
    // }

    router.push(`/search?${queryParams.toString()}`);
  };

  // Watch for changes in 'fromCity' and filter 'toCity' accordingly
  useEffect(() => {
    if (allcities?.data && fromCity) {
      // Filter out the selected fromCity from the toCities list
      const filteredToCities = allcities.data.filter(
        (city: CityPropsType) => city.id !== fromCity.id
      );
      setToCities(filteredToCities);
    }
    setParsedOnwardTrip({})
    setOnwardTrip({})
    setSelectedBusTypes([])
    setSelectedDepartureTimes([])
    console.log("setParsedOnwardTrip data is empty")
  }, [allcities, fromCity, setOnwardTrip, setParsedOnwardTrip, setSelectedBusTypes, setSelectedDepartureTimes]);

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

  const tripTypeHandler = (val: string) => {
    setCustomValue("tripType", val);
    setTripTypeValue(val);
  };

  const handleCheckboxChange = () => {
    setIsSignleLady((prev) => !prev);
  
    setCustomValue("isSingleLady", !singleLady); // Update form state in React Hook Form
  };

  if (isError) {
   return  <div className="bg-white p-5 m-auto flex flex-col justify-center items-center rounded-lg relative w-full">
   <div className="w-full">
     Failed To Load Cities. We will get back in few minutes
   </div>
 </div>
  }

  if (isLoading) {
    return (
      <div className="bg-white p-5 m-auto flex flex-col justify-center items-center rounded-lg relative w-full">
        <div className="w-full">
          <TravelFormSkeleton />
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white p-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
      <div className="flex absolute -top-[40px] left-0">
        <div className="bg-white  px-5 py-2 rounded-tl-md">
          <h2 className="text-md font-bold flex items-center gap-1">
            {" "}
            <Bus size={18} /> Bus Ticket Booking
          </h2>
        </div>
        <div className="bg-primary text-white px-5 py-2 rounded-tr-md">
          <Link href="tour-package">
          <h2 className="text-md font-bold flex items-center gap-1">
            <Luggage size={18} /> Package Tour Booking
          </h2>
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
        <div className="flex  gap-4 items-center h-[3.7rem] w-full">
          <div className="flex flex-col xl:w-[37%]">
            <div className="flex gap-4 relative xl:w-[100%]">
              <SearchableSelect
                cities={allcities.data}
                values={fromCity}
                isError={errors?.fromCity?.message}
                OnChange={(value: CityPropsType | null) =>
                  setCustomValue("fromCity", value)
                }
                lebelText1="Select Departure City"
                labelText2="Leaving From"
                {...register("fromCity", {
                  required: "Departure city is required*",
                })}
              />
              <div className="absolute w-[3rem] h-[3rem] rounded-full ring-1 ring-gray-400 md:flex items-center justify-center bg-white hidden left-[45%] z-10 top-[6px]">
                <ArrowRightLeft size={20} className="text-primary" />
              </div>
              <SearchableSelect
                cities={toCities}
                values={toCity}
                isError={errors?.toCity?.message}
                OnChange={(value: CityPropsType | null) =>
                  setCustomValue("toCity", value)
                }
                isDisabled={allcities?.data && !fromCity}
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
              minDate={departureDate ? new Date(departureDate.getTime()) : undefined}
              value={returnDate}
              className="h-[3.7rem] w-[50%]"
              onChange={(value: Date | undefined) =>
                setCustomValue("returnDate", value)
              }
            />
          </div>
          <div className=" h-full flex gap-4 items-center w-[26%]">
            <div className="items-center flex space-x-2 h-full justify-center px-5 border border-gray-600 rounded-lg w-[50%]">
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
            <div className="items-center flex h-full justify-center  w-[50%]">
              <SubmitButton
                btnText={"Submit"}
                className="h-full font-bold w-full"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketBookingForm;
