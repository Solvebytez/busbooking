import { cn } from '@/lib/utils';
import { SeatStore } from '@/store/store_price';
import React from 'react';

const FareBreakdown = ({priceData,priceType}:{priceData:SeatStore;priceType:string}) => {
  const isReturnData = priceType==='returnPrice'
  return (
    <div className={cn('max-full mx-auto p-4 border border-gray-300 rounded-lg shadow-sm bg-green-100/10', {'bg-primary/5':isReturnData})}>
      <h2 className="text-lg font-semibold mb-4">Onward Trip Fare Breakdown</h2>
      
      <div className="flex justify-between items-center py-2 border-b">
        <span className="text-gray-700">Original Basic Fare</span>
        <span className="font-medium">₹{priceData.totalSeatPrice}</span>
      </div>
      
      {/* <div className="flex justify-between items-center py-2 border-b">
        <span className="text-gray-700">Concession Amount</span>
        <span className="font-medium text-red-500">-₹0</span>
      </div> */}
      
      <div className="flex justify-between items-center py-2 border-b">
        <span className="text-gray-700">GST</span>
        <span className="font-medium">₹{priceData.totalGst}</span>
      </div>
      
      {/* <p className="text-gray-500 text-sm mt-2">
        (RESERVATION FEE: 40 ARF: 4 GST: 100 USER FEE: 178)
      </p> */}
      
      <div className="flex justify-between items-center mt-4">
        {priceType==='oneWayData' && <span className="text-lg font-bold">Onward Fare</span>}
        {isReturnData && <span className="text-lg font-bold">Return Fare</span>}
        <span className="text-lg font-bold">₹{priceData.subTotal}</span>
      </div>
    </div>
  );
};

export default FareBreakdown;
