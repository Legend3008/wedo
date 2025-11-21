/**
 * Zustand Store - Booking State
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookingStore {
  destinationId: string | null;
  packageId: string | null;
  startDate: Date | null;
  endDate: Date | null;
  travelers: number;
  setDestination: (id: string) => void;
  setPackage: (id: string) => void;
  setDates: (start: Date, end: Date) => void;
  setTravelers: (count: number) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      destinationId: null,
      packageId: null,
      startDate: null,
      endDate: null,
      travelers: 1,
      setDestination: (id) => set({ destinationId: id }),
      setPackage: (id) => set({ packageId: id }),
      setDates: (start, end) => set({ startDate: start, endDate: end }),
      setTravelers: (count) => set({ travelers: count }),
      reset: () =>
        set({
          destinationId: null,
          packageId: null,
          startDate: null,
          endDate: null,
          travelers: 1,
        }),
    }),
    {
      name: 'booking-storage',
    }
  )
);
