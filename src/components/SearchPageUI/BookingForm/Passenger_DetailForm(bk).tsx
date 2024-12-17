/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, SeatData } from "@/lib/utils";
import { toast } from "react-toastify";
import useDropOffStore from "@/store/boarding_dropOff_store";
import useOnwardTripStore from "@/store/onwardTripStore";
import { usePriceStore } from "@/store/store_price";
import useSearchParamsStore from "@/store/useSearchParamsStore";
import { TripType } from "@/components/Form/TicketBookingForm";
import { useRouter } from "next/navigation";

const passengerSchema = z.object({
  seat_no: z.string(),
  name: z.string().min(1, "Name is required"),
  gender: z.string().min(1, "Gender is required"),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(1, "Age must be at least 1"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  seat_price: z.number(),
  seat_gst: z.number(),
  scheduleId: z.string(),
  tripType: z.string(),
});

const formSchema = z.object({
  passengers: z.array(passengerSchema),
});

type FormValues = z.infer<typeof formSchema>;

const Passenger_DetailForm = ({
  selectedSeats,
  scheduleId,
}: {
  selectedSeats: SeatData[];
  scheduleId: string;
}) => {
  const { selected_boardingPoint, selected_dropOffList } = useDropOffStore();
  const { onwardTrip, parsedOnwardTrip } = useOnwardTripStore();
  const { data:seatData, subTotal, totalGst, totalSeatPrice } = usePriceStore();
  const onwordsSearch = useSearchParamsStore();
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: selectedSeats.map((seat) => ({
        seat_no: seat.seat ?? "",
        name: "",
        gender: "",
        age: 0,
        seat_price: seat.price || 0,
        seat_gst: seat.gst || 0,
        city: "",
        state: "",
        scheduleId: scheduleId,
        tripType: seat.tripType ?? "",
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = (data: FormValues,type:TripType) => {
    toast.success("Form Submitted successfully!");
    // Handle form submission here (e.g., API call, state update, etc.)
   
    if (
      (typeof window !== "undefined" &&      
      window.localStorage.getItem("one_way") ||
      window.localStorage.getItem("round_trip"))
    ) {
      console.log("Page changed. Removing tripData...");
     
      window.localStorage.removeItem("one_way");
      window.localStorage.removeItem("round_trip");
    }

    if(type==="one_way"){
      // toast.success("one_way Form submitted successfully!");
      const localStorageData = {
        selected_boardingPoint,
        selected_dropOffList,      
        parsedOnwardTrip,
        priceData: { seatData, subTotal, totalGst, totalSeatPrice },
        onwordsSearch,
        passenger_information:[...data.passengers]
      };
    
      // Save the serialized data to localStorage
      localStorage.setItem("one_way", JSON.stringify(localStorageData));

    }

    if(type==="round_trip"){
      // toast.success("round_trip Form submitted successfully!");
      let tripTypeforRound;
      if(window.localStorage.getItem("Onward_Trip")){
        tripTypeforRound="round_trip"

      }else{
         tripTypeforRound="Onward_Trip"
      }
      const localStorageData = {
        selected_boardingPoint,
        selected_dropOffList,      
        parsedOnwardTrip,
        priceData: { seatData, subTotal, totalGst, totalSeatPrice },
        onwordsSearch,
        passenger_information:[...data.passengers]
      };
    
      // Save the serialized data to localStorage
      localStorage.setItem(tripTypeforRound, JSON.stringify(localStorageData));
     
    }
    if (!window.localStorage.getItem("Onward_Trip") && type!=="one_way") {
      // If data exists, reload the page
      window.location.reload();
    
    } else {
      // If no data exists, redirect to a different page
      router.replace("booking-details"); // Change the URL here as needed
    }
   
  };

  const onSaveData = (data: FormValues) => {
    toast.success("Onwords Details Saved! Please book return seat!");

   
    if (
      (typeof window !== "undefined" &&
        window.localStorage.getItem("Onward_Trip")) ||
      window.localStorage.getItem("one_way") ||
      window.localStorage.getItem("round_trip")
    ) {
      console.log("Page changed. Removing tripData...");
      window.localStorage.removeItem("Onward_Trip");
      window.localStorage.removeItem("one_way");
      window.localStorage.removeItem("round_trip");
    }

  
    const localStorageData = {
      selected_boardingPoint,
      selected_dropOffList,      
      parsedOnwardTrip,
      priceData: { seatData, subTotal, totalGst, totalSeatPrice },
      onwordsSearch,
       passenger_information:[...data.passengers]
    };
  
    // Save the serialized data to localStorage
    localStorage.setItem("Onward_Trip", JSON.stringify(localStorageData));
    // Handle form submission here (e.g., API call, state update, etc.)
    window.location.reload();
  };

  const getErrorMessages = () => {
    const errorMessages: string[] = [];
    if (errors && errors.passengers) {
      (errors.passengers as any[]).forEach(
        (passengerErrors, passengerIndex) => {
          if (passengerErrors && typeof passengerErrors === "object") {
            Object.entries(passengerErrors).forEach(
              ([errorKey, errorValue]) => {
                if (
                  errorValue &&
                  typeof errorValue === "object" &&
                  "message" in errorValue &&
                  typeof errorValue.message === "string"
                ) {
                  // Handle error message
                  errorMessages.push(
                    `Passenger ${passengerIndex + 1}: ${errorValue.message}`
                  );
                }
              }
            );
          }
        }
      );
    }
    return errorMessages;
  };
  const isPassengerDetailHas =
    Object.keys(parsedOnwardTrip).length > 1 ? true : false;

    const handleFormSubmit = (data: FormValues) => {

      console.log("onwordsSearch.tripType",onwordsSearch.tripType,parsedOnwardTrip)
      if (isPassengerDetailHas && onwordsSearch.tripType !== "one_way") {
        if (onwordsSearch.tripType === "round_trip" && onwordsSearch.returnDate) {
          onSubmit(data,"round_trip" as TripType);
        } else {
          onSaveData(data);
        }
      } else if (onwordsSearch.tripType === "one_way") {
        onSubmit(data,'one_way' as TripType);
      } else {
        onSaveData(data);
      }
    };



  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full mx-auto p-6 space-y-6 bg-white"
    >
      <h2 className="text-lg font-medium">
        Make changes to your account here. Click PROCEED TO Passenger detail
        when {"you're"} done.
      </h2>

      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-6 gap-4 items-center">
          <div
            className={cn(
              "h-12 w-full rounded-sm transition-colors border-2 border-green-500",
              "bg-white cursor-not-allowed relative",
              "flex items-center justify-center font-medium afterEffect"
            )}
          >
            {field.seat_no}
          </div>

          <Controller
            name={`passengers.${index}.name`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter Name"
                className="h-12 w-full rounded-sm transition-colors border-2 border-gray-400"
                aria-invalid={!!errors.passengers?.[index]?.name}
              />
            )}
          />

          <Controller
            name={`passengers.${index}.gender`}
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className="h-12 w-full rounded-sm transition-colors border-2 border-gray-400"
                  aria-invalid={!!errors.passengers?.[index]?.gender}
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name={`passengers.${index}.age`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Age"
                className="h-12 w-full rounded-sm transition-colors border-2 border-gray-400"
                aria-invalid={!!errors.passengers?.[index]?.age}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value, 10) : 0
                  )
                }
              />
            )}
          />

          <Controller
            name={`passengers.${index}.city`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter City"
                className="h-12 w-full rounded-sm transition-colors border-2 border-gray-400"
                aria-invalid={!!errors.passengers?.[index]?.city}
              />
            )}
          />

          <Controller
            name={`passengers.${index}.state`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter State"
                className="h-12 w-full rounded-sm transition-colors border-2 border-gray-400"
                aria-invalid={!!errors.passengers?.[index]?.state}
              />
            )}
          />

          {/* Hidden fields */}
          <input
            type="hidden"
            {...control.register(`passengers.${index}.seat_no`)}
          />
          <input
            type="hidden"
            {...control.register(`passengers.${index}.tripType`)}
          />
          <input
            type="hidden"
            {...control.register(`passengers.${index}.seat_gst`)}
          />
          <input
            type="hidden"
            {...control.register(`passengers.${index}.seat_price`)}
          />
          <input
            type="hidden"
            {...control.register(`passengers.${index}.scheduleId`)}
          />
        </div>
      ))}

      {/* Error messages section */}
      {errors.passengers && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">
            Please correct the following errors:
          </strong>
          <ul className="mt-2 list-disc list-inside">
            {getErrorMessages().map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {onwordsSearch.returnDate &&
      onwordsSearch.tripType === TripType.round_trip &&
      !isPassengerDetailHas ? (
        <Button
           className="w-full bg-primary hover:bg-orange-700 text-white"
            type="submit"
        >
          Click here to procced
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-orange-700"
          disabled={getErrorMessages().length > 0}
        >
          Proceed To Checkout
        </Button>
      )}
    </form>
  );
};

export default Passenger_DetailForm;
