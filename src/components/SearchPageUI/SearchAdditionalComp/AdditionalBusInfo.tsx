/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Armchair, Clock, MapPinned } from "lucide-react";
import Amenities from "../Amenities";
import BusSlider from "./BusSlider";

import BookingForm from "../BookingForm/BookingForm";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  cn,
  convertBusBoardingStringToArray,
  convertStringToArrayOfObjects,
  convertToArrayString,
  extractTimeAndName,
  SeatData,
} from "@/lib/utils";
import Passenger_DetailForm from "../BookingForm/Passenger_Detail";
import { useGetScheduleById } from "@/ClientApi/scheduleList";
import { CityPropsType } from "@/components/Input/SelectInput";

import useDropOffStore from "@/store/boarding_dropOff_store";
import { BusLayout } from "./Seats/BusSeatNew";

export enum BusOption {
  BOARDING_POINTS = "Boarding Points",
  CANCELLATION_POLICY = "Cancellation Policy",
  DROPPING_POINTS = "Dropping Points",
  VIA_CITIES = "Via Cities",
  AMENITIES = "Amenities",
  BUS_PICTURES = "Bus Pictures",
  SELECT_BERTH = "Select Berth",
}

// enum LoginType {
//   guest_Login = "guest_Login",
//   credential_login = "credential_login",
// }

const AdditionalBusInfo = ({
  openItem,
  scheduleId,
  allcityList,
}: {
  openItem: string | null;
  scheduleId: string;
  allcityList: CityPropsType[];
}) => {
  const [isPassengerOpen, setPassengerOpen] = useState(false as boolean);

  const [selectedSeats, setSelectSeat] = useState<SeatData[]>([]);
 
 


  const { setBoardingPoint,setDropOffList } = useDropOffStore();
  const {
    data: singleschedule,
    isLoading,
    error,
  } = useGetScheduleById(scheduleId);

  useEffect(() => {
    setPassengerOpen(false);
  }, [selectedSeats]);

  useEffect(()=>{
    const defaultDropOff = {
      bus_time: '', // Some default bus time
      bus_stop_location: '', // Example location
      bus_location_id: '', // Example ID
    };

    const defaultBoardingPoint = {
      bus_time: '', // Some default bus time
      bus_stop_location: '', // Example location
      bus_location_id: '', // Example ID
    };
    setDropOffList(defaultDropOff);
    setBoardingPoint(defaultBoardingPoint);
  },[scheduleId, setBoardingPoint, setDropOffList])

  if (isLoading || !singleschedule) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  const { bus_layout, via, amenities } = singleschedule.data;

  if (openItem === BusOption.BOARDING_POINTS) {
    const boardingStages =
      allcityList &&
      singleschedule &&
      extractTimeAndName(bus_layout.boarding_stages);
    return (
      <>
        {boardingStages.map((stage) => (
          <div
            key={stage.time}
            className="flex gap-3 items-center font-semibold"
          >
            <div className="w-[40%]">{stage.name}</div>
            <div className="flex gap-1 items-center">
              <Clock size={15} /> {stage.time}
            </div>
          </div>
        ))}
      </>
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
    const dropingStages =
      allcityList &&
      singleschedule &&
      extractTimeAndName(bus_layout.dropoff_stages);
    return (
      <>
        {dropingStages.map((stage) => (
          <div
            key={stage.time}
            className="flex gap-3 items-center font-semibold"
          >
            <div className="w-[40%]">{stage.name}</div>
            <div className="flex gap-1 items-center">
              <Clock size={15} /> {stage.time}
            </div>
          </div>
        ))}
      </>
    );
  }

  if (openItem === BusOption.VIA_CITIES) {
    const viaCities = convertToArrayString(via);
    return (
      <nav className="bg-[#f8f9fa] p-3 w-full">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          {viaCities.map((cities, i) => {
            return (
              <span key={cities + 1} className="text-gray-800">
                <span className="text-gray-800">{cities}</span>
                {i !== viaCities.length - 1 && (
                  <span className="text-gray-500 ml-2">-</span>
                )}
              </span>
            );
          })}
        </div>
      </nav>
    );
  }

  if (openItem === BusOption.AMENITIES) {
    if (!amenities) return <div>No Amenities available</div>;

    const amenitiesList = convertStringToArrayOfObjects(amenities);
    return <Amenities amenitiesList={amenitiesList} />;
  }

  if (openItem === BusOption.BUS_PICTURES) {
    return <BusSlider />;
  }

  if (openItem === BusOption.SELECT_BERTH) {
    const boarding_stopies = convertBusBoardingStringToArray(
      bus_layout.boarding_stages,'boarding_stopies'
    );
    const droping_stopies = convertBusBoardingStringToArray(
      bus_layout.dropoff_stages,'droping_stopies'
    );

    // const availableSeatForOneWay = findAvailableSeatArray(
    //   bus_layout.available,
    //   bus_layout.available_gst,
    //   tripTypeUri as TripType
    // );

    // const booked_gents_seat = parseBookedSeats(bus_layout.gents_booked_seats)
    // const booked_ladies_seat = parseBookedSeats(bus_layout.ladies_booked_seats)

 
    console.log("selectedSeats",selectedSeats)
   
    return (
      <div className="flex flex-col ">
        <div className="flex gap-1 h-[3rem] mb-3">
          <div className="w-[65%] font-semibold text-secondary flex items-center gap-2">
            {" "}
            <span className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
              <Armchair size={25} className="text-white" />
            </span>{" "}
            Select{selectedSeats.length > 0&&'ed'} Seat{selectedSeats.length > 0&&':'} {selectedSeats.length > 0
            ? selectedSeats.map((item) =>  item.seat).join(", ")
            : ''}
          </div>
          <div className="w-[33%] font-semibold text-secondary flex items-center gap-2">
            {" "}
            <span className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
              <MapPinned size={25} className="text-white" />
            </span>
            Select Pickup and Dropoff point
          </div>
        </div>
        <div className="flex gap-5 min-h-[25rem]">
          <div className="w-[65%]">
            <BusLayout  setSelectSeat={setSelectSeat}
              selectedSeats={selectedSeats} layout={bus_layout}/>
            {/* <BusSeats
              availableSeatForOneWay={availableSeatForOneWay}
              scheduleId={scheduleId}
              setSelectSeat={setSelectSeat}
              selectedSeats={selectedSeats}
              booked_gents_seat={booked_gents_seat}
              booked_ladies_seat={booked_ladies_seat}
            /> */}
          </div>{" "}
          <div className="w-[35%]">
            <BookingForm            
              selectedSeats={selectedSeats}
              boarding_stopies={boarding_stopies}
              droping_stopies={droping_stopies}
              onClick={() => setPassengerOpen((prev) => !prev)}
            />
          </div>{" "}
        </div>
        {isPassengerOpen && (
          <div>
            <Tabs
              defaultValue="passenger_details"
              className="w-[100%] mt-4"
            >
              <TabsList className="w-full h-[3rem] p-0">
                <TabsTrigger                
                  value="customer_details"
                  className={cn(
                    "text-lg font-bold bg-primary text-center w-full text-white data-[state=active]:text-white"
                  )}
                >
                  Customer Details
                </TabsTrigger>
                {/* <TabsTrigger
                  disabled={tabActive ==='customer_details' }
                  value="passenger_details"
                  className={cn(
                    "text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-white"
                  )}
                >
                  Passenger Detail
                </TabsTrigger> */}
              </TabsList>

              {/* <TabsContent value="customer_details">
                <div className="flex w-full h-[4rem] justify-center">
                  <RadioGroup
                    value={loginType}
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

                {loginType === LoginType.guest_Login && !isLogeedIn && (
                  <GuestLoginForm
                    onSuccsecchLogin={() => {
                      setUserLoggedIn(false);
                      setTabActive("passenger_details");
                    }}
                  />
                )}
                {loginType === LoginType.credential_login && <CredentialForm />}
              </TabsContent> */}

              <TabsContent value="passenger_details">
                {isPassengerOpen && (
                  <Passenger_DetailForm
                    selectedSeats={selectedSeats}
                    scheduleId={scheduleId}
                   
                  />
                )}
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
