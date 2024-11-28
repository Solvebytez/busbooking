import TicketBookingForm from "@/components/Form/TicketBookingForm";
import PopularRoutes from "@/components/Home/PopularRoutes";
import TourPackages from "@/components/Home/tourPackages";

import SliderBanner from "@/components/Layout/Slider";
import { Suspense } from "react";


export default function Home() {
  return (
    <div className="">
     <div className="relative">
       <Suspense fallback={"Loading..."}>
       <SliderBanner/>
       </Suspense>
       <div className="absolute bottom-[3%] px-[0%] md:px-[0%] xl:px-[4%] 2xl:px-[7%] w-full">
       <TicketBookingForm/>
       </div>
     </div>
      <TourPackages/>
      <PopularRoutes/>
      
    </div>
  );
}
