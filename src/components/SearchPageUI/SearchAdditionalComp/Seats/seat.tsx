import { TripType } from "@/components/Form/TicketBookingForm"
import { cn, SeatData } from "@/lib/utils"

import Image from "next/image"
import { useSearchParams } from "next/navigation"

interface SeatProps {
  id: string
  type?: string
  status: "available" | "booked" | "selected" | "bookedByFemale" | "bookedByMale" | 'availableForFemale'
  price?: number
  gst?: number
  onClick?: ({ seat, tripType, price, gst }: SeatData) => void
}

export function Seat({ id, type, status, price, gst, onClick }: SeatProps) {
  //const displayPrice = price && gst ? `${price + gst}` : price ? `${price}` : null;
  const searchParams = useSearchParams();
  const tripTypeUri = searchParams.get("tripType") ?? TripType.one_way;

  const getStatusImage = () => {
    switch (status) {
       case "availableForFemale":
        return "seats/ladiesseat.svg"
      case "available":
        return "seats/normalseat.svg"
      case "booked":
        return "seats/booked-seat.svg"
      case "selected":
        return "seats/greenseat.svg"
      case "bookedByFemale":
        return "seats/ladiesseatbooked.svg"
      case "bookedByMale":
        return "seats/booked-seat.svg"
      default:
        return ""
    }
  }

  console.log("status",id, type, status, price, gst)

  return (
    <button
      onClick={() => onClick?.({gst: gst??false,price: price??null,seat:id,tripType: tripTypeUri as TripType})}
      disabled={["booked", "bookedByFemale", "bookedByMale"].includes(status)}
      className={cn(
        "h-11 w-11 rounded-lg border border-gray-100 flex items-center justify-center text-sm font-medium transition-colors relative",
        status === "available" && "bg-white border-gray-200 hover:border-gray-400",
        status === "availableForFemale" && "border border-pink-300 hover:border-gray-400",
        status === "booked" && "bg-gray-200 border-gray-300 cursor-not-allowed",
        status === "selected" && "bg-green-100 border-green-500",
        status === "bookedByFemale" && "bg-pink-200 border-pink-300 cursor-not-allowed",
        status === "bookedByMale" && " cursor-not-allowed",
        (type === 'SS' || type === 'BS') && "h-16 w-16"
      )}
    >
      <Image
        src={getStatusImage()}
        alt={`Seat ${id} - ${status}`}
        layout="fill"
        objectFit="contain"
        className="p-1"
      />
      <div className="text-center h-11 w-11 relative">
      <p className="h-full absolute w-full flex items-center justify-center text-[10px]">{id}</p>
      
        
        {/* {displayPrice && <div className="text-xs text-gray-500">{displayPrice}</div>} */}
      </div>
    </button>
  )
}

