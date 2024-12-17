import TicketBookingForm from "@/components/Form/TicketBookingForm";
import PopularRoutes from "@/components/Home/PopularRoutes";
import TourPackages from "@/components/Home/tourPackages";

import SliderBanner from "@/components/Layout/Slider";
import { Suspense } from "react";
import RemoveStorageOnRouteChange from "./hooks/RemoveStorageOnRouteChange";
// import BusTicketPDFPage from "@/components/PDF/PdfDownload";


export default function Home() {
  return (
    <div className="">
     <div className="relative">
       <Suspense fallback={"Loading..."}>
       <RemoveStorageOnRouteChange />

       <SliderBanner/>
       </Suspense>
       <div className="absolute bottom-[3%] px-[0%] md:px-[0%] xl:px-[4%] 2xl:px-[7%] w-full">
       <TicketBookingForm/>
       </div>
     </div>
     {/* <BusTicketPDFPage/> */}
      <TourPackages/>
      <PopularRoutes/>
      
    </div>
  );
}
