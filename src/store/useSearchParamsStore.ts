import { create } from 'zustand';

export interface SearchParamsState {
  fromCityId: string | null;
  fromCity: string | null;
  toCity: string | null;
  toCityId: string | null;
  tripType: string | null;
  departureDate: string | null | undefined;
  isSingleLady: boolean | null;
  returnDate: string | null | undefined;
  setParams: (params: Partial<SearchParamsState>) => void;
}

const useSearchParamsStore = create<SearchParamsState>((set) => ({
  fromCityId: null,
  fromCity: null,
  toCity: null,
  toCityId: null,
  tripType: null,
  departureDate: undefined,
  isSingleLady: null,
  returnDate: undefined,
  setParams: (params) => set((state) => ({ ...state, ...params })),
}));

export default useSearchParamsStore;
