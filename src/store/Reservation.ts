import { create } from "zustand";

interface Reservation {
  startDate: string;
  endDate: string;
  days: number;
  price: number;
  guests: number;
  spaceName: string;
}

interface ReservationState {
  reservation: Reservation | null;
  setReservation: (reservation: Reservation) => void;
}

export const createReservationStore = create<ReservationState>((set) => ({
  reservation: null,
  setReservation: (reservation) => set({ reservation }),
}));

interface ReservationFilter {
  status: string;
  setStatus: (data: string) => void;
}

export const filterReservation = create<ReservationFilter>((set) => ({
  status: "",
  setStatus: (data) => set({ status: data }),
}));
