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
import { DetailsModal } from "./DetailsModal";
import { useState } from "react";

// Schema for additional passengers (optional fields)
const additionalPassengerSchema = z.object({
  seat_no: z.string(),
  name: z.string().optional(),
  gender: z.string().optional(),
  age: z.number().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  seat_price: z.number(),
  seat_gst: z.number(),
  scheduleId: z.string(),
  tripType: z.string(),
});

// Schema for the first passenger (required fields)
const firstPassengerSchema = z.object({
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
  passengers: z.array(
    z.union([firstPassengerSchema, additionalPassengerSchema])
  ).superRefine((data, ctx) => {
    // Only validate the first passenger
    if (data.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "First passenger's details are required",
        path: [0],
      });
      return;
    }

    const firstPassenger = data[0];
    if (!firstPassenger.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name is required",
        path: [0, "name"],
      });
    }
    if (!firstPassenger.gender) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Gender is required",
        path: [0, "gender"],
      });
    }
    if (!firstPassenger.age || firstPassenger.age < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Age must be at least 1",
        path: [0, "age"],
      });
    }
    if (!firstPassenger.city) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "City is required",
        path: [0, "city"],
      });
    }
    if (!firstPassenger.state) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "State is required",
        path: [0, "state"],
      });
    }
  }),
});

export type FormValues = z.infer<typeof formSchema>;

const Passenger_DetailForm = ({
  selectedSeats,
  scheduleId,
}: {
  selectedSeats: SeatData[];
  scheduleId: string;
}) => {
  const { selected_boardingPoint, selected_dropOffList } = useDropOffStore();
  const { parsedOnwardTrip } = useOnwardTripStore();
  const { data: seatData, subTotal, totalGst, totalSeatPrice } = usePriceStore();
  const onwordsSearch = useSearchParamsStore();
  const router = useRouter();
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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

  const onSubmit = (data: FormValues, type: TripType) => {
    toast.success("Form Submitted successfully!");

    if (
      typeof window !== "undefined" &&
      (window.localStorage.getItem("one_way") ||
        window.localStorage.getItem("round_trip"))
    ) {
      window.localStorage.removeItem("one_way");
      window.localStorage.removeItem("round_trip");
    }

    const localStorageData = {
      selected_boardingPoint,
      selected_dropOffList,
      parsedOnwardTrip,
      priceData: { seatData, subTotal, totalGst, totalSeatPrice },
      onwordsSearch,
      passenger_information: [...data.passengers],
    };

    if (type === "one_way") {
      localStorage.setItem("one_way", JSON.stringify(localStorageData));
    } else if (type === "round_trip") {
      const tripTypeforRound = window.localStorage.getItem("Onward_Trip")
        ? "round_trip"
        : "Onward_Trip";
      localStorage.setItem(tripTypeforRound, JSON.stringify(localStorageData));
    }

    if (!window.localStorage.getItem("Onward_Trip") && type !== "one_way") {
      window.location.reload();
    } else {
      router.replace("booking-details");
    }
  };

  const onSaveData = (data: FormValues) => {
    toast.success("Onwords Details Saved! Please book return seat!");

    if (
      typeof window !== "undefined" &&
      (window.localStorage.getItem("Onward_Trip") ||
        window.localStorage.getItem("one_way") ||
        window.localStorage.getItem("round_trip"))
    ) {
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
      passenger_information: [...data.passengers],
    };

    localStorage.setItem("Onward_Trip", JSON.stringify(localStorageData));
    window.location.reload();
  };

  const getErrorMessages = () => {
    const errorMessages: string[] = [];
    if (errors.passengers?.[0]) {
      // Only show errors for the first passenger
      Object.values(errors.passengers[0]).forEach((error: any) => {
        if (error?.message) {
          errorMessages.push(error.message);
        }
      });
    }
    return errorMessages;
  };

  const isPassengerDetailHas = Object.keys(parsedOnwardTrip).length > 1;

  const handleFormSubmit = (data: FormValues) => {
    if (isPassengerDetailHas && onwordsSearch.tripType !== "one_way") {
      if (onwordsSearch.tripType === "round_trip" && onwordsSearch.returnDate) {
        setShowDetailsModal(true);
      } else {
        onSaveData(data);
      }
    } else if (onwordsSearch.tripType === "one_way") {
      setShowDetailsModal(true);
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
        Make changes to your account here. Click PROCEED TO Passenger detail when
        {"you're"} done.
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
                className={cn(
                  "h-12 w-full rounded-sm transition-colors border-2",
                  index === 0 && errors.passengers?.[0]?.name
                    ? "border-red-500"
                    : "border-gray-400"
                )}
              />
            )}
          />

          <Controller
            name={`passengers.${index}.gender`}
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={cn(
                    "h-12 w-full rounded-sm transition-colors border-2",
                    index === 0 && errors.passengers?.[0]?.gender
                      ? "border-red-500"
                      : "border-gray-400"
                  )}
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
                className={cn(
                  "h-12 w-full rounded-sm transition-colors border-2",
                  index === 0 && errors.passengers?.[0]?.age
                    ? "border-red-500"
                    : "border-gray-400"
                )}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value, 10) : undefined
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
                className={cn(
                  "h-12 w-full rounded-sm transition-colors border-2",
                  index === 0 && errors.passengers?.[0]?.city
                    ? "border-red-500"
                    : "border-gray-400"
                )}
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
                className={cn(
                  "h-12 w-full rounded-sm transition-colors border-2",
                  index === 0 && errors.passengers?.[0]?.state
                    ? "border-red-500"
                    : "border-gray-400"
                )}
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
      {getErrorMessages().length > 0 && (
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
          Click here to proceed
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-orange-700 text-white"
          disabled={getErrorMessages().length > 0}
        >
          Proceed To Checkout
        </Button>
      )}
      <DetailsModal
        showDetailsModal={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        formData={control._formValues as FormValues}
        submitOnCheckout={(data) =>
          onSubmit(data, onwordsSearch.tripType as TripType)
        }
      />
    </form>
  );
};

export default Passenger_DetailForm;

