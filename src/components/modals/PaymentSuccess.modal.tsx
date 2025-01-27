import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchtReservations } from "@/hooks/user/useUser";
import { useSession } from "next-auth/react";
import { usePaymentSuccessModal } from "@/store/Modals";
import Button from "../ui/Button";
import { spacesPage } from "@/utils/Routes";
import ModalLayout from "./ModalLayout";

export default function PaymentSuccess() {
  const { closeModal, isModalOpen } = usePaymentSuccessModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useSession();
  const { data: reservationData } = useFetchtReservations(id as string);

  console.log(reservationData);

  const gotoWhatsapp = () => {
    const userName = data
      ? `${data.user.firstname} ${data.user.lastname}`
      : "Guest"; // Replace with actual user name
    const email = data?.user?.email || "N/A"; // Replace with actual email
    const spaceName = reservationData?.space?.name || "Unknown Space"; // Replace with actual space name
    const transactionId = reservationData?.transactionId || "N/A"; // Replace with actual transaction ID
    const referenceNumber = reservationData?.referenceNumber || "N/A"; // Replace with actual reference number
    const amount = reservationData?.amount
      ? `₦${reservationData.amount.toFixed(2)}`
      : "N/A"; // Format amount
    const guests = reservationData?.guests || "N/A"; // Replace with actual guest count

    const message = `
Hello Flextable Support,

Here are my reservation details:

- *Name:* ${userName}
- *Email:* ${email}
- *Space Reserved:* ${spaceName}
- *Transaction ID:* ${transactionId}
- *Reference Number:* ${referenceNumber}
- *Amount Paid:* ${amount}
- *Number of Guests:* ${guests}

I would appreciate it if you could confirm the details or assist me further.
Thank you!
  `.trim(); // Trim whitespace

    const whatsappLink = `https://wa.me/2347040340319?text=${encodeURIComponent(message)}`;

    console.log("Generated WhatsApp Link:", whatsappLink); // Debugging
    window.open(whatsappLink, "_blank");
  };

  return (
    <ModalLayout
      onClose={() => {
        closeModal();
        window.location.reload();
      }}
      isOpen={isModalOpen}
      heading="Payment Successful"
      className="max-w-[576px]"
    >
      <p className="p-8 text-paragraph-lg">
        Boom! <strong>&#8358;{reservationData?.amount.toFixed(2)}</strong> paid,
        and your <strong>{reservationData?.space.name}</strong> space is secured
        for you and your team. Hit “View Reservation” to see reach out to
        Flextable.
        <br />
        You can also check "My Reservations" to see all your reservations.{" "}
      </p>

      <div className="flex w-full gap-3 border-[1px] border-[#0000001A] px-8 py-4 max-xs:flex-col">
        <Button
          style="reverse"
          type="button"
          css="w-full"
          fn={() => router.push(spacesPage)}
        >
          Explore Spaces
        </Button>
        <Button style="primary" type="button" css="w-full" fn={gotoWhatsapp}>
          View reservation
        </Button>
      </div>
    </ModalLayout>
  );
}
