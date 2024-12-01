/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SearchableSelect, {
  CityPropsType,
} from "@/components/Input/SelectInput";
import { useForm } from "react-hook-form";
import DatePickerWithTwoMonths from "../Input/DataSelect";
import { ArrowRightLeft, CircleAlert } from "lucide-react";
import SubmitButton from "../Global/SubmitButton";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { useGetAllCities } from "@/ClientApi/cities";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/app/utils/utils";
import { FilterData } from "@/ClientApi/scheduleList";
import { formatToISTDate } from "@/lib/utils";
import TravelFormSkeleton from "../Global/TravelFormSkeleton";
import useValidateQueryParams from "@/app/hooks/useValidateQueryParams";
import useOnwardTripStore from "@/store/onwardTripStore";
import { useDateSelection } from "@/app/hooks/useDateValueChange";
import useSearchParamsStore from "@/store/useSearchParamsStore";

//
enum TripType {
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

type SearchFormProps = {
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
  getAllCityList: React.Dispatch<React.SetStateAction<CityPropsType[]>>;
};

const SearchForm = ({ setFilterData, getAllCityList }: SearchFormProps) => {
  const {onwardTrip} = useOnwardTripStore();
  const router = useRouter();
  const setParams = useSearchParamsStore((state) => state.setParams);

  const searchParams = useSearchParams();
  const { data: allcities, isLoading, isError } = useGetAllCities();
  
  const tripTypeUri = searchParams.get('tripType')
  // Filter the toCity options based on the selected fromCity
  const [toCities, setToCities] = useState<CityPropsType[]>([]);
  //const [tripTypeValue] = useState<string>(TripType.one_way);
  const [singleLady, setIsSignleLady] = useState<boolean>(false);

  const departureDates = searchParams.get("departureDate");
  // const formattedDepartureDate = departureDates
  //   ? new Date(departureDates)
  //   : undefined;
  const returnDateURI = formatDate(searchParams.get("returnDate"));
  // const modeURI = searchParams.get("mode") ?? TripType.one_way;
  const isSignleLadyURI = searchParams.get("IsSingleLady") ? true : false;

  useValidateQueryParams();
  
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
      tripType: tripTypeUri??TripType.one_way,
      departureDate: formatDate(departureDates) ?? undefined,
      returnDate: returnDateURI ?? undefined,
      isSignleLady: isSignleLadyURI,
    },
  });

  const fromCity = watch("fromCity");
  const toCity = watch("toCity");
  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");
  // const isSignleLady = watch("isSignleLady");
  const { handleReturnDateChange,handleDepartureDateChange } = useDateSelection();
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
      queryParams.set(
        "returnDate",
        data.returnDate.toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        })
      );
  
      // Update tripType to "round_trip" if it's already set
      if (queryParams.get("tripType")) {
        queryParams.set("tripType", "round_trip");
      }
    }


    // const formatDate=formatToISTDate(departureDate!)



    //   const filterData={
    //     onward_date: "2024-11-24",
    //     origin: Number(fromCity?.id),
    //     destination: Number(toCity?.id),
    // }

    //   setFilterData({...filterData})

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
      getAllCityList(allcities.data);
    }
  }, [allcities, fromCity, getAllCityList]);

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
    setIsSignleLady((prev) => !prev);
  
    setCustomValue("isSingleLady", !singleLady); // Update form state in React Hook Form
  };

  useEffect(() => {
    let formatDate;

    console.log("onwardTrip.length",onwardTrip.length)
    
    if(onwardTrip.length>0 && tripTypeUri==="round_trip"){
      formatDate =formatToISTDate(returnDate!)
    }else{
      formatDate=formatToISTDate(departureDate!);
    }

    let changeCityId;

    if(fromCity?.id && fromCity?.id === toCity?.id) {
      changeCityId = fromCity?.id+ toCity?.id+1;
    }else{
      changeCityId = fromCity?.id
    }

    console.log("isSame",changeCityId)

    const filterData = {
      onward_date: formatDate,
      origin: Number(changeCityId),
      destination: Number(toCity?.id),
    };

    setFilterData({ ...filterData });
    const params = {
      fromCityId: searchParams.get('fromCityId'),
      fromCity: searchParams.get('fromCity'),
      toCity: searchParams.get('toCity'),
      toCityId: searchParams.get('toCityId'),
      tripType: searchParams.get('tripType'),
      departureDate: searchParams.get('departureDate'),
      returnDate: searchParams.get('returnDate'),
      isSingleLady: searchParams.get('isSignleLady') === 'true', // Convert to boolean
    };

    setParams(params);
    
  }, [departureDate, fromCity, onwardTrip, returnDate, searchParams, setFilterData, setParams, toCity, tripTypeUri]);

  useEffect(() => {
    if (allcities?.data) {
      const fromCityId = Number(searchParams.get("fromCityId") || "0");

      const fromCity = allcities.data.find(
        (city: CityPropsType) => (city.id as number) === fromCityId
      );
      const toCityId = searchParams.get("toCityId");
      const toCity = allcities.data.find(
        (city: CityPropsType) => city.id === parseInt(toCityId || "")
      );

      // Setting form values
      setValue("fromCity", fromCity || null);
      setValue("toCity", toCity || null);
    }
  }, [searchParams, allcities, setValue]);

  const cityMap = useMemo(() => {
    // Check if `allcities` and `allcities.data` are valid and an array
    const cities = Array.isArray(allcities?.data) ? allcities.data : [];
    
    // Store the full city object in the map
    return new Map(cities.map((city: CityPropsType) => [city.id, city]));  // Map city.id to the full city object
  }, [allcities]);

  const handleInputChange = (name: string, value: any) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log("cityMap", cityMap);
  
    if (value) {
      // When value is an object of type CityPropsType
      if (name === "fromCityId" || name === "toCityId") {
        // Using cityMap to find the city object by id
        const city: CityPropsType = cityMap.get(value);
  
        console.log("city", city);
  
        // Ensure the city exists and is of the correct type
        if (city && typeof city.city_name === "string") {
          // Check if the fromCityId and toCityId are the same
         
  
          // Set both city ID and city name in the query string
          if (name === "fromCityId") {
            params.set("fromCityId", city.id.toString());
            params.set("fromCity", city.city_name);
          }
  
          if (name === "toCityId") {
            params.set("toCityId", city.id.toString());
            params.set("toCity", city.city_name);
          }

          if (
            (name === "fromCityId" && params.get("toCityId") === city.id.toString()) ||
            (name === "toCityId" && params.get("fromCityId") === city.id.toString())
          ) {
            alert("From city and To city cannot be the same.");
            params.set("fromCityId", (city.id+1).toString())
            return; // Prevent the update
          }
        }
      }
    } else {
      // If value is a primitive type (for other fields), just set the param
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    }
    // // Push the updated query string to the URL
    router.push(`?${params.toString()}`);
  };

  if (isError) {
    alert("Failed to load cities");
  }

  if (isLoading) {
    return  <div className="w-full p-4 bg-[#fff6f6] rounded-lg">
       <div className="w-full md:px-[1rem] xl:px-[4rem]">
          <TravelFormSkeleton />
        </div>
    </div>;
  }

  

  return (
    <div className="bg-primary/20 p-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
      <div className="w-full md:px-[1rem] xl:px-[4rem]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex  gap-4 items-center h-[3.7rem] w-full">
            <div className="flex flex-col xl:w-[37%]">
              <div className="flex gap-4 relative xl:w-[100%]">
                <SearchableSelect
                  cities={allcities.data}
                  values={fromCity}
                  
                  isError={errors?.fromCity?.message}
                  OnChange={(value: CityPropsType | null) => {
                    setCustomValue("fromCity", value);
                    handleInputChange("fromCityId", value?.id as number);
                  }}
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
                  OnChange={(value: CityPropsType | null) => {
                    setCustomValue("toCity", value);
                    handleInputChange("toCityId", value?.id);
                  }}
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
        value={departureDate}
        className="h-[3.7rem] w-[50%]"
        isError={errors?.departureDate?.message}
        onChange={(value: Date | undefined) => {
          handleDepartureDateChange(value)
          setCustomValue("departureDate", value)
        }}
      />

      <DatePickerWithTwoMonths
        // disabled={!departureDate || tripTypeUri === TripType.one_way}
        textLabel1="Return Date"
        textLabel2="Choose Date"
        {...register("returnDate", {
          required:
            tripTypeUri === TripType.round_trip
              ? "Return date is required for round trips"
              : false,
        })}
        isError={errors?.returnDate?.message}
        value={returnDate}
        className="h-[3.7rem] w-[50%]"
        minDate={departureDate ? new Date(departureDate.getTime()) : undefined}
        onChange={(value: Date | undefined) => {
          handleReturnDateChange(value)
          setCustomValue("returnDate", value)
        }}
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
    </div>
  );
};

export default SearchForm;
