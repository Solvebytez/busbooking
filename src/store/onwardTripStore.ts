/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

interface OnwardTripState {
  onwardTrip: any;
  parsedOnwardTrip: any;
  setOnwardTrip: (trip: any) => void;
  setParsedOnwardTrip: (trip: any) => void;
}

const useOnwardTripStore = create<OnwardTripState>((set) => ({
  onwardTrip: {},
  parsedOnwardTrip: {},
  setOnwardTrip: (trip) => set({ onwardTrip: trip }),
  setParsedOnwardTrip: (trip) => set({ parsedOnwardTrip: trip }),
}))

export default useOnwardTripStore;