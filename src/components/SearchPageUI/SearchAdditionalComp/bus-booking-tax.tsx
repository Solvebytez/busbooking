'use client'

import { useState } from "react"
import { ShipWheelIcon as SteeringWheel } from 'lucide-react'
import { cn, SeatData } from "@/lib/utils"

export default function BusSeats({availableSeat,scheduleId}:{availableSeat:SeatData[];scheduleId:string}) {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  
  // Define the seat layout
  const seatLayout = {
    row1: [1, 6, 7],
    row2: [2, 5, 8],
    row3: [3, 4, 9, 10, 13, 14, 19],
    
    available: [7, 8, 15, 16, 17, 18],
    booked: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 19]
  }

  const isSeatAvailable = (seatNumber: number) => seatLayout.available.includes(seatNumber)
  const isSeatBooked = (seatNumber: number) => seatLayout.booked.includes(seatNumber)
  const isSeatSelected = (seatNumber: number) => selectedSeats.includes(seatNumber)

  const toggleSeatSelection = (seatNumber: number) => {
    if (isSeatSelected(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber))
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  console.log("boarding_stopies-availableSeat",availableSeat,"scheduleId",scheduleId)

  const renderSeat = (seat: SeatData) =>{
    if(!seat.seat) return (
      
    )
    (
      <button
        key={seat.seat}
        onClick={() => isSeatAvailable(seat.seat) && toggleSeatSelection(seatNumber)}
        disabled={isSeatBooked(seatNumber)}
        aria-label={`Seat ${seatNumber} ${isSeatBooked(seatNumber) ? 'booked' : isSeatAvailable(seatNumber) ? 'available' : 'selected'}`}
        className={cn(
          "h-12 rounded-sm transition-colors",
          isSeatBooked(seatNumber) && "bg-gray-200 cursor-not-allowed",
          isSeatAvailable(seatNumber) && !isSeatSelected(seatNumber) && "border-2 border-green-500 hover:bg-green-50",
          isSeatSelected(seatNumber) && "bg-blue-500 text-white border-blue-500",
          "flex items-center justify-center font-medium"
        )}
      >
        {seatNumber}
      </button>
    )
  }

  return (
    <div className="w-full mx-auto p-0">
      <div className="relative border rounded-lg p-8 bg-background">
        {/* Driver section */}
        <div className="absolute left-4 top-4">
          <div className="flex gap-1">
          <SteeringWheel className="w-6 h-6 text-muted-foreground" />
          <div className="text-xs text-muted-foreground mt-1">Lower Berth (6)</div>
          </div>
        </div>

        {/* Seat grid */}
        <div className="grid gap-2 mt-12">
          {/* First two rows */}
          <div className="grid grid-cols-2 gap-24">
            {/* Left side seats */}
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-2 h-12">
                {seatLayout.row1.map(renderSeat)}
              </div>
              <div className="grid grid-cols-3 gap-2 h-12">
                {seatLayout.row2.map(renderSeat)}
              </div>
            </div>
            
            {/* Right side seats */}
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2 h-12">
                {[11, 16].map(renderSeat)}
              </div>
              <div className="grid grid-cols-2 gap-2 h-12">
                {[12, 15].map(renderSeat)}
              </div>
              <div className="grid grid-cols-2 gap-2 h-12">
                {[17, 18].map(renderSeat)}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-7 gap-2 h-12">
            {seatLayout.row3.map(renderSeat)}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-sm" />
            <span>Booked</span>
          </div>
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
        </div>

        {/* Selected seats summary */}
        <div className="mt-4 text-sm">
          <strong>Selected Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 0}
        </div>
      </div>
    </div>
  )
}