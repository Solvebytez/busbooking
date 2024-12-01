

import { CityPropsType } from '@/components/SearchPageUI/BookingForm/SelectLocationFromTo';
import { extractDetails } from '@/lib/utils';
import { SearchParamsState } from '@/store/useSearchParamsStore';
import { PassengerInformation } from '@/types/@BookingTypes';
import React from 'react';


type BusTicketDetailsPropsType={
  detailsType: string;
  onwordsSearch: Partial<SearchParamsState>;
  passenger_information:PassengerInformation[];
  boardingPoints:CityPropsType;
 dropOffPoints: CityPropsType;
}

const BusTicketDetails = ({detailsType,onwordsSearch,passenger_information,boardingPoints,dropOffPoints}:BusTicketDetailsPropsType) => {

  let {
    departureDate,
    fromCity,  
    returnDate,
    toCity,
  } = onwordsSearch;

  if (detailsType === "round_trip") {
    [departureDate, returnDate] = [returnDate, departureDate];
    [fromCity, toCity] = [toCity, fromCity];
  }

  const { scheduleId, totalSeats, seatNumbers } = extractDetails(passenger_information);

  return (
    <div className="w-full mx-auto p-4  bg-white">
      <div className="grid grid-cols-2 gap-4">
        {/* <div className="flex justify-between">
          <span className="font-semibold">OB Reference:</span>
          <span>: OB75521434</span>
        </div> */}
        <div className="flex justify-between">
          <span className="font-semibold">Trip Code</span>
          <span> 1401BNGCHN</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Date of Journey:</span>
          <span>{departureDate}</span>
        </div>
       
        {fromCity && (
  <div className="flex justify-between">
    <span className="font-semibold">Start Place:</span>
    <span>{fromCity}</span>
  </div>
)}

{toCity && (
  <div className="flex justify-between">
    <span className="font-semibold">End Place:</span>
    <span>{toCity}</span>
  </div>
)}
        <div className="flex justify-between">
          <span className="font-semibold">Boarding Point:</span>
          <span>{boardingPoints.bus_stop_location}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Alighting Point:</span>
          <span>{dropOffPoints.bus_stop_location}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Total Seats:</span>
          <span>{totalSeats}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Seat Number:</span>
          <span>{seatNumbers.join(',')}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Departure Time:</span>
          <span>{boardingPoints.bus_time}</span>
        </div>
        {/* <div className="flex justify-between">
          <span className="font-semibold">Platform Number</span>
          <span>: -</span>
        </div> */}
      </div>
    </div>
  );
};

export default BusTicketDetails;
