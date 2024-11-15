import { ArrowDownUp, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";

const TripFilterHeader = () => {
  return (
    <div className="p-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
      <div className="w-full md:px-[1rem] xl:px-[4rem]">
        <div className="space-y-4">
          {/* Trip Details */}
          <div className="flex justify-between space-x-2">
          <div className="flex space-x-2">
            <button className="bg-secondary text-white font-semibold px-4 py-2 rounded-full">
              Onward Trip: Achampet - Srisailam, 15 Nov
            </button>
            <button className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full">
              Return Trip: Srisailam - Achampet, 10 Dec
            </button>
          </div>
          <div className="flex space-x-2">
            <button type="button" className="bg-white shadow-md text-secondary px-4 py-2 rounded-full flex gap-4 items-center justify-center font-bold">
            <ChevronLeft size={15} /> Previous Day Trips
            </button>
            <button type="button" className="bg-white shadow-md text-secondary px-4 py-2 rounded-full flex gap-4 items-center justify-center font-bold">
            Next Day Trips <ChevronRight size={15} />
            </button>
          </div>
          </div>

          {/* Sort and Navigation */}
          <div className="bg-secondary/15 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center font-semibold">
            
              {/* Sort Options */}
              <button className="flex items-center space-x-1 text-gray-700 ">
                  <span className="material-icons"> <ArrowDownUp size={16} /></span>
                  <span>Sort By</span>
                </button>
                <button className="flex items-center">
                  <span>Departure Time</span>
                  <span className="material-icons"><ChevronsUpDown size={16} /></span>
                </button>
                <button className="flex items-center ">
                  <span>Journey Duration</span>
                  <span className="material-icons"><ChevronsUpDown size={16} /></span>
                </button>
                <button className="flex items-center ">
                  <span>Arrival Time</span>
                  <span className="material-icons"><ChevronsUpDown size={16} /></span>
                </button>
                <button className="flex items-center">
                  <span>Seat Fare</span>
                  <span className="material-icons"><ChevronsUpDown size={16} /></span>
                </button>

              {/* Navigation Buttons */}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripFilterHeader;
