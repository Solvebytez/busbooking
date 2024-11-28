'use client'

import { useGetAllCities } from "@/ClientApi/cities";
import { useGetScheduleById } from "@/ClientApi/scheduleList";
import { parseCityData } from "@/lib/utils";
import { GetSeatDetails } from "./BookingDetails";



const Schedule = ({scehdualeID,seatDetails}:{scehdualeID:number;seatDetails:GetSeatDetails[]}) => {

   
const {data:scheduleData,isError,isLoading} = useGetScheduleById(scehdualeID.toString())
const { data: allcities, isLoading:isCityLoading, isError:isCityError } = useGetAllCities();
 // Check loading state
 if (isLoading || isCityLoading) {
    return <div>Loading...</div>;
  }

  // Check error state
  if (isError|| isCityError) {
    return <div>Error fetching schedule. Please try again later.</div>;
  }

  const {data}=scheduleData;

  const boardingStages =
  allcities &&
  parseCityData(data.bus_layout.boarding_stages, allcities.data);
const dropoffStages =
allcities &&
  parseCityData(data.bus_layout.dropoff_stages, allcities.data);

  console.log("Start City",boardingStages[0].cityName,"End City",dropoffStages)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
    {/* <div className="flex justify-between">
      <span className="text-muted-foreground">OB Reference</span>
      <span>{data.}</span>
    </div> */}
    <div className="flex justify-between">
      <span className="text-muted-foreground">Trip Code</span>
      <span>{data.trip_id
      }</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Date of Journey</span>
      <span>{data.travel_date}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Class of Service</span>
      <span>{data.bus_type}</span>
    </div>
    <div className="flex justify-between">
        
      <span className="text-muted-foreground">Start Place</span>
      <span>{boardingStages[0].cityName}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">End Place</span>
      <span>{dropoffStages[0].cityName}</span>
    </div>
    {/* <div className="flex justify-between">
      <span className="text-muted-foreground">Boarding Point</span>
      <span>ADONI APSRTC BUS STAND</span>
    </div> */}
    {/* <div className="flex justify-between">
      <span className="text-muted-foreground">Alighting Point</span>
      <span>MYSORE ROAD SATELLITE BS 7760990530</span>
    </div> */}
    <div className="flex justify-between">
      <span className="text-muted-foreground">Total Seats</span>
      <span>{seatDetails.length}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Seat Number</span>
      <span> {seatDetails.length > 0
            ? seatDetails.map((item) => item.seat).join(", ")
            : 0}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Departure Time</span>
      <span>{data.dep_time}</span>
    </div>
    {/* <div className="flex justify-between">
      <span className="text-muted-foreground">Platform Number</span>
      <span>-</span>
    </div> */}
  </div>
  )
}

export default Schedule