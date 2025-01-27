"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useBookingModal, useLoginModal, useLogoutModal, usePaymentFailureModal, usePaymentSuccessModal } from "@/store/Modals";
import { useNavStore, useVariables } from "@/store/variables";

export const useResetState = () => {
  // Extract reset functions from modal stores
  const resetLoginModal = useLoginModal((state) => state.resetState);
  const resetLogoutModal = useLogoutModal((state) => state.resetState);
  const resetBookingModal = useBookingModal((state) => state.resetState);
  const resetPaymentSuccessModal = usePaymentSuccessModal(
    (state) => state.resetState,
  );
  const resetPaymentFailureModal = usePaymentFailureModal(
    (state) => state.resetState,
  );

  // Extract reset functions from other stores
  const resetNavStore = useNavStore((state) => state.resetState);
  const resetVariablesStore = useVariables((state) => state.resetState);

  const pathname = usePathname();

  useEffect(() => {
    // Reset all states on pathname change
    resetLoginModal();
    resetLogoutModal();
    resetBookingModal();
    resetPaymentSuccessModal();
    resetPaymentFailureModal();
    resetNavStore();
    resetVariablesStore();
  }, [
    pathname,
    resetLoginModal,
    resetLogoutModal,
    resetBookingModal,
    resetPaymentSuccessModal,
    resetPaymentFailureModal,
    resetNavStore,
    resetVariablesStore,
  ]);
};
