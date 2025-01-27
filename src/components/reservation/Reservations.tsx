"use client";
import React from "react";
import ReservationCard from "../ui/ReservationCard";
import PageLoading from "../ui/PageLoading";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { spacesPage } from "@/utils/Routes";
import { useFetchtReservations } from "@/hooks/user/useUser";
// import { filterReservation } from "@/store/Reservation";

export default function Reservations() {
  const router = useRouter();
  const gotoSpaces = () => {
    router.push(spacesPage);
  };

  // Fetch reservations with the hook
  const { data, isLoading } = useFetchtReservations();

  const reservations = data; // Extract reservations from the response

  console.log(reservations);

  // Handle loading state
  if (isLoading) return <PageLoading />;

  // Function to render reservations
  const renderReservations = () => {
    if (Array.isArray(reservations) && reservations.length > 0) {
      return reservations.map((reservation, i) => (
        <ReservationCard key={i} {...reservation} />
      ));
    }
  };

  return (
    <section className="min-h-screen bg-[#00000005] pb-20">
      <div className="container">
        {/* Grid layout for reservations */}
        {Array.isArray(reservations) && reservations.length > 0 ? (
          // <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">{renderReservations()}</div>
        ) : (
          <div className="mx-auto flex min-h-[50vh] w-full items-center justify-center">
            <div className="mx-auto flex flex-col items-center justify-center text-center">
              <h1 className="mb-3 text-title-lg">No reservations available</h1>
              <p className="mb-4">
                You don&apos;t have any pending reservations. Would you like to
                make one now?
              </p>
              <Button
                style="nobg"
                type="button"
                css="w-lg bg-white text-black"
                fn={gotoSpaces}
              >
                Explore spaces
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
