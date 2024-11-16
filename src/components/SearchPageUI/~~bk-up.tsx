"use client";
import React, { useState } from "react";
import TripFilterHeader from "./TripFilterHeader";
import SearchForm from "./SearchForm";
import SidebarFilter from "./SidebarFilter";
import { ChevronDown, ChevronUp, ScreenShare } from "lucide-react";
import AdditionalBusInfo from "./SearchAdditionalComp/AdditionalBusInfo";
import { cn } from "@/lib/utils";

export const options = [
  "Boarding Points",
  "Cancellation Policy",
  "Dropping Points",
  "Via Cities",
  "Amenities",
  "Bus Pictures",   
  "Select Berth"
];
const SearchResultConatiner = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);



  const handleClick = (item: string) => {
    setOpenItem((prev) => (prev === item ? null : item));
  };

  return (
    <div>
      <SearchForm />
      <TripFilterHeader />
      <div className="px-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
        <div className="w-full md:px-[1rem] xl:px-[4rem]">
          <div className="flex gap-4">
            <div className="flex flex-col w-[20%]">
              <SidebarFilter />
            </div>
            <div className="col-span-9  w-[80%]">
              <div className="shadow-md p-3 bg-white rounded-md mb-8">
                {/* {First ROW} */}
                <div className="flex justify-start">
                  <div className="w-[34.5%]">
                    <h2 className="flex gap-2 text-primary/90 font-bold items-center text-xl">
                      2001AGBBNG <ScreenShare size={20} />
                    </h2>
                  </div>
                  <div>
                    <h2 className="text-primary/90 font-bold items-center text-xl">
                      NON AC SLEEPER
                    </h2>
                  </div>
                  <div className="ms-auto">
                    <h2 className="font-bold items-center text-xl">₹77</h2>
                  </div>
                </div>
                {/* {2nd ROW} */}
                <div className="flex justify-between mt-4">
                  <div className="w-[20%]">
                    <h2 className="flex gap-2 font-bold items-center">
                      Starts at
                    </h2>
                  </div>
                  <div className="w-[15%]">
                    <h2 className="flex gap-2  font-bold items-center">
                      Duration
                    </h2>
                  </div>
                  <div className="w-[28%]">
                    <h2 className="flex gap-2 font-bold items-center">
                      Reaches on
                    </h2>
                  </div>
                  <div className="w-[23%]">
                    <h2 className="font-bold items-center ">Via</h2>
                  </div>
                  <div className="w-[15%] text-right">
                    <h2 className="font-bold items-center">Available</h2>
                  </div>
                </div>
                {/* {3rd ROW} */}
                <div className="flex justify-between mt-4">
                  <div className="w-[20%]">
                    <h2 className="flex gap-2 font-bold items-center text-xl">
                      20:01, Agumbe
                    </h2>
                  </div>
                  <div className="w-[15%]">
                    <h2 className="flex gap-1  font-bold items-center">
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-green-500"></div>
                      <span className="h-[1px] w-[30px] bg-red block border border-green-500"></span>
                      0:59HRS
                      <span className="h-[1px] w-[30px] bg-red block border border-red-500"></span>
                      <span className="h-[10px] w-[10px] bg-red-500 block border border-red-500"></span>
                    </h2>
                  </div>
                  <div className="w-[28%]">
                    <h2 className="flex gap-2 font-bold items-center ">
                      22 Nov,{" "}
                      <span className="text-xl">21:00, Tirthahalli</span>
                    </h2>
                  </div>
                  <div className="w-[23%]">
                    <h2 className="font-bold items-center ">
                      TIRTHAHALLI,SHIVAMOGGA
                    </h2>
                  </div>
                  <div className="w-[15%] text-right text-lg">
                    <h2 className="font-bold items-center">3 Seats</h2>
                  </div>
                </div>
                {/* {3rd ROW END} */}
                {/* {4th ROW} */}
                <div className="flex justify-between mt-4">
                  {options.map((item) => (
                    <div key={item}>
                      {item!=='Select Berth'&& ( <button
                        onClick={() => handleClick(item)}
                        className={cn('w-full text-left p-2 mb-2 flex gap-2 items-center justify-center text-secondary', openItem === item&&"bg-secondary/10")}
                      >
                        {item} {openItem === item ?<ChevronUp size={17} />:<ChevronDown size={17} />}
                      </button>)}
                     
                      {item==='Select Berth' && <button
                        onClick={() => handleClick('select')}
                        className="w-full text-left p-2 mb-2 flex gap-2 items-center justify-center text-secondary"
                      >
                        Select Berth
                      </button>}                    
                    </div>
                  ))}                 
                 
                </div>
                {/* {4th ROW END} */}
                {openItem && <div className="bg-secondary/10 p-4">
                <AdditionalBusInfo openItem={openItem}/>
                </div>}
                
              </div>

              <div className="shadow-md p-3 bg-white rounded-md mb-8">
                {/* {First ROW} */}
                <div className="flex justify-start">
                  <div className="w-[34.5%]">
                    <h2 className="flex gap-2 text-primary/90 font-bold items-center text-xl">
                      2001AGBBNG <ScreenShare size={20} />
                    </h2>
                  </div>
                  <div>
                    <h2 className="text-primary/90 font-bold items-center text-xl">
                      NON AC SLEEPER
                    </h2>
                  </div>
                  <div className="ms-auto">
                    <h2 className="font-bold items-center text-xl">₹77</h2>
                  </div>
                </div>
                {/* {2nd ROW} */}
                <div className="flex justify-between mt-4">
                  <div className="w-[20%]">
                    <h2 className="flex gap-2 font-bold items-center">
                      Starts at
                    </h2>
                  </div>
                  <div className="w-[15%]">
                    <h2 className="flex gap-2  font-bold items-center">
                      Duration
                    </h2>
                  </div>
                  <div className="w-[28%]">
                    <h2 className="flex gap-2 font-bold items-center">
                      Reaches on
                    </h2>
                  </div>
                  <div className="w-[23%]">
                    <h2 className="font-bold items-center ">Via</h2>
                  </div>
                  <div className="w-[15%] text-right">
                    <h2 className="font-bold items-center">Available</h2>
                  </div>
                </div>
                {/* {3rd ROW} */}
                <div className="flex justify-between mt-4">
                  <div className="w-[20%]">
                    <h2 className="flex gap-2 font-bold items-center text-xl">
                      20:01, Agumbe
                    </h2>
                  </div>
                  <div className="w-[15%]">
                    <h2 className="flex gap-1  font-bold items-center">
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-green-500"></div>
                      <span className="h-[1px] w-[30px] bg-red block border border-green-500"></span>
                      0:59HRS
                      <span className="h-[1px] w-[30px] bg-red block border border-red-500"></span>
                      <span className="h-[10px] w-[10px] bg-red-500 block border border-red-500"></span>
                    </h2>
                  </div>
                  <div className="w-[28%]">
                    <h2 className="flex gap-2 font-bold items-center ">
                      22 Nov,{" "}
                      <span className="text-xl">21:00, Tirthahalli</span>
                    </h2>
                  </div>
                  <div className="w-[23%]">
                    <h2 className="font-bold items-center ">
                      TIRTHAHALLI,SHIVAMOGGA
                    </h2>
                  </div>
                  <div className="w-[15%] text-right text-lg">
                    <h2 className="font-bold items-center">3 Seats</h2>
                  </div>
                </div>
                {/* {3rd ROW END} */}
                {/* {4th ROW} */}
                <div className="flex justify-between mt-4">
                  {options.map((item) => (
                    <div key={item}>
                      {item!=='Select Berth'&& ( <button
                        onClick={() => handleClick(item)}
                        className={cn('w-full text-left p-2 mb-2 flex gap-2 items-center justify-center text-secondary', openItem === item&&"bg-secondary/10")}
                      >
                        {item} {openItem === item ?<ChevronUp size={17} />:<ChevronDown size={17} />}
                      </button>)}
                     
                      {item==='Select Berth' && <button
                        onClick={() => handleClick('select')}
                        className="w-full text-left p-2 mb-2 flex gap-2 items-center justify-center text-secondary"
                      >
                        Select Berth
                      </button>}                    
                    </div>
                  ))}                 
                 
                </div>
                {/* {4th ROW END} */}
                {openItem && <div className="bg-secondary/10 p-4">
                <AdditionalBusInfo openItem={openItem}/>
                </div>}
                
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultConatiner;
