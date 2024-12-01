import {create} from 'zustand';

export type TripType = 'one_way' | 'round_trip';

export type SeatData = {
  seat: string | null;
  price: number | null;
  gst: number | false;
  tripType: TripType;
};

export type SeatStore = {
  data: SeatData[];
  totalSeatPrice: number;
  totalGst: number;
  subTotal: number;
  addSeats: (newData: SeatData[]) => void;
};

// Create Zustand store
export const usePriceStore = create<SeatStore>((set) => ({
  data: [],
  totalSeatPrice: 0,
  totalGst: 0,
  subTotal: 0,
  addSeats: (newData) => {
    const totalSeatPrice = newData.reduce((acc, item) => acc + (item.price || 0), 0);
    const totalGst = newData.reduce((acc, item) => acc + (typeof item.gst === 'number' ? item.gst : 0), 0);
    const subTotal = totalSeatPrice + totalGst;

    set({ data: newData, totalSeatPrice, totalGst, subTotal });
  },
}));