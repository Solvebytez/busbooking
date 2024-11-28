/* eslint-disable @typescript-eslint/no-explicit-any */
import { TripType } from "@/components/Form/TicketBookingForm";
import { CityPropsType } from "@/components/Input/SelectInput";
import { clsx, type ClassValue } from "clsx"
import { format, parse } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatToISTDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}



export const parseCityData = (formatData: string, cities: CityPropsType[]) => {
  // Split the formatData into an array of cityId|time strings
  const pairs = formatData.split(',');
  // Transform each pair into an object with cityId and time
  const result = pairs.map((pair) => {
    const [cityIdStr, time] = pair.split('|');
    const cityId = parseInt(cityIdStr, 10);

   
    // Find the matching city name from the Cities array
    const city = cities.find((c) => c.id === cityId);

    return {
      cityId,
      time,
      cityName: city ? city.city_name : "Unknown", // Include cityName if available
    };
  });
 
  return result;
};

export const dept_formatDate = (dateString: string) => {
  // Parse the date string into a Date object (dd/MM/yyyy format)
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());

  // Format the date to 'dd MMM' format
  const formattedDate = format(parsedDate, "dd MMM",);

  return formattedDate;
};

export const getLowestPrice = (data: string) => {
  // Convert the price data into an array of objects
  const prices = data.split(",").map((item) => {
    const [type, price] = item.split(":");
    return { type, price: parseFloat(price) };
  });

  // Find the object with the lowest price
  const lowestPrice = prices.reduce((min, current) =>
    current.price < min.price ? current : min
  );

  return lowestPrice;
};

export function formatDateToIST(inputDateStr: string) {
  // Parse the input date string in DD/MM/YYYY HH:mm format
  const [datePart, timePart] = inputDateStr.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  // Create a Date object in local time
  const date = new Date(year, month - 1, day, hours, minutes);

  // Convert the date to IST
  const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

  // Format the date to "DD MMM"
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "Asia/Kolkata", // Ensure formatting in IST
  });

  return formatter.format(istDate);
}

export function extractTimeAndName(input:string) {
  const pattern = /\|(\d{2}:\d{2})\|([^|]+)/g;
  // eslint-disable-next-line prefer-const
  let resulta = [];
  let match;
  
  while ((match = pattern.exec(input)) !== null) {
    const time = match[1].trim();
    const name = match[2].trim();
    resulta.push({ time, name });
  }
  
  return resulta;
}


export function convertToArrayString(str:string) {
  return str.split(',').map(item => item.trim()).filter(item => item !== '');
}


export function convertStringToArrayOfObjects(str:string) {
  // Parse the string to get an array
  const arr = JSON.parse(str);

  // Map the array to an array of objects with city and label keys
  return arr.map((item: string) => ({
    amenity: item,          // The city is the original value
    label: item.replace(/\s+/g, '_') // Replace spaces with underscores for the label
  }));
}


export function convertBusBoardingStringToArray(str: string, busPickType: string) {
  // Split the string by '~' to separate each bus stop
  const stops = str.split('~');

  // Map the stops to objects with keys bus_time, bus_stop_location, and bus_location_id
  return stops.map(stop => {
    //const parts = stop.split('|'); // Split each stop by '|'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [id, time, dropOff, _, phoneNumber, additionalInfo] = stop.split('|');

    // Return an object with bus_time, bus_stop_location, and bus_location_id
    return {
      bus_time: time.trim(),
      bus_stop_location: dropOff?.trim(),
      bus_location_id: id?.trim(),
      location_type:busPickType,
      phone_number: phoneNumber.trim(),
      Additional_info: additionalInfo.trim()
    };
  });
}



export type SeatData = {
  seat: string | null;
  price: number |null;
  gst: number | false;  
  tripType: TripType
};

export function findAvailableSeatArray(available_seat: string, available_gst: string, tripType:TripType ) {
  // Split the input strings into arrays of entries
  const seatEntries = available_seat.split(',');
  const gstEntries = available_gst.split(',');

  // Create a mapping for GST values
  const gstMap: Record<string, number> = gstEntries.reduce((acc: Record<string, number>, entry: string) => {
    const [seat, gst] = entry.split('|');
    acc[seat] = parseFloat(gst); // Convert GST to a number
    return acc;
  }, {});

  // Create the array of objects
  const result: SeatData[] = seatEntries.map(entry => {
    const [seat, price] = entry.split('|');
    return {
      seat,
      price: parseFloat(price), // Convert price to a number
      gst: gstMap[seat] !== undefined ? gstMap[seat] : false, // Get GST or assign false,
      tripType:tripType
    };
  });

  return result;
}

export type SeatArray = {
  seat: string;
  price: number;
  gst: number | false | null;
};

export const calculateGST=(seatArray:SeatData[])=>{
  const result = seatArray.map(item => {
    if (item.gst) {
      const gstValue = (item.price !== null && item.gst !== null) ? (item.price * item.gst) / 100 : 0; // Calculate GST
      const total = item.price !== null ? item.price + gstValue : 0; // Calculate Total
      return {
        ...item, // Keep the original data
        gstValue, // Add calculated GST value
        total, // Add total (price + GST)
        gstAvailable: true // Indicate GST is available
      };
    } else {
      return {
        ...item,
        gstValue: 0,
        total: item.price !== null ? item.price : 0, // Total is the price itself if GST isn't available
        gstAvailable: false
      };
    }
  });
  return result;
}


export type SeatDataPrice = {
  gst: number;
  total: number;
  [key: string]: any; // For additional properties in the objects
};

export const calculateGastTotals = (data: SeatDataPrice[]) => {
  return data.reduce(
    (acc, item) => {
      acc.gst += item.gst;     // Accumulate the GST value
      acc.total += item.total; // Accumulate the total price
      acc.allTotal = acc.gst + acc.total; // Calculate the combined "All total" value
      return acc;
    },
    { gst: 0, total: 0, allTotal: 0 } // Initial accumulator values
  );
};

export type BookedSeat = {
  row: string;
  seat1: number;
  seat2: number;
  isW: boolean;
};

export const parseBookedSeats = (inputString: string | null): BookedSeat[] => {
  if (!inputString) {
    return []; // Return an empty array if inputString is empty or null
  }

  const seatArray = inputString.split(',');
  const result: BookedSeat[] = [];

  for (let i = 0; i < seatArray.length; i += 4) {
    const row = seatArray[i];
    const seat1 = parseInt(seatArray[i + 1], 10);
    const seat2 = parseInt(seatArray[i + 2], 10);
    const isW = seatArray[i + 3] === 'W'; // Check if 'W' is present

    result.push({
      row,
      seat1,
      seat2,
      isW,
    });
  }

  return result;
};