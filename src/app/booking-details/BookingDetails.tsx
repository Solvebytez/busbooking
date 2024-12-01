"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check } from "lucide-react";
import {
  bookingSchema,
  OneWayData,
  PassengerInformation,
} from "@/types/@BookingTypes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import FareBreakdown from "./FareBreakdown";
import BusTicketDetails from "./BusTicketDetails";
import Image from "next/image";

// Passenger Schema

// type Seat = {
//   seat: string;
//   price: number;
//   gst: number;
//   scheduleId: string;
//   name?: string;
//   gender?: string;
//   age?: number;
//   city?: string;
//   state?: string;
// }

// type BookingFormProps = {
//   onwardPassengers?: PassengerInformation[];
//   returnPassengers?: PassengerInformation[];
// };

export default function BookingForm() {
  const [alloneWayData, setOneWayData] = useState<OneWayData | null>(null);
  const [onwardPassengers, setOnwardPassengers] = useState<
    PassengerInformation[]
  >([]);

  const [allReturnWayData, setAllReturnWayData] = useState<OneWayData | null>(
    null
  );
  const [returnPassengers, setReturnPassengers] = useState<
    PassengerInformation[]
  >([]);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      emailId: "",
      contactNumber: "",
      onwardPassengers: onwardPassengers.map((passenger) => ({
        seat_no: passenger.seat_no,
        name: passenger.name || "",
        gender: passenger.gender || "",
        age: passenger.age || 0,
        city: passenger.city || "",
        state: passenger.state || "",
        seat_price: passenger.seat_price,
        seat_gst: passenger.seat_gst,
        scheduleId: passenger.scheduleId,
        tripType: "onward",
      })),
      returnPassengers: returnPassengers.map((passenger) => ({
        seat_no: passenger.seat_no,
        name: passenger.name || "",
        gender: passenger.gender || "",
        age: passenger.age || 0,
        city: passenger.city || "",
        state: passenger.state || "",
        seat_price: passenger.seat_price,
        seat_gst: passenger.seat_gst,
        scheduleId: passenger.scheduleId,
        tripType: "return",
      })),
      termsAccepted: false,
    },
  });

  useEffect(() => {
    // Fetch data from localStorage
    const storedData =
      localStorage.getItem("one_way") || localStorage.getItem("Onward_Trip");

    if (storedData) {
      try {
        const parsedData: OneWayData = JSON.parse(storedData);
        setOneWayData(parsedData);
        const passengers = parsedData.passenger_information ?? [];
        setOnwardPassengers(passengers);

        // Set the form values
        form.setValue(
          "onwardPassengers",
          passengers.map((passenger) => ({
            ...passenger,
            tripType: "onward",
          }))
        );
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
    const returnData = localStorage.getItem("round_trip");
    if (returnData) {
      try {
        const parsedReturnData: OneWayData = JSON.parse(returnData);
        setAllReturnWayData(parsedReturnData);

        const passengers = parsedReturnData.passenger_information ?? [];
        setReturnPassengers(passengers);

        // Set the form values
        form.setValue(
          "returnPassengers",
          passengers.map((passenger) => ({
            ...passenger,
            tripType: "onward",
          }))
        );
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, [form]);

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    console.log(values);
  }

  console.log(
    "alloneWayData",
    alloneWayData?.priceData?.subTotal,
    "allReturnWayData",
    allReturnWayData?.priceData?.subTotal
  );

  const oneWaySubtotal = alloneWayData?.priceData?.subTotal || 0;
const returnWaySubtotal = allReturnWayData?.priceData?.subTotal || 0;

const total = oneWaySubtotal + returnWaySubtotal;

  if (onwardPassengers.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          No passengers have been selected. Please go back and select seats for
          your journey.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full md:px-[1rem] xl:px-[4rem] my-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4 items-start"
        >
          <Card className="col-span-8">
            <CardHeader>
              <CardTitle>Review Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="emailId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          {...field}
                          className="h-12 rounded-sm border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567890"
                          {...field}
                          className="h-12 rounded-sm border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-4" />
              {alloneWayData?.passenger_information && (
                <BusTicketDetails
                  detailsType="oneWayData"
                  onwordsSearch={alloneWayData.onwordsSearch!}
                  passenger_information={alloneWayData?.passenger_information}
                  boardingPoints={alloneWayData.selected_boardingPoint!}
                  dropOffPoints={alloneWayData.selected_dropOffList!}
                />
              )}

              {/* Onward Trip */}
              {onwardPassengers.length > 0 && (
                <div className="space-y-4 p-5 bg-green-100/10">
                  <h3 className="text-lg font-semibold">
                    Onward Trip Passengers Review
                  </h3>
                  {form.watch("onwardPassengers")?.map((_, index) => (
                    <Card
                      key={index}
                      className="flex flex-col items-center shadow-none border-none bg-transparent"
                    >
                      <CardContent className="w-full p-0">
                        <div className="grid grid-cols-6 gap-4 flex-1">
                          <FormField
                            control={form.control}
                            name={`onwardPassengers.${index}.seat_no`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Seat No</FormLabel>
                                <FormControl>
                                  <button
                                    type="button"
                                    disabled
                                    className={cn(
                                      "h-12 rounded-sm  w-full transition-colors border-2 border-green-500",
                                      "bg-white cursor-not-allowed relative",
                                      "flex items-center justify-center font-medium afterEffect"
                                    )}
                                  >
                                    {field.value || "N/A"}{" "}
                                    {/* Display the seat number or a placeholder */}
                                  </button>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`onwardPassengers.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`onwardPassengers.${index}.gender`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12 rounded-sm border-gray-500">
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`onwardPassengers.${index}.age`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(e.target.valueAsNumber)
                                    }
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`onwardPassengers.${index}.city`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`onwardPassengers.${index}.state`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`onwardPassengers.${index}.seat_price`}
                            render={({ field }) => (
                              <FormItem hidden>
                                <FormLabel>Seat Price</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    readOnly
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`onwardPassengers.${index}.seat_gst`}
                            render={({ field }) => (
                              <FormItem hidden>
                                <FormLabel>Seat GST</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    readOnly
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {alloneWayData && alloneWayData.priceData && onwardPassengers.length >0 && (
                    <FareBreakdown
                      priceType="oneWayData"
                      priceData={alloneWayData.priceData}
                    />
                  )}
                </div>
              )}

            

              {returnPassengers.length > 0 && (  <>
                <Separator className="my-4" />                <h3 className="text-lg font-semibold">
                  Return Trip Passengers Review
                </h3>
              </>
              )}

              {allReturnWayData?.passenger_information && (
                <BusTicketDetails
                  detailsType="round_trip"
                  onwordsSearch={allReturnWayData.onwordsSearch!}
                  passenger_information={
                    allReturnWayData?.passenger_information
                  }
                  boardingPoints={allReturnWayData.selected_boardingPoint!}
                  dropOffPoints={allReturnWayData.selected_dropOffList!}
                />
              )}

              {returnPassengers.length > 0 && <Separator className="my-4" />}
              
              {/* Return Trip */}
              {returnPassengers.length > 0 && (
                <div className="space-y-4 bg-primary/5 p-5">
                  {form.watch("returnPassengers")?.map((_, index) => (
                    <Card
                      key={index}
                      className="flex flex-col items-center shadow-none border-none bg-transparent "
                    >
                      <CardContent className="w-full p-0">
                        <div className="grid grid-cols-6 gap-4 flex-1">
                          <FormField
                            control={form.control}
                            name={`returnPassengers.${index}.seat_no`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Seat No</FormLabel>
                                <FormControl>
                                  <button
                                    type="button"
                                    disabled
                                    className={cn(
                                      "h-12 rounded-sm  w-full transition-colors border-2 border-primary",
                                      "bg-white cursor-not-allowed relative",
                                      "flex items-center justify-center font-medium afterEffect after:bg-primary"
                                    )}
                                  >
                                    {field.value || "N/A"}{" "}
                                    {/* Display the seat number or a placeholder */}
                                  </button>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`returnPassengers.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`returnPassengers.${index}.gender`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12 rounded-sm border-gray-500">
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`returnPassengers.${index}.age`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(e.target.valueAsNumber)
                                    }
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`returnPassengers.${index}.city`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`returnPassengers.${index}.state`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`returnPassengers.${index}.seat_price`}
                            render={({ field }) => (
                              <FormItem hidden>
                                <FormLabel>Seat Price</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    readOnly
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`returnPassengers.${index}.seat_gst`}
                            render={({ field }) => (
                              <FormItem hidden>
                                <FormLabel>Seat GST</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    readOnly
                                    className="h-12 rounded-sm border-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              {allReturnWayData && allReturnWayData.priceData && (
                <FareBreakdown
                  priceType="returnPrice"
                  priceData={allReturnWayData.priceData}
                />
              )}
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Select Payment Gateway</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
            <div className="flex items-start gap-2">
             
              <div className="space-y-2 flex flex-col items-center">
             <div className="flex gap-3">
             <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <Image
                  src="/phonepe-1.svg"
                  alt="Razorpay"
                  width={120}
                  height={30}
                  className="mb-2"
                />
             </div>
              
              </div>
            </div>
          </div>
              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to {"SANCHAR6T's"} Terms and Conditions
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
                <Separator className="my-4" />
              <div className="flex justify-between items-center px-2">
          <span className="text-lg font-bold">Amount to be Paid</span>
          <span className="text-lg font-semibold">₹ {total}</span>
        </div>

              <Button type="submit" className="w-full">
                Proceed to Pay
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
