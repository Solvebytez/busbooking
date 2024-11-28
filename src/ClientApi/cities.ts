import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query"


export const useGetAllCities = () => {
    return useQuery({
      queryKey: ['all-cities'],
      queryFn: async () => {
        const response = await axiosInstance.post('bus/cities/get');
        return response.data; // Return only the data
      },
      staleTime: 1000 * 60 * 15, // 5 minutes
    });
  };