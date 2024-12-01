// store.ts
import {create} from 'zustand';

export type SideBarFilterOption = 'AC' | 'Non AC' | 'Seater' | 'Sleeper' | 'isBeforeTen' | 'tenToFive' | 'fiveToEleven' | 'afterEleven';

type Store = {
  selectedBusTypes: SideBarFilterOption[];
  selectedDepartureTimes: SideBarFilterOption[];
  setSelectedBusTypes: (busTypes: SideBarFilterOption[]) => void;
  setSelectedDepartureTimes: (departureTimes: SideBarFilterOption[]) => void;
  clearAll: () => void; // Action to clear all
};

export const useStore = create<Store>((set) => ({
  selectedBusTypes: [],
  selectedDepartureTimes: [],
  setSelectedBusTypes: (busTypes) => set({ selectedBusTypes: busTypes }),
  setSelectedDepartureTimes: (departureTimes) =>
    set({ selectedDepartureTimes: departureTimes }),
  clearAll: () =>
    set({
      selectedBusTypes: [],
      selectedDepartureTimes: [],
    }),
}));
