import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface PaymentDetails {
  billing_phone: string;
  billing_email: string;
  schedule_id: number;
  gst_number: string;
  gst_company: string;
  gst_address: string;
  bus_dropoff_point: number;
  bus_dropoff_point_text: string;
  bus_boarding_point: number;
  bus_boarding_point_text: string;
  bus_origin_id: number;
  bus_origin_name: string;
  bus_destination_id: number;
  bus_destination_name: string;
  bus_dep_time: string;
  bus_duration: string;
  bus_arr_time: string;
  bus_bus_type: string;
  bus_can_cancel: boolean;
  bus_via: string;
  bus_booking_date: string;
  order_id: string;
  order_amount: string;
  order_currency: string;
  passenger_information: Array<{
    seat_no: string;
    seat_type: string;
    seat_price: number;
    seat_gst: number;
    name: string;
    age: number;
    gender: string;
    city: string;
    state: string;
  }>;
}

export const useGewtPayment = () => {
    return useMutation({
      mutationFn: async (total: string) => {
        try {
          const response = await axiosInstance.post(`bus/payment/request`, {
            billing_phone: "9123456789",
            billing_email: "example@example.com",
            schedule_id: 202411261261439,
            gst_number: "GST12345ABC",
            gst_company: "Example Pvt Ltd",
            gst_address: "123 Example Street, Example City, Example State",
            bus_dropoff_point: 275127,
            bus_dropoff_point_text: "kappalur Tollgate",
            bus_boarding_point: 12653,
            bus_boarding_point_text: "# 382-3 State Bank Colony Covai byepass Main Road |New Avr Roundana Salem",
            bus_origin_id: 1273,
            bus_origin_name: "Salem",
            bus_destination_id: 1273,
            bus_destination_name: "Madurai",
            bus_dep_time: "10:30 AM",
            bus_duration: "5h 30m",
            bus_arr_time: "4:00 PM",
            bus_bus_type: "AC Sleeper",
            bus_can_cancel: true,
            bus_via: "Karur, Dindigul, Madurai, Kanyakumari, Virudhunagar, Sattur, Kovilpatti, Thirunelveli, Salem",
            bus_booking_date: "2024-11-25",
            order_id: "ORD12345",
            order_amount: total,
            order_currency: "INR",
            passenger_information: [
              {
                seat_no: "A1",
                seat_type: "Window",
                seat_price: 500,
                seat_gst: 50,
                name: "John Doe",
                age: 30,
                gender: "Male",
                city: "City A",
                state: "State X"
              },
              {
                seat_no: "A2",
                seat_type: "Aisle",
                seat_price: 500,
                seat_gst: 50,
                name: "Jane Doe",
                age: 28,
                gender: "Female",
                city: "City B",
                state: "State Y"
              }
            ]
          });
          return response.data;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error initiating payment: ${error.message}`);
          }
          throw new Error('An unknown error occurred while initiating payment');
        }
      },
    });
  };