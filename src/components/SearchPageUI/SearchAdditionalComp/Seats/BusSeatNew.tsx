"use client";

import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Seat } from "./seat";
import { SeatData } from "@/lib/utils";
import Image from "next/image";
import React from "react";


interface BusLayoutProps {
  setSelectSeat:Dispatch<SetStateAction<SeatData[]>>;
  selectedSeats: SeatData[];
  layout: {
    total_seats: number;
    coach_details: string;
    available: string;
    available_gst: string;
    ladies_seats?: string;
    ladies_booked_seats?: string;
    gents_booked_seats?: string;
  };
}

export function BusLayout({ layout,selectedSeats,setSelectSeat}: BusLayoutProps) {
  // const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const isSeatSelected = (seatNumber: SeatData) => {
    return !!selectedSeats.find(
      (item: SeatData) => item.seat === seatNumber.seat
    );
  };

  console.log("selectedSeats",selectedSeats)

  const parseCoachDetails = (details: string) => {
    const rows = details.split(",");
    const seats = rows.map((row) => row.split("-"));
    return seats;
  };

  const parseAvailableSeats = (available: string, gst: string) => {
    const seats = available.split(",");
    const gstValues = gst.split(",");
    const availableMap = new Map();
    const gstMap = new Map();

    seats.forEach((seat) => {
      const [id, price] = seat.split("|");
      if (id && price) {
        availableMap.set(id, parseFloat(price));
      }
    });

    gstValues.forEach((seat) => {
      const [id, value] = seat.split("|");
      if (id && value) {
        gstMap.set(id, parseFloat(value));
      }
    });

    return { availableMap, gstMap };
  };

  const seats = parseCoachDetails(layout.coach_details);
  const { availableMap: availableSeats, gstMap: gstValues } =
    parseAvailableSeats(layout.available, layout.available_gst);

    const getSeatStatus = (seatId: string) => { // Added layout and selectedSeats parameters
      const ladiesBookedSeats = layout.ladies_booked_seats?.split(',').map(seat => seat.trim()) || [];
      const gentsBookedSeats = layout.gents_booked_seats?.split(',').map(seat => seat.trim()) || [];
      const ladies_seatsAvailavleSeats = layout.ladies_seats?.split(',').map(seat => seat.trim()) || [];
    
   
      if (selectedSeats.find((item: SeatData) => item.seat === seatId)) {
        return "selected";
      }

      if (ladiesBookedSeats.includes(seatId)) return "bookedByFemale";
      if (gentsBookedSeats.includes(seatId)) return "bookedByMale";
      if(ladies_seatsAvailavleSeats.includes(seatId)) return "availableForFemale"
      if (!availableSeats.has(seatId)) return "booked"; // Assumes availableSeats is defined in the scope
      return "available";
    };

  const handleSeatClick = (seatNumber: SeatData) => {
    if (isSeatSelected(seatNumber)) {
      setSelectSeat(
        selectedSeats.filter((seat) => seat.seat !== seatNumber.seat)
      );
    } else {
      setSelectSeat([...selectedSeats, seatNumber]);
    }
  };

  const getSideSeats = (seats: string[][], prefix: string) => {
    return seats
      .map((row) =>
        row.find((seat) => {
          const [seatId] = seat.split("|");
          return seatId.startsWith(prefix);
        })
      )
      .filter(Boolean)
      .map((seat) => seat && seat.split("|")[0]);
  };

  const getRegularSeats = (row: string[], isUpper: boolean) => {
    return row.filter((seat) => {
      const [seatId, seatType] = seat.split("|");
      
      // Common condition: always exclude SU seats
      if (seatId.startsWith("SU")) {
        return false;
      }
      
      if (isUpper) {
        return (
          seatId.includes("U") ||
          seatId.startsWith("WU") ||
          (seatType && seatType.includes("U") && seatId !== "") ||
          seatType === ".GY"
        );
      } else {
        return (
          (!seatId.startsWith("SL") &&
            !seatId.startsWith("U") &&
            !seatId.startsWith("WU") &&
            (seatType && !seatType.includes("U")) &&
            seatId !== "") ||
          seatType === ".GY"
        );
      }
    });
  };

  // const getRegularSeats = (row: string[], isUpper: boolean) => {
  
  //   return row.filter((seat) => {
  //     const [seatId, seatType] = seat.split("|");
     
  //     if (isUpper) {
  //       return (
  //          seatId.includes("U") &&  !seatId.startsWith("SU") ||
  //       seatId.startsWith("WU") ||
  //       (seatType && seatType.includes("U") && seatId !== "") ||  seatType === ".GY" 
  //       );
  //     } else {
  //       return (
  //         (!seatId.startsWith("SL") &&
  //           !seatId.startsWith("SU") &&
  //           !seatId.startsWith("U") &&
  //           !seatId.startsWith("WU") &&
  //           (seatType && !seatType.includes("U")) &&
  //           seatId !== "") ||
  //         seatType === ".GY" 
  //       ); // Include the gangway
  //     }
  //   });
  // };

  
  const renderSeat = (seatId: string|undefined, splitType: string | undefined | null) => {
    if (!seatId || seatId === "") return <div className="w-12 h-12" />;
    if (seatId === "" || splitType === ".GY")
      return <div className="w-12 h-12" />;
    return (
      <Seat
        key={seatId}
        id={seatId}
        status={getSeatStatus(seatId)}
        price={availableSeats.get(seatId)}
        gst={gstValues.get(seatId)}
        onClick={handleSeatClick}
      />
    );
  };

  const lowerSideSeats = getSideSeats(seats, "SL");
  const upperSideSeats = getSideSeats(seats, "SU");

  console.log("upperSideSeats",upperSideSeats)
  console.log("lowerSideSeats",lowerSideSeats)

  const renderDeck = (isUpper: boolean) => (
    <Card className=" w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">{isUpper ? "Upper Deck" : "Lower Deck"} {!isUpper&& (<Image alt="bus-Wheel" src={"seats/steering-wheel.svg"} width={30} height={40} />)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {/* Side Seats */}
          <div className="flex flex-col gap-4">
            {(isUpper ? upperSideSeats : lowerSideSeats).map((seatId) =>
              renderSeat(seatId, null)
            )}
          </div>

          {/* Regular Seats */}
          <div className="flex-1">
            <div className="grid gap-1">
              {/* {seats.map((row, rowIndex) => {
                return hasOnlyGangway(row) ? null : (
                  () => {
                    const regularSeats = getRegularSeats(row, isUpper)
                    if (regularSeats.length === 0) return null
                    return (
                      <div key={rowIndex} className="flex gap-4 justify-end">
                        {regularSeats.map((seat) => {
 const [seatId,splitType] = seat.split("|")
                            return (
                             renderSeat(seatId,splitType)
                            )
                        })}
                      </div>
                    )
                  }
                )()
              })} */}
              {/* {seats.map((row, rowIndex) => {
                if (row.length === 1 && row[0] === "|.GY") return null;
                const regularSeats = getRegularSeats(row, isUpper);
                if (
                  regularSeats.filter((item) => item.startsWith("|.G")).length >
                  3
                )
                  return null;
                if (regularSeats.length === 1 && regularSeats[0] === "|.GY")
                  return null;
                if (regularSeats.every((item) => item === regularSeats[0])) {
                  return null;
                }
                if (regularSeats.length === 0) return null;
             
                return (
                  <div key={row[rowIndex+1]} className="flex gap-2 justify-end yyy">
                    {regularSeats.map((seat) => {
                      const [seatId, splitType] = seat.split("|");

                      return renderSeat(seatId, splitType);
                    })}
                  </div>
                );
              })} */}

{seats.map((row, rowIndex) => {
  if (row.length === 1 && row[0] === "|.GY") return null;
  const regularSeats = getRegularSeats(row, isUpper);
  if (
    regularSeats.filter((item) => item.startsWith("|.G")).length > 3
  )
    return null;
  if (regularSeats.length === 1 && regularSeats[0] === "|.GY")
    return null;
  if (regularSeats.every((item) => item === regularSeats[0])) {
    return null;
  }
  if (regularSeats.length === 0) return null;

  return (
    <div key={`row-${rowIndex}`} className="flex gap-2 justify-end yyy">
      {regularSeats.map((seat, seatIndex) => {
        const [seatId, splitType] = seat.split("|");

        return (
          <React.Fragment key={`seat-${rowIndex}-${seatIndex}`}>
            {renderSeat(seatId, splitType)}
          </React.Fragment>
        );
      })}
    </div>
  );
})}

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {renderDeck(false)} {/* Lower Deck */}
        {renderDeck(true)} {/* Upper Deck */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Seat Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Seat id="" status="available" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Seat id="" status="booked" />
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <Seat id="" status="selected" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <Seat id="" status="bookedByFemale" />
                <span>Ladies Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <Seat id="" status="availableForFemale" />
                <span>Ladies Available</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Seat id="" status="bookedByMale" />
                <span>Gents Booked</span>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
