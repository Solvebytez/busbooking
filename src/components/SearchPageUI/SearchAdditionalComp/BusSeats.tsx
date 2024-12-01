"use client";

import { ShipWheelIcon as SteeringWheel } from "lucide-react";
import { BookedSeat, cn, SeatData } from "@/lib/utils";

type BusSeatProps = {
  setSelectSeat: (val: SeatData[]) => void;
  availableSeatForOneWay: SeatData[];
  scheduleId: string;
  selectedSeats: SeatData[];
  booked_gents_seat: BookedSeat[];
  booked_ladies_seat: BookedSeat[];
};

export default function BusSeats({
  availableSeatForOneWay,
  setSelectSeat,
  selectedSeats,
  booked_gents_seat,
  booked_ladies_seat,
}: BusSeatProps) {
  const isSeatSelected = (seatNumber: SeatData) => {
    return !!selectedSeats.find(
      (item: SeatData) => item.seat === seatNumber.seat
    );
  };

  const toggleSeatSelection = (seatNumber: SeatData) => {
  
    if (isSeatSelected(seatNumber)) {
      setSelectSeat(
        selectedSeats.filter((seat) => seat.seat !== seatNumber.seat)
      );
    } else {
      setSelectSeat([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="w-full mx-auto p-0">
      <div className="relative border rounded-lg p-8 bg-background">
        {/* Driver section */}
        <div className="absolute left-4 top-4">
          <div className="flex gap-1">
            <SteeringWheel className="w-6 h-6 text-muted-foreground" />
            <div className="text-xs text-muted-foreground mt-1 font-bold text-green-600">
              Available Seats ({availableSeatForOneWay.length.toString()})
            </div>
          </div>
        </div>

        {/* Seat grid */}
        <div className="gap-2 mt-6 flex flex-wrap">
          {availableSeatForOneWay.map((seat, index) => {
            const seatNumber = seat.seat;

            // If seat or price is not available, show 'Not Available' and skip rendering the button
            if (!seatNumber || !seat.price) {
              return null;
            }

            return (
              <button
                key={seatNumber + index}
                onClick={() => toggleSeatSelection(seat)} // Add tripType here
                // disabled={isSeatBooked(seatNumber)}
                aria-label={`Seat ${seatNumber} ${
                  isSeatSelected(seat) ? "selected" : "available"
                }`}
                className={cn(
                  "h-8 rounded-sm text-xs transition-colors border border-green-600  w-[50px] flex items-center justify-center font-medium relative",

                  // isSeatAvailable(seatNumber) &&
                  //   !isSeatSelected(seatNumber) &&
                  //   "border-2 border-green-500 hover:bg-green-50",
                  isSeatSelected(seat) &&
                    "bg-blue-500 text-white border-blue-500"
                )}
              >
                <span className="absolute right-0 top-[30%] bottom-3 w-[3px] h-[13px] bg-green-600"></span>
                {seatNumber}
              </button>
            );
          })}
        </div>
        <div className="gap-2 mt-6 flex flex-wrap">
          {booked_gents_seat.length > 0 &&
            booked_gents_seat.map((seat, index) => {
              return (
                <button
                  key={seat.row + index}
                  className={cn(
                    "h-8 rounded-sm text-xs text-white transition-colors border bg-zinc-400 border-zinc-400  w-[50px] flex items-center justify-center font-medium relative cursor-not-allowed"
                  )}
                >
                  {seat.row}
                </button>
              );
            })}
        </div>
        <div className="gap-2 mt-6 flex flex-wrap">
          {booked_ladies_seat.length > 0 &&
            booked_ladies_seat.map((seat, index) => {
              return (
                <button
                  key={seat.row + index}
                  className={cn(
                    "h-8 rounded-sm text-xs text-white transition-colors border bg-rose-500 border-rose-500  w-[50px] flex items-center justify-center font-medium relative cursor-not-allowed"
                  )}
                >
                  {seat.row}
                </button>
              );
            })}
        </div>
        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
          {/* <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-sm" />
            <span>Booked</span>
          </div> */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-500 rounded-sm" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-sm" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-rose-500 rounded-sm" />
            <span>Female</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-zinc-400 rounded-sm" />
            <span>Gents</span>
          </div>
        </div>

        {/* Selected seats summary */}
        <div className="mt-4 text-sm font-bold">
          <strong>Selected Seats:</strong>{" "}
          {selectedSeats.length > 0
            ? selectedSeats.map((item) => item.seat).join(", ")
            : 0}
        </div>
      </div>
    </div>
  );
}
