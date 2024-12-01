
import { CityPropsType } from "@/components/SearchPageUI/BookingForm/SelectLocationFromTo";
import { SeatStore } from "@/store/store_price";
import { SearchParamsState } from "@/store/useSearchParamsStore";
import { z } from "zod";

export interface PassengerInformation {
    age: number;
    city: string;
    gender: "male" | "female" | "other"; // You can add more options if needed
    name: string;
    scheduleId: string;
    seat_gst: number;
    seat_no: string;
    seat_price: number;
    state: string;
    tripType: "one_way" | "round_trip"; // Add other trip types if applicable
  }


 export interface OneWayData {
    onwordsSearch?: Partial<SearchParamsState>;
    parsedOnwardTrip?: object;
    passenger_information?: PassengerInformation[];
    priceData?: SeatStore;
    selected_boardingPoint?: CityPropsType;
    selected_dropOffList?: CityPropsType;
  }
  

  export const passengerSchema = z.object({
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
  })
  
 export const bookingSchema = z.object({
    emailId: z.string().email(),
    contactNumber: z.string().min(10).max(10),
    onwardPassengers: z.array(passengerSchema).optional(),
    returnPassengers: z.array(passengerSchema).optional(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })