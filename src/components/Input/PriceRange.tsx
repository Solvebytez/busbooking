'use client'

import React, { useCallback } from 'react'
import { IndianRupee } from 'lucide-react'
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"

import { debounce } from 'lodash'
import { usePriceRangeStore } from '@/store/priceRange'

export default function PriceRangeFilter() {
  const { minPrice, maxPrice, setPriceRange } = usePriceRangeStore()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetPriceRange = useCallback(
    debounce((min: number, max: number) => {
      // If max is equal to min, set max to 200
      const validatedMax = min === max ? 200 : Math.max(max, 100);
  
      // Ensure min is less than the validated max
      const validatedMin = Math.min(min, validatedMax);
  
      setPriceRange(validatedMin, validatedMax);
    }, 80),
    [setPriceRange]
  );


  // useEffect(() => {
  //   // Update Zustand store when the component receives new props
  //   setPriceRange(lowestPrice, heigstPrice);
  // }, [heigstPrice, lowestPrice, setPriceRange]);


  const handleSliderChange = (newValues: number[]) => {
    debouncedSetPriceRange(newValues[0], newValues[1])
  }

  const handleInputChange = (index: number, value: string) => {
    const newValue = parseInt(value, 10) || 0
    if (index === 0) {
      debouncedSetPriceRange(newValue, Math.max(newValue, maxPrice))
    } else {
      debouncedSetPriceRange(Math.min(minPrice, newValue), newValue)
    }
  }

  return (
    <div className="mb-4 bg-secondary/15 px-2 py-2 rounded-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-secondary">Price Range</h3>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex justify-between text-secondary font-semibold mt-2 w-full my-4">
          <div className="border border-secondary flex items-center justify-center w-[30%] h-[45px] rounded-sm">
            <IndianRupee size={14} />
            <input
              value={minPrice}
              onChange={(e) => handleInputChange(0, e.target.value)}
              type="text"
              className="text-center rounded-sm w-[100%] h-full focus:border-none border-none focus:outline-none !focus-visible:ring-0 px-2"
            />
          </div>
          <div className="border border-secondary flex items-center justify-center w-[30%] rounded-sm">
            <IndianRupee size={14} />
            <input
              value={maxPrice}
              onChange={(e) => handleInputChange(1, e.target.value)}
              type="text"
              className="text-center rounded-sm w-[100%] h-full focus:border-none border-none focus:outline-none !focus-visible:ring-0 px-2"
            />
          </div>
        </div>
        <RangeSlider
        //   className="single-thumb"
        disabled={maxPrice === minPrice+100}
          value={[minPrice, maxPrice]}
          onInput={handleSliderChange}
          min={150}
          max={10000}
          step={1}
        />
        <div className="flex justify-between text-secondary font-semibold mt-2">
          <span>{minPrice}</span>
          <span>{maxPrice}</span>
        </div>
      </div>
    </div>
  )
}

