import React from "react";
import Button from "../ui/Button";
import { usePaymentFailureModal } from "@/store/Modals";
import ModalLayout from "./ModalLayout";

export default function PaymentFailure() {
  const { closeModal, isModalOpen } = usePaymentFailureModal();

  return (
    <ModalLayout
      onClose={closeModal}
      isOpen={isModalOpen}
      heading="Payment Successful"
      className="max-w-[576px]"
    >
      <p className="p-8 text-paragraph-lg">
        Hmm, looks like your payment didn&quot;t go through. No stress just
        double-check your details and try again.
      </p>

      <div className="flex w-full gap-3 border-[1px] border-[#0000001A] px-8 py-4 max-xs:flex-col">
        <Button style="primary" type="button" css="w-full" fn={closeModal}>
          Try Again
        </Button>
      </div>
    </ModalLayout>
  );
}
