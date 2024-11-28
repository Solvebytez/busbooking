/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

import { useEffect, useState } from "react";
import { calculateGastTotals } from "@/lib/utils"

import Schedule from "./Schedule"
import { useGewtPayment } from "@/ClientApi/payment"
import { useRouter } from "next/navigation"

interface PassengerDetails {
  name: string;
  gender: string;
  age: string;
  concession: string;
  country: string;
  idCard: string;
  idCardNo: string;
  scheduleId: string;
  seat: string;
}

export interface GetSeatDetails {
  seat: string;
  price: number;
  gst: number;
  gstValue: number;
  total: number;
  gstAvailable: boolean;
}

const BookingDetailsClient = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null);
  const [userData,setUserData] = useState<PassengerDetails[]>([])
  const [seatDetails, setSeatDetails] = useState<GetSeatDetails[]>([]);
  const { mutateAsync: initiatePayment } = useGewtPayment();
  const [scehdualeID, setscehdualeID] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData = localStorage.getItem('passengerDetails');
      if (storedData) {
        // Parse the JSON string into an object and set it to the state
        setFormData(JSON.parse(storedData));
      }
    }

  }, []);


  useEffect(() => {
    // Set the user data after formData is updated
    if (formData) {
      const filteredData = formData.filter((item: any) => {
        
        const { data } = item;
        console.log("seatdata",data.seat)
        return data.name && data.gender && data.age && data.concession && data.idCard && data.idCardNo && data.seat;
      }).map((item: any) => ({
        ...item.data,  // Destructure and include the data object
       // scheduleId: item.scheduleId,  // Include the scheduleId
        // seat: item.seat,  // Include the seat from getSeats
      }));
      setUserData(filteredData);

      setscehdualeID(formData[0].scheduleId)
    }
    
    if(formData){
      const seatDetails = Object.values(formData[0].getSeats);
    
      //setSeatDetails([...seatDetails]);
      setSeatDetails([...seatDetails]);
    }
  }, [formData]); // Only run this effect when formData changes


  const result = calculateGastTotals(seatDetails);

  // const { data, isLoading, error } = useGewtPayment(result.allTotal.toString());

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const data = await initiatePayment(result.allTotal.toString());
      if (data.error) {
        alert(data.error);
      } else {
        console.log("Payment",data.data.redirect_url)
        // Assuming the API returns a redirect_url in the response
        router.replace(data.data.redirect_url);
        alert("Payment Initiated Successfully");
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {formData ? (
        <div>
          {/* <h1>Passenger Data</h1>
          <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </div>
      ) : (
        <p>No data found in localStorage</p>
      )}
      <div className="flex gap-4">
          <div className="col-span-9  w-[80%]">
          <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Review Booking</CardTitle>
        <span className="text-sm text-muted-foreground">Booking as: Guest</span>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email ID</Label>
            <Input 
              id="email" 
              defaultValue="sahinh013@gmail.com" 
              readOnly 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Number</Label>
            <Input 
              id="contact" 
              defaultValue="08670695089" 
              readOnly 
              required
            />
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Onward Trip Booking Review</h3>
        <Schedule scehdualeID={scehdualeID} seatDetails={seatDetails}/>
        </div>

        {/* Passenger Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Onward Trip Passenger</h3>
          {userData && (
            userData.map((item)=>{
                return (
                  <div className="" key={item.idCardNo}>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            <div className="space-y-2">
              <Label>Seat</Label>
              <Input defaultValue={item.seat} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Name</Label>
              <Input defaultValue={item.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select defaultValue={item.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Age</Label>
              {/* <Input defaultValue={item.age} value={item.age} /> */}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Concession</Label>
              <Select defaultValue={item.concession}>
                <SelectTrigger>
                  <SelectValue placeholder="Select concession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">GENERAL PUBLIC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>ID Card</Label>
              <Select defaultValue={item.idCard}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ID Card No</Label>
              <Input placeholder="Enter ID number" value={item.idCardNo} onChange={()=>{}} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Select defaultValue={item.country}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="myanmar">India</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          </div>
                )
            })
          )}
          
        </div>

        {/* Fare Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Onward Trip Fare Breakup</h3>
          <div className="space-y-2">
                {/* <div className="flex justify-between">
                  <span>Seat</span>
                  <span>{item.seat}</span>
                </div> */}
                <div className="flex justify-between">
                  <span>Original Total</span>
                  <span>₹{result.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹{result.gst}</span>
                </div>
                {/* <div className="text-xs text-muted-foreground">
                  GST Available: {item.gstAvailable ? "Yes" : "No"}
                </div> */}
               
              </div>
           <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total Fare</span>
                  <span>₹ {result.allTotal}</span>
                </div>
        </div>
      </CardContent>
    </Card>
          </div>
          <div className="flex flex-col w-[20%] mb-10">
          <div className="max-w-md mx-auto p-0">
      <Card className="mb-6">
        <CardContent className="pt-0">
          <h2 className="text-xl font-semibold mb-4 pt-5">Select Payment Gateway</h2>
          
          <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
            <div className="flex items-start gap-2">
             
              <div className="space-y-2 flex flex-col items-center">
             <div className="flex gap-3">
             <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <Image
                  src="/razorpay.png"
                  alt="Razorpay"
                  width={120}
                  height={30}
                  className="mb-2"
                />
             </div>
                <p className="text-sm text-gray-600 mb-2">
                  ಎಲ್ಲಾ ಪ್ರಮುಖ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್, ಕ್ರೆಡಿಟ್ / ಡೆಬಿಟ್ ಕಾರ್ಡ್ / ಇ-ವಾಲೆಟ್ ಎಸ್.ಬಿ.ಐ, ಐಸಿಐಸಿಐ, ಐಸಿಐಸಿಐ, ಎಚ್.ಡಿ.ಎಫ್.ಸಿ, ರುಪೇ ...
                </p>
                <p className="text-sm">
                  All Major Net Banking, Credit / Debit card / e-Wallet SBI, HDFC, ICICI, AXIS, RuPay ...
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 mt-6">
            <Checkbox id="terms" className="mt-1" />
            <label htmlFor="terms" className="text-sm">
              I agree to{" KSRTC's"}{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Terms and Conditions
              </Link>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <span className="text-lg">Amount to be Paid</span>
          <span className="text-lg font-semibold">₹{result.allTotal}</span>
        </div>
        
        <Button 
        onClick={handlePayment}
        disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
        >
          {isLoading&& "Loading...."}PROCEED TO PAY
        </Button>
      </div>
    </div>
          </div>
      </div>
     
    </div>
  );
}

export default BookingDetailsClient