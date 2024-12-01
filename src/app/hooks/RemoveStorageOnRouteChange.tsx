"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const RemoveStorageOnRouteChange = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = () => {
      if (
        (typeof window !== "undefined" &&
          window.localStorage.getItem("Onward_Trip")) ||
        window.localStorage.getItem("one_way") ||
        window.localStorage.getItem("round_trip")
      ) {
        console.log("Page changed. Removing tripData...");
        window.localStorage.removeItem("Onward_Trip");
        window.localStorage.removeItem("one_way");
        window.localStorage.removeItem("round_trip");
      }
    };

    // Call handleRouteChange when the component mounts
    handleRouteChange();

    // No need for cleanup as we're not adding event listeners
  }, [pathname, searchParams]); // Re-run effect when pathname or searchParams change

  return null; // This component doesn't render anything
};

export default RemoveStorageOnRouteChange;
