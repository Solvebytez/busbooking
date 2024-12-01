import { create } from 'zustand'

interface PriceRangeState {
  minPrice: number
  maxPrice: number
  maxPossiblePrice: number
  setPriceRange: (minPrice: number, maxPrice: number) => void
  setMaxPossiblePrice: (maxPossiblePrice: number) => void
}

export const usePriceRangeStore = create<PriceRangeState>((set) => ({
  minPrice: 100,
  maxPrice: 7000,
  maxPossiblePrice: 4000,
  setPriceRange: (minPrice: number, maxPrice: number) => set({ minPrice, maxPrice }),
  setMaxPossiblePrice: (maxPossiblePrice: number) => set({ maxPossiblePrice }),
}))
