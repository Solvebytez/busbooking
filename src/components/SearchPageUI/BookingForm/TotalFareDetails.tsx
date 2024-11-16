"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const TotalFareDetails = () => {
  // Fetch the total fare details from the API
  const [totalFareDetails, setTotalFareDetails] = useState<boolean>(false);
  return (
    <div className="w-full max-w-md  bg-white py-1 border-b">
    
      
      {totalFareDetails && (
        <div className="p-4 space-y-3 shadow-xl border rounded-lg">
              <div className="bg-secondary text-white p-2">
        <h2 className="text-lg font-semibold">Total Fare Details</h2>
      </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">ಮೂಲ ದರ / Original Basic Fare</span>
            <span className="font-medium">₹643</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700">ರಿಯಾಯಿತಿ ಮೊತ್ತ / Concession Amount</span>
            <span className="font-medium">-₹0</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700">ರಿಯಾಯಿತಿ / Discount</span>
            <span className="font-medium">-₹0</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700">ಇತರೆ ಶುಲ್ಕಗಳು / Levies</span>
            <span className="font-medium">₹107</span>
          </div>
          
          <div className="text-sm text-primary pt-2 bg-primary/10 p-2">
            ( RESERVATION FEE: 20 ARF: 2 USER FEE: 85 )
          </div>
        </div>
      )}
      
      <div className="border-0 py-2">
        <div className="flex justify-between items-center">
          <span className="font-bold">14</span>
          <div className="flex items-center gap-4">
            <span className="font-bold">Grand Total: ₹750</span>
            <button
              onClick={() => setTotalFareDetails(!totalFareDetails)}
              className="flex items-center text-blue-600 hover:text-blue-700 w-[115px]"
            >
              {totalFareDetails ? (
                <>
                  Hide Details
                  <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Show Details
                  <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalFareDetails;
