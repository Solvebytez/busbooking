/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from '@/lib/axiosInstance';

// Define the shape of each bus service in the 'data' array
export interface BusService {
  id: number;
  number: string;
  name: string;
  operator_service_name: string;
  origin_id: number;
  destination_id: number;
  route_id: number;
  travel_id: number;
  bus_type: string;
  dep_time: string;
  arr_time: string;
  duration: string;
  available_seats: number;
  total_seats: number;
  service_tax_percent: number;
  fare_str: string;
  is_cancellable: boolean;
  commission: string;
  status: string;
  op_schedule_id: number;
  convenience_charge_percent: number;
  amenities: any;
  boarding_stages: string;
  dropoff_stages: string;
  deals: string;
  cancellation_policies: string;
  trip_id: string;
  agent_cancellation_time: number;
  updated_at: string;
  route_map_id: any;
  is_service_tax_applicable: boolean;
  via: string;
  is_ac_bus: boolean;
  allow_reschedule: boolean;
  travel_date: string;
  route_version: string;
  bp_dp_fares: Record<string, any>;
  bp_dp_pair_fares: Record<string, any>;
  city_seq_order: string[];
  cc_type: string;
  main_dep_time: string;
  transaction_charges: string;
  no_coach_layout: boolean;
  is_package_fare_allowed: boolean;
  cancellation_reference_type: string;
  social_distancing_guaranteed: boolean;
  reschedule_policies: string;
  o_available: string;
  o_available_gst: string;
  is_o_available_fare_enabled_booking: boolean;
  parent_travel_id: string;
  show_fare_screen: string;
  o_fare_str: string;
}

// Define the structure of the entire API response
export interface FilterResponse {
  success: boolean;
  data: BusService[];
  code: number;
}



// Define the expected input type (filter data)
export interface FilterData {
  onward_date: string;
  origin: number;
  destination: number;
  bus_type?: string;
  bus_time?: string;
  price_range_min?: number;
  price_range_max?: number;
}


interface FareAnalysis {
  lowestFare: number;
  highestFare: number;
}

const parseFareStr = (fareStr: string): number[] => {
  return fareStr.split(',')
    .map(fare => {
      const [, value] = fare.split(':');
      return parseFloat(value);
    })
    .filter(fare => !isNaN(fare));
};

const analyzeFares = (busServices: BusService[]): FareAnalysis => {
  // if(busServices.length === 0) {
  //   return {
  //     lowestFare:300,
  //     highestFare: 3000,
  //   };
  // }
  const allFares = busServices.flatMap(service => parseFareStr(service.fare_str));
  return {
    lowestFare: Math.min(...allFares),
    highestFare: Math.max(...allFares),
  };
};

const useFilterData = (filterData: FilterData) => {
  const queryClient = useQueryClient();

  console.log("FilterData", filterData);

  // Define the query key
  const queryKey = ['filterData', filterData];

  const queryFn = async () => {
    try {
      const response = await axiosInstance.post<FilterResponse>('bus/schedules/list', filterData);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching filtered data');
    }
  };

  return useQuery<FilterResponse, Error, FilterResponse & FareAnalysis>({
    queryKey,
    queryFn,
    select: (data) => {
      const fareAnalysis = analyzeFares(data.data);
      return {
        ...data,
        ...fareAnalysis,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useFilterData;









export interface SingleBusService {
  success: boolean;
  data: {
    id: string;
    name: string;
    number: string;
    service_name: string;
    origin_id: number;
    destination_id: number;
    op_schedule_id: number;
    travel_date: string;
    travel_id: number;
    travels_name: string;
    route_id: number;
    route_map_id: string | null;
    available_seats: number;
    description: string;
    dep_time: string;
    duration: string;
    arr_time: string;
    bus_type: string;
    bus_type_id: number;
    cost: string;
    can_cancel: boolean;
    cancellation_time: number;
    cabin_layout: boolean;
    status: string;
    is_service_tax_applicable: boolean;
    helpline_number: string | null;
    amenities: string;
    via: string;
    bus_layout: {
      total_seats: number;
      coach_details: string;
      available: string;
      available_gst: string;
      ladies_seats: string;
      gents_seats: string;
      ladies_booked_seats: string;
      gents_booked_seats: string;
      allow_gents_next_to_ladies: boolean;
      allow_ladies_next_to_gents: boolean;
      boarding_stages: string;
      dropoff_stages: string;
      floor: string;
      last_seats: string;
      forced_seats: string;
      fares_hash: Record<string, Record<string, string>>;
      branch_available: string;
      branch_available_gst: string;
      o_available: string;
      o_available_gst: string;
      o_fare_str: string;
    };
    trip_id: string;
    city_seq_order: string[];
    cancellation_policy: string;
    main_dep_time: string;
    service_tax_percent: number;
    convenience_charge_percent: number;
    is_ac_bus: boolean;
    api_type: number;
    allow_reschedule: boolean;
    route_version: string;
    flexi_fare: string | null;
    allow_ladies_to_book_double_seats: boolean;
    is_seperate_service_tax_allowed: boolean;
    is_inclusive_service_tax: boolean;
    is_bima_branch_fare_enabled_booking: boolean;
    is_bima_online_agent_fare_enabled_booking: boolean;
    is_bima_eticket_fare_enabled_booking: boolean;
    is_fare_exclusive_of_transaction_charges: boolean;
    is_dp_enabled_service: boolean;
    res_details: Record<string, unknown>;
    transaction_charges: string;
    no_coach_layout: boolean;
    is_package_fare_allowed: boolean;
    cancellation_reference_type: string;
    social_distancing_guaranteed: boolean;
    offline_agent_quota: Record<string, string>;
    reschedule_policies: string;
    pincode_hash: {
      city: string;
      pincode: string;
      state: string;
    };
    parent_travel_id: string;
    is_excluded_for_rb: boolean;
  };
  code: number;
}


export const useGetScheduleById= (scheduleID: string) => {
    return useQuery<SingleBusService>({
        queryKey: ['getScheduleById', scheduleID],
        queryFn: async () => {
            try {
                const response = await axiosInstance.post(`bus/schedules/get`,{
                    schedule_id: scheduleID,
                  });
                return response.data; // Return the API response data
            } catch (error: unknown) {
                throw new Error('Error fetching schedule by ID');
            }
        }
    });
}
