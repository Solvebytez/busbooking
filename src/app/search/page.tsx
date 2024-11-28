import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { SearchParams } from '@/types/search'
import SearchResultConatiner from '@/components/SearchPageUI/SearchResultConatiner';

export default async  function SearchPage({ searchParams }: { searchParams: Promise<SearchParams>; }) {
  const requiredParams = [
    "fromCityId",
    "fromCity",
    "toCity",
    "toCityId",
    "tripType",
    "departureDate",
    "isSignleLady",
  ];
  const resolvedSearchParams = await searchParams;
  // Check if any parameter is missing
  const isMissingParam = requiredParams.some((param) => !resolvedSearchParams[param]);

  if (isMissingParam) {
    redirect("/?missingParams=true"); // Redirect to the homepage if a parameter is missing
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Suspense fallback={"dsgsdf"}>
        <SearchResultConatiner  />
      </Suspense>
    </div>
  )
}

