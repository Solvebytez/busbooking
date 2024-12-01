import { CircleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import { toast } from "react-toastify";

const useValidateQueryParams = () => {
  const searchParams = useSearchParams();

  const validateQueryParams = useCallback(() => {
    const fromCityId = searchParams.get("fromCityId");
    const fromCity = searchParams.get("fromCity");
    const toCity = searchParams.get("toCity");
    const toCityId = searchParams.get("toCityId");
    const tripType = searchParams.get("tripType");
    const departureDate = searchParams.get("departureDate");
    const isSignleLady = searchParams.get("isSignleLady");

    let isValid = true;
    let errorMessage = "";

 
    // Validate fromCityId
    if (!fromCityId || !/^\d+$/.test(fromCityId)) {
      isValid = false;
      errorMessage += "Invalid fromCityId. ";
    }

    // Validate fromCity
    if (!fromCity || (!/^[a-zA-Z\s]+$/.test(fromCity) && fromCity !== "A.S.Peta")) {
      isValid = false;
      errorMessage += "Invalid From City. ";
    }

    // Validate toCity
    if (!toCity || (!/^[a-zA-Z\s]+$/.test(toCity) && toCity !== "A.S.Peta")) {
      isValid = false;
      errorMessage += "Invalid toCity. ";
    }

    // Validate toCityId
    if (!toCityId || !/^\d+$/.test(toCityId)) {
      isValid = false;
      errorMessage += "Invalid toCityId. ";
    }

    // Validate tripType
    if (!tripType || !["one_way", "round_trip"].includes(tripType)) {
      isValid = false;
      errorMessage += "Invalid tripType. ";
    }

    // Validate departureDate
    if (!departureDate || !/^\d{4}-\d{2}-\d{2}$/.test(departureDate)) {
      isValid = false;
      errorMessage += "Invalid departureDate. ";
    }

    // Validate isSignleLady
    if (!isSignleLady || !["true", "false"].includes(isSignleLady)) {
      isValid = false;
      errorMessage += "Invalid isSignleLady. ";
    }

    if (!isValid) {
      toast.error(errorMessage, {
        icon: <CircleAlert className="text-red-600" />,
        className: "text-red-600",
      });
    }

    return isValid;
  }, [searchParams]);

  useEffect(() => {
    validateQueryParams();
  }, [validateQueryParams]);
};

export default useValidateQueryParams;
