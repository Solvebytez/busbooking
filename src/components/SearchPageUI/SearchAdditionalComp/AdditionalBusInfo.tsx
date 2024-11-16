"use client";

import { Armchair, Clock, MapPinned } from "lucide-react";
import Amenities from "../Amenities";
import BusSlider from "./BusSlider";
import BusSeats from "./BusSeats";
import BookingForm from "../BookingForm/BookingForm";
import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GuestLoginForm from "../BookingForm/GuestLoginForm";
import CredentialForm from "../BookingForm/CredentialForm";
import { cn } from "@/lib/utils";
import Passenger_DetailForm from "../BookingForm/Passenger_Detail";

export enum BusOption {
  BOARDING_POINTS = "Boarding Points",
  CANCELLATION_POLICY = "Cancellation Policy",
  DROPPING_POINTS = "Dropping Points",
  VIA_CITIES = "Via Cities",
  AMENITIES = "Amenities",
  BUS_PICTURES = "Bus Pictures",
  SELECT_BERTH = "Select Berth",
}

enum LoginType {
  guest_Login = "guest_Login",
  credential_login = "credential_login",
}

const AdditionalBusInfo = ({ openItem }: { openItem: string | null }) => {
  const [isPassengerOpen, setPassengerOpen] = useState(false as boolean);
  const [loginType, setLoginType] = useState<string>(LoginType.guest_Login);

  if (openItem === BusOption.BOARDING_POINTS) {
    return (
      <div className="flex gap-3 items-center font-semibold">
        <div className="w-[40%]">AGUMBE BUS STAND</div>
        <div className="flex gap-1 items-center">
          <Clock size={15} /> 20:01
        </div>
      </div>
    );
  }

  if (openItem === BusOption.CANCELLATION_POLICY) {
    return (
      <div className="bg-blue-50 p-5 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-2">
          Trip Starts from: AGUMBE on 20:01, Fri 22 Nov
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="border-b p-2">Duration (Cancellation time)</th>
                <th className="border-b p-2">Cancellation Fee</th>
                <th className="border-b p-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-2">
                  Up to 72 hours before the departure time
                </td>
                <td className="border-b p-2">
                  10% of basic fare + Reservation fee
                </td>
                <td className="border-b p-2"></td>
              </tr>
              <tr>
                <td className="border-b p-2">
                  Between 72 hours and up to 24 hours before departure time
                </td>
                <td className="border-b p-2">
                  25% of basic fare + Reservation fee
                </td>
                <td className="border-b p-2"></td>
              </tr>
              <tr>
                <td className="border-b p-2">
                  Between 24 hours and up to 2 hours before departure time
                </td>
                <td className="border-b p-2">
                  50% of basic fare + Reservation fee
                </td>
                <td className="border-b p-2"></td>
              </tr>
              <tr>
                <td className="border-b p-2">
                  Less than 2 hours before departure time and at/after the
                  departure time
                </td>
                <td className="border-b p-2">100% of basic fare + Other fee</td>
                <td className="border-b p-2">NO REFUND</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (openItem === BusOption.DROPPING_POINTS) {
    return (
      <div className="flex gap-3 items-center font-semibold">
        <div className="w-[40%]">SHRISHAIL BUS STAND</div>
        <div className="flex gap-1 items-center">
          <Clock size={15} /> 20:01
        </div>
      </div>
    );
  }

  if (openItem === BusOption.VIA_CITIES) {
    return (
      <nav className="bg-[#f8f9fa] p-3 w-full">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <span className="text-gray-800">GOKARNA</span>
          <span className="text-gray-500">-</span>
          <span className="text-gray-800">KUMTA</span>
          <span className="text-gray-500">-</span>
          <span className="text-gray-800">SIRSI</span>
          <span className="text-gray-500">-</span>
          <span className="text-gray-800">HAVERI</span>
          <span className="text-gray-500">-</span>
          <span className="text-gray-800">HUVINA HADAGALI</span>
          <span className="text-gray-500">-</span>
          <span className="text-gray-800">HOSAPETE</span>
          <span className="text-gray-500">-</span>
          <span className="text-gray-800">BALLARI</span>
          <span className="text-gray-500">-</span>
          <span className="text-green-600">ADONI</span>
          <span className="text-gray-500">-</span>
          <span className="text-green-600">MANTRALAYA</span>
        </div>
      </nav>
    );
  }

  if (openItem === BusOption.AMENITIES) {
    return <Amenities />;
  }

  if (openItem === BusOption.BUS_PICTURES) {
    return <BusSlider />;
  }

  if (openItem === BusOption.SELECT_BERTH) {
    return (
      <div className="flex flex-col">
        <div className="flex gap-1 h-[3rem] mb-3">
          <div className="w-[65%] font-semibold text-secondary flex items-center gap-2"> <span className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
            <Armchair size={25} className="text-white" /></span> Select Seat</div>        
          <div className="w-[33%] font-semibold text-secondary flex items-center gap-2"> <span className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
          <MapPinned size={25} className="text-white" /></span>Select Pickup and Dropoff point</div>
        </div>
        <div className="flex gap-5">
          <div className="w-[65%]">
            <BusSeats />
          </div>{" "}
          <div className="w-[35%]">
            <BookingForm onClick={() => setPassengerOpen((prev) => !prev)} />
          </div>{" "}
        </div>
        {isPassengerOpen && (
          <div>
            <Tabs defaultValue="Customer Details" className="w-[100%] mt-4">
              <TabsList className="grid w-full grid-cols-2 h-[3rem]">
                <TabsTrigger
                  value="Customer Details"
                  className={cn(
                    "text-lg data-[state=active]:bg-primary data-[state=active]:text-white"
                  )}
                >
                  Customer Details
                </TabsTrigger>
                <TabsTrigger
                  value="Passenger Detail"
                  className={cn(
                    "text-lg data-[state=active]:bg-primary data-[state=active]:text-white"
                  )}
                >
                  Passenger Detail
                </TabsTrigger>
              </TabsList>

              <TabsContent value="Customer Details">
                <div className="flex w-full h-[4rem] justify-center">
                  <RadioGroup
                    defaultValue={loginType}
                    onValueChange={(val) => setLoginType(val)}
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={LoginType.guest_Login}
                        id="r4"
                        className="w-[20px] h-[20px]"
                      />
                      <Label htmlFor="r4" className="text-lg">
                        Continue As Guest
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={LoginType.credential_login}
                        id="r6"
                        className="w-[20px] h-[20px]"
                      />
                      <Label htmlFor="r6" className="text-lg">
                        Login
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* {Guest Login FORM} */}
                {loginType === LoginType.guest_Login && <GuestLoginForm />}
                {loginType === LoginType.credential_login && <CredentialForm />}

                {/* {Credential Login FORM} */}
              </TabsContent>
              <TabsContent value="Passenger Detail">
                <Passenger_DetailForm />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default AdditionalBusInfo;
