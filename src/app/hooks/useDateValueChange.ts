'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function useDateSelection() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateURLSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          current.delete(key)
        } else {
          current.set(key, value)
        }
      })

      const search = current.toString()
      const query = search ? `?${search}` : ""
 
      router.replace(`${window.location.pathname}${query}`)
    },
    [router, searchParams]
  )

  const handleDepartureDateChange = useCallback(
    (value: Date | undefined) => {
      updateURLSearchParams({
        departureDate: value ? value.toLocaleDateString('en-CA') : null,
      })
    },
    [updateURLSearchParams]
  )

  const handleReturnDateChange = useCallback(
    (value: Date | undefined) => {

      updateURLSearchParams({
        returnDate: value ? value.toLocaleDateString('en-CA') : null,
        tripType: "round_trip",
      })
    },
    [updateURLSearchParams]
  )

  return {
    handleDepartureDateChange,
    handleReturnDateChange,
  }
}

