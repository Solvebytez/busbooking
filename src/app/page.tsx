import TicketBookingForm from "@/components/Form/TicketBookingForm";
import PopularRoutes from "@/components/Home/PopularRoutes";
import TourPackages from "@/components/Home/tourPackages";

import SliderBanner from "@/components/Layout/Slider";


export default function Home() {
  return (
    <div className="">
     <div className="relative">
        <SliderBanner/>
       <div className="absolute bottom-[3%] left-[12.4rem]">
       <TicketBookingForm/>
       </div>
     </div>
      <TourPackages/>
      <PopularRoutes/>
      
    </div>
  );
}
