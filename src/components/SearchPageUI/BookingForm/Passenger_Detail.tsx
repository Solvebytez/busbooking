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

const passengerSchema = z.object({
  seat_no: z.string(),
  name: z.string().min(1, "Name is required"),
  gender: z.string().min(1, "Gender is required"),
  age: z.string().min(1, "Age is required").transform(Number),
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
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
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

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted with passenger data:", data.passengers);
    toast.success("Form submitted successfully!");
    // Handle form submission here (e.g., API call, state update, etc.)
  };

  const getErrorMessages = () => {
    const errorMessages: string[] = [];
   if(errors){
    if (errors.passengers) {
      errors.passengers.forEach((passengerErrors, index) => {
        if (passengerErrors && typeof passengerErrors === 'object') {
          Object.entries(passengerErrors).forEach(([ error]) => {
            if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
              errorMessages.push(`Passenger ${index + 1} - ${error.message}`);
            }
          });
        }
      });
    }
   }
    return errorMessages;
  };

  console.log("errors",errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto p-6 space-y-6 bg-white">
      <h2 className="text-lg font-medium">
        Make changes to your account here. Click PROCEED TO Passenger detail
        when {"you're"} done.
      </h2>

      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-8 gap-4 items-center">
          <div className={cn(
            "h-12 w-full rounded-sm transition-colors border-2 border-green-500",
            "bg-white cursor-not-allowed relative",
            "flex items-center justify-center font-medium afterEffect"
          )}>
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
          <input type="hidden" {...control.register(`passengers.${index}.seat_no`)} />
          <input type="hidden" {...control.register(`passengers.${index}.tripType`)} />
          <input type="hidden" {...control.register(`passengers.${index}.seat_gst`)} />
          <input type="hidden" {...control.register(`passengers.${index}.seat_price`)} />
          <input type="hidden" {...control.register(`passengers.${index}.scheduleId`)} />
        </div>
      ))}

      {/* Error messages section */}
      {errors.passengers && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Please correct the following errors:</strong>
          <ul className="mt-2 list-disc list-inside">
            {getErrorMessages().map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700"
      >
        Proceed To Passenger Detail
      </Button>
    </form>
  );
};

export default Passenger_DetailForm;

