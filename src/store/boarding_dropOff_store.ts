import { CityPropsType } from '@/components/SearchPageUI/BookingForm/SelectLocationFromTo';
import { create } from 'zustand';

interface DropOffStore {
  selected_dropOffList: CityPropsType;
  selected_boardingPoint: CityPropsType;
  setDropOffList: (list: CityPropsType) => void;
  setBoardingPoint: (point: CityPropsType) => void;
}

const useDropOffStore = create<DropOffStore>((set) => ({
  selected_dropOffList: {
    bus_time: '',
    bus_stop_location: '',
    bus_location_id: '',
  },
  selected_boardingPoint: {
    bus_time: '',
    bus_stop_location: '',
    bus_location_id: '',
  },
  setDropOffList: (list) =>
    set(() => ({
      selected_dropOffList: list,
    })),
  setBoardingPoint: (point) =>
    set(() => ({
      selected_boardingPoint: point,
    })),
}));

export default useDropOffStore;
