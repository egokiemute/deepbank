import { create } from "zustand";

interface NavStore {
  isNavOpen: boolean;
  isUserNavOpen: boolean;
  openNav: () => void;
  openUserNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;
  toggleUserNav: () => void;
  resetState: () => void; // Reset function
}

export const useNavStore = create<NavStore>((set) => ({
  isNavOpen: false,
  isUserNavOpen: false,

  openUserNav: () => set({ isUserNavOpen: true }),
  openNav: () => set({ isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  toggleUserNav: () =>
    set((state) => ({ isUserNavOpen: !state.isUserNavOpen })),

  // Reset to default state
  resetState: () => set({ isNavOpen: false, isUserNavOpen: false }),
}));

interface VariableStore {
  limit: number;
  page: number;
  category: string;
  city: string;
  day: string;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  setCategory: (category: string) => void;
  setCity: (city: string) => void;
  setDay: (city: string) => void;
  resetState: () => void; // Reset function
}

export const useVariables = create<VariableStore>((set) => ({
  limit: 10,
  page: 1,
  category: "",
  city: "",
  day: "",

  setLimit: (limit: number) => set({ limit }),
  setPage: (page: number) => set({ page }),
  setCategory: (category: string) => set({ category }),
  setCity: (city: string) => set({ city }),
  setDay: (day: string) => set({ day }),

  // Reset to default state
  resetState: () => set({ limit: 10, page: 1 }),
  resetSpaceFilter: () => set({ city: "", category: "", day: "" }),
}));
