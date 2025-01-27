import { create } from "zustand";

interface ModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  resetState: () => void;
}

// Factory function to create modal stores
const createModalStore = () =>
  create<ModalStore>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
    resetState: () => set({ isModalOpen: false }),
  }));

// Create specific modal stores
export const useLoginModal = createModalStore();
export const useLogoutModal = createModalStore();
export const useBookingModal = createModalStore();
export const usePaymentSuccessModal = createModalStore();
export const usePaymentFailureModal = createModalStore();

// Custom store with additional properties
interface CountryCodeModal extends ModalStore {
  countryCode: {
    country: string;
    code: string;
    abb: string;
  };
  setCountryCode: (code: {
    country: string;
    code: string;
    abb: string;
  }) => void;
}

export const useCountryCodeModal = create<CountryCodeModal>((set) => ({
  isModalOpen: false,
  countryCode: { country: "Nigeria", code: "+234", abb: "NG" }, // Default country code

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

  setCountryCode: (code) => set({ countryCode: code }),
  resetState: () => set({ isModalOpen: false })
}));
