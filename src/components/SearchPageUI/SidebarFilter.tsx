import { cn } from '@/lib/utils';
import { AirVent, Armchair, Bed, ChevronDown, ChevronUp, CloudMoon, IndianRupee, Moon, Sun, Sunrise } from 'lucide-react';
import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

type FilterOption = 'AC' | 'Non AC' | 'Seater' | 'Sleeper' | 'Before-10AM' | '10AM - 5PM' | '5PM-11PM' | 'After-11PM';

const FilterComponent: React.FC = () => {
  const [selectedBusTypes, setSelectedBusTypes] = useState<FilterOption[]>([]);
  const [selectedDepartureTimes, setSelectedDepartureTimes] = useState<FilterOption[]>([]);
  const [showServiceClass, setShowServiceClass] = useState(false);
  const [showBoardingPoints, setShowBoardingPoints] = useState(false);
  const [showDropingPoints, setShowDropingPoints] = useState(false);
  const [pricevalue] = useState([30, 60]);

  const busTypes: FilterOption[] = ['AC', 'Non AC', 'Seater', 'Sleeper'];
  const departureTimes: FilterOption[] = ['Before-10AM', '10AM - 5PM', '5PM-11PM', 'After-11PM'];

  const toggleSelection = (
    item: FilterOption,
    setSelected: React.Dispatch<React.SetStateAction<FilterOption[]>>,
    selected: FilterOption[]
  ) => {
    console.log('Selected:', selected, 'Item:', item,selected,'setSelected',setSelected);
    setSelected(
      selected.includes(item)
        ? selected.filter((i) => i !== item)
        : [...selected, item]
    );  
  };

  const clearAll = (setSelected: React.Dispatch<React.SetStateAction<FilterOption[]>>) => {
    setSelected([]);
  };

  return (
    <div className="p-2 w-full bg-white border rounded-lg shadow-md">
      {/* Filter By Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="font-semibold text-secondary">Filter By</h2>
        <button
          onClick={() => {
            clearAll(setSelectedBusTypes);
            clearAll(setSelectedDepartureTimes);
          }}
          className="text-blue-600 hover:underline font-bold"
        >
          Clear All
        </button>
      </div>

      {/* Bus Type Section */}
      <div className="mb-6 p-3 bg-secondary/15 rounded-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-secondary">Bus Type</h3>
          <button
            onClick={() => clearAll(setSelectedBusTypes)}
            className="text-blue-600 hover:underline font-bold"
          >
            Clear All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {busTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleSelection(type, setSelectedBusTypes, selectedBusTypes)}
              className={`p-2 flex flex-col items-center justify-center border rounded ${
                selectedBusTypes.includes(type) ? 'bg-secondary text-white' : 'bg-white'
              }`}
            >
              {/* Conditional rendering for icons */}
          {type === 'AC' &&  <AirVent  size={23} className={cn('',selectedBusTypes.includes(type)?'text-white':'text-secondary')} />}
          {type === 'Non AC' && <AirVent  size={23} className={cn('',selectedBusTypes.includes(type)?'text-white':'text-secondary')} />}
          {type === 'Seater' && <Armchair  size={23} className={cn('',selectedBusTypes.includes(type)?'text-white':'text-secondary')} />}
          {type === 'Sleeper' && <Bed  size={23} className={cn('',selectedBusTypes.includes(type)?'text-white':'text-secondary')} />}
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Departure Time Section */}
      <div className='mb-6 p-3 bg-secondary/15 rounded-sm'>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-secondary">Departure Time</h3>
          <button
            onClick={() => clearAll(setSelectedDepartureTimes)}
            className="text-blue-600 hover:underline font-bold"
          >
            Clear All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {departureTimes.map((time) => (
            <button
              key={time}
              onClick={() => toggleSelection(time, setSelectedDepartureTimes, selectedDepartureTimes)}
              className={`p-2 flex flex-col items-center justify-center border rounded ${
                selectedDepartureTimes.includes(time) ? 'bg-secondary text-white' : 'bg-white'
              }`}
            >
                 {time === 'Before-10AM' &&  <Sunrise size={23} className={cn('',selectedBusTypes.includes(time)?'text-white':'text-secondary')} />}
          {time === '10AM - 5PM' && <Sun size={23} className={cn('',selectedBusTypes.includes(time)?'text-white':'text-secondary')} />}
          {time === '5PM-11PM' && <CloudMoon size={23} className={cn('',selectedBusTypes.includes(time)?'text-white':'text-secondary')} />}
          {time === 'After-11PM' && <Moon size={23} className={cn('',selectedBusTypes.includes(time)?'text-white':'text-secondary')} />}
              {time}
            </button>
          ))}
        </div>
      </div>
 <div className="w-full rounded-md ">
      {/* Service Class Dropdown */}
      <div className="mb-4 bg-secondary/15 px-2 py-2 rounded-sm">
        <button
          className="w-full text-left font-semibold text-secondary flex justify-between items-center"
          onClick={() => setShowServiceClass(!showServiceClass)}
        >
          Service Class
          <span className="float-right">{showServiceClass ? <ChevronUp size={20} /> :<ChevronDown size={20} />}</span>
        </button>
        {showServiceClass && (
          <div className="mt-2">
            {/* Content for Service Class can go here */}
            <div className="text-blue-500 cursor-pointer mb-2">Clear All</div>
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-gray-700">NON AC SLEEPER</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Boarding Points Section */}
      <div className='mb-4 bg-secondary/15 px-2 py-2 rounded-sm'>
        <button
          className="w-full text-left font-semibold text-secondary flex justify-between items-center"
          onClick={() => setShowBoardingPoints(!showBoardingPoints)}
        >
          Boarding Points
          <span className="float-right">{showBoardingPoints ? <ChevronUp size={20} /> :<ChevronDown size={20} />}</span>
        </button>
        {showBoardingPoints && (
          <div className="mt-2">
            <div className="text-blue-500 cursor-pointer mb-2">Clear All</div>
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-gray-700">ACHAMPET B.S</span>
              </label>
            </div>
          </div>
        )}
      </div>
      {/* Dropping Points Section */}
      <div className='mb-4 bg-secondary/15 px-2 py-2 rounded-sm'>
        <button
          className="w-full text-left font-semibold text-secondary flex justify-between items-center"
          onClick={() => setShowDropingPoints(!showDropingPoints)}
        >
          Dropping Points
          <span className="float-right">{showDropingPoints ? <ChevronUp size={20} /> :<ChevronDown size={20} />}</span>
        </button>
        {showDropingPoints && (
          <div className="mt-2">
            <div className="text-blue-500 cursor-pointer mb-2">Clear All</div>
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-gray-700">ACHAMPET B.S</span>
              </label>
            </div>
          </div>
        )}
      </div>
      <div className='mb-4 bg-secondary/15 px-2 py-2 rounded-sm'>
      <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-secondary">Price Range</h3>
         
        </div>
      <div className='flex w-full flex-col'>
      <div className='flex justify-between text-secondary font-semibold mt-2 w-full my-4'>
        <div className='border border-secondary flex items-center justify-center w-[30%] h-[45px] rounded-sm'>
        <IndianRupee size={14} />
        <input value={pricevalue[0]} onChange={()=>{}} type='text' className='text-center rounded-sm w-[100%] h-full focus:border-none border-none focus:outline-none !focus-visible:ring-0 px-2'/>
        </div>
        <div className='border border-secondary flex items-center justify-center w-[30%] rounded-sm'>
        <IndianRupee size={14} />
        <input value={pricevalue[1]} onChange={()=>{}} type='text' className='text-center rounded-sm w-[100%] h-full focus:border-none border-none focus:outline-none !focus-visible:ring-0 px-2'/>
        </div>
      </div>
      <RangeSlider
        className="single-thumb"
        defaultValue={[0, 50]}
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
      />
      <div className='flex justify-between text-secondary font-semibold mt-2'>
        <span>{pricevalue[0]}</span>
        <span>{pricevalue[1]}</span>
      </div>
      </div>
      </div>
     
    </div>
    </div>
  );
};

export default FilterComponent;
