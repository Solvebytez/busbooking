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
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { useGetAllCities } from "@/ClientApi/cities";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/app/utils/utils";
import { FilterData } from "@/ClientApi/scheduleList";
import { formatToISTDate } from "@/lib/utils";
import TravelFormSkeleton from "../Global/TravelFormSkeleton";
import useValidateQueryParams from "@/app/hooks/useValidateQueryParams";

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
 
  const router = useRouter();


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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setCustomValue = (name: any, value: unknown) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (data: TicketBookingFormProps) => {
    console.log("Form submitted:", JSON.stringify(data));

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
      queryParams.append("returnDate", data.returnDate.toISOString());
    }

    // const formatDate=formatToISTDate(departureDate!)

    // console.log("formatDate",formatDate);

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
    // console.log("Single Lady changed:", singleLady);  // Update form state in React Hook Form
    setCustomValue("isSingleLady", !singleLady); // Update form state in React Hook Form
  };

  useEffect(() => {
    const formatDate = formatToISTDate(departureDate!);

    const filterData = {
      onward_date: formatDate,
      origin: Number(fromCity?.id),
      destination: Number(toCity?.id),
    };

    setFilterData({ ...filterData });
  }, [departureDate, fromCity, setFilterData, toCity]);

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

  const handleInputChange = (name: string, value: any) => {
    const params = new URLSearchParams(searchParams.toString());

    if (name === "fromCityId") {
      const filteredToCities = allcities.data.find(
        (city: CityPropsType) => city.id === Number(value)
      );
      console.log("filteredToCities", filteredToCities.city_name);
      params.set("fromCity", filteredToCities.city_name);
    }

    if (name === "toCityId") {
      const filteredToCities = allcities.data.find(
        (city: CityPropsType) => city.id === Number(value)
      );
      console.log("filteredToCities", filteredToCities.city_name);
      params.set("toCity", filteredToCities.city_name);
    }
    if (value) {
      // Add or update the parameter
      params.set(name, value);
    } else {
      // Remove the parameter if value is undefined or empty
      params.delete(name);
    }

    console.log("params", params.get("fromCity"));
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
                value={departureDate ? departureDate : undefined}
                className="h-[3.7rem] w-[50%]"
                isError={errors?.departureDate?.message}
                onChange={(value: Date | undefined) =>
                  setCustomValue("departureDate", value)
                }
              />

              <DatePickerWithTwoMonths
                disabled={tripTypeUri == TripType.one_way}
                textLabel1="Return Date"
                textLabel2="Choose Date (Optional)"
                {...register("returnDate", {
                  required:
                  tripTypeUri === TripType.round_trip
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
