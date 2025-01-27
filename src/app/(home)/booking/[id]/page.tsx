"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import {
  useFetchtReservations,
  useUpdateReservation,
} from "@/hooks/user/useUser";
import { formatDate } from "@/utils/Helpers";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";
import dynamic from "next/dynamic";
import PageLoading from "@/components/ui/PageLoading";
import PaymentSuccess from "@/components/modals/PaymentSuccess.modal";
import { usePaymentFailureModal, usePaymentSuccessModal } from "@/store/Modals";
import PaymentFailure from "@/components/modals/PaymentFailure.modal";
import { sendOrderConfirmationEmail } from "@/nodemailer/email";

// Dynamically import PaystackButton with no SSR
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false },
);
interface PaystackSuccessReference {
  reference: string;
  transaction: string;
  message: string;
  status: string;
}

const Booking = () => {
  const { openModal } = usePaymentSuccessModal();
  const { openModal: openFailureModal } = usePaymentFailureModal();
  const PUBLIC_KEY = `${process.env.NEXT_PUBLIC_PAYSTACK_KEY}`;
  const publicKey = PUBLIC_KEY;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useSession();
  const { data: reservationData, isLoading: isReservationLoading } =
    useFetchtReservations(id as string);
  const { mutate } = useUpdateReservation();
  const spaceData = reservationData?.space;

  // Default values for booking (e.g., daily price, guests, days)
  const pricePerDay = reservationData?.amount || 0;
  const numberOfGuests = reservationData?.guests; // Should be dynamic
  const numberOfDays = reservationData?.duration;
  const selectedPrice = pricePerDay;
  const serviceFee = selectedPrice * 0.1;
  const totalPrice = selectedPrice + serviceFee;
  const currentDate = new Date();
  const currentStatus = () => {
    const currentDay = new Date().toDateString();
    const startDay = new Date(reservationData?.startDate).toDateString();
    const endDay = new Date(reservationData?.endDate).toDateString();

    if (
      currentDay >= startDay &&
      currentDay <= endDay &&
      reservationData?.status !== "cancelled"
    ) {
      return "active";
    } else {
      return "confirmed";
    }
  };

  console.log(data);
  console.log(reservationData);
  console.log(currentStatus(), currentDate);

  const componentProps = {
    publicKey,
    email: data?.user.email || "guest@example.com",
    amount: totalPrice * 100, // Paystack expects amount in kobo
    text: isReservationLoading ? "Loading..." : "Confirm and pay",
    metadata: {
      custom_fields: [
        {
          display_name: "First Name",
          variable_name: "firstname",
          value: data?.user.firstname || "Guest",
        },
        { display_name: "Phone", variable_name: "phone", value: "0000000000" },
      ],
    },
    reference: `ref-${new Date().getTime()}`,
    onClose: () => console.log("Payment dialog closed."),
    onSuccess: async (reference: PaystackSuccessReference) => {
      try {
        if (data && id) {
          mutate({
            id,
            email: data.user.email,
            status: currentStatus(),
            transactionId: reference.transaction,
            referenceNumber: reference.reference,
          });

          // Send the order confirmation email
          // await sendOrderConfirmationEmail(
          //   data.user.email,
          //   reservationData.firstname,
          //   reference.transaction,
          //   reservationData.space,
          //   reservationData.amount,
          //   reservationData.startDate,
          // );

          openModal();
        } else {
          console.error("User data or reservation ID is not available.");
        }
      } catch (error) {
        console.error("Error during payment success handling:", error);
      }
    },
    onError: () => {
      openFailureModal();
    },
  };

  const gotoWhatsapp = () => {
    if (!data || !reservationData) {
      console.error("Missing data for WhatsApp message");
      return;
    }
    // Replace these values with your dynamic data
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

  if (isReservationLoading) return <PageLoading />;

  return (
    <>
      <Header />
      <section className="min-h-[50vh] pb-20 pt-32">
        <div className="container">
          <div className="px-2 py-10 pb-0">
            <h1 className="text-heading-lg font-bold text-[#000000E5]">
              Reserve space
            </h1>
            <div className="flex flex-col-reverse items-start justify-between gap-4 py-14 pt-6 sm:flex-row">
              <div className="flex flex-col items-start gap-16">
                <div className="flex w-full items-center justify-between gap-10 rounded-2xl border border-[#0000001A] bg-white px-5 py-5 sm:px-10">
                  <div className="flex flex-col items-start gap-4">
                    <h1 className="text-base font-bold">Top choice</h1>
                    <p className="text-sm">
                      {spaceData?.name} has been a top choice recently.
                    </p>
                  </div>
                  <img
                    src="/star2.svg"
                    alt="top choice co-work space"
                    className="size-8"
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-5">
                  <h1 className="text-xl font-bold">Your Reservation</h1>
                  <div className="flex items-center justify-between gap-20 pb-5">
                    <div className="flex flex-col items-start gap-3">
                      <h1 className="text-base font-bold">Date</h1>
                      {reservationData?.startDate && (
                        <p className="text-sm">
                          {formatDate(reservationData?.startDate)} &mdash;{" "}
                          {formatDate(reservationData?.endDate)}.
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-3">
                      <h1 className="text-base font-bold">Guests</h1>
                      <p className="text-sm whitespace-nowrap">
                        {numberOfGuests} guest(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-start gap-5 border-t border-[#0000001A] pt-2">
                    <h1 className="text-xl font-bold">Payment option</h1>
                    <div className="flex items-center justify-between gap-20 pb-2">
                      <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-6">
                        <p className="text-base">Paystack</p>
                        <img
                          src="/paystack.svg"
                          alt="paystack"
                          className="size-12"
                        />
                      </div>
                    </div>
                  </div>
                  {reservationData?.status !== "confirmed" ? (
                    <PaystackButton
                      className="w-full rounded-full bg-black px-4 py-3 font-bold text-white transition duration-200 focus:outline-none"
                      {...componentProps}
                    />
                  ) : (
                    <Button
                      style="primary"
                      type="button"
                      css="w-full"
                      fn={gotoWhatsapp}
                    >
                      View reservation
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <div className="flex max-w-xl flex-col items-start gap-6 divide-y-2 divide-[#0000001A] rounded-2xl border border-[#0000001A] bg-white p-5">
                  {spaceData ? (
                    <>
                      <div className="flex w-full flex-col items-start gap-4 sm:items-center md:flex-row">
                        <img
                          src={spaceData?.images[0]?.url}
                          alt="space image"
                          className="h-[240px] w-full rounded-lg object-cover sm:h-[200px] md:w-[260px]"
                        />
                        <div className="flex flex-col items-start gap-2">
                          <h4 className="text-heading-sm font-bold text-black">
                            {spaceData?.name}
                          </h4>
                          <p className="text-sm sm:text-base">
                            {spaceData?.street}, {spaceData?.city}.
                          </p>
                          <p className="text-sm sm:text-base">
                            {spaceData?.views} persons viewed this space.
                          </p>
                        </div>
                      </div>
                      <div className="w-full pt-2">
                        <h1 className="text-lg sm:text-2xl font-bold">
                          Price details
                        </h1>
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-sm">
                            &#8358;{pricePerDay} for {numberOfGuests} guest(s)
                          </p>
                          <p className="text-sm">&#8358;{selectedPrice}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-sm">Service fee (10%)</p>
                          <p className="text-sm">
                            &#8358;{serviceFee.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-sm">Duration</p>
                          <p className="text-sm">{numberOfDays} day(s)</p>
                        </div>
                      </div>
                      <div className="w-full pt-2">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">Total:</p>
                          <p className="font-semibold">
                            &#8358;{totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>Loading space details...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PaymentSuccess />
      <PaymentFailure />
    </>
  );
};

export default Booking;
