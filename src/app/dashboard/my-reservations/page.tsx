"use client";
import Header from "@/components/Header";
import ReservationFilter from "@/components/reservation/ReservationFilter";
import Reservations from "@/components/reservation/Reservations";

const MyReservations = () => {
  return (
    <>
      <Header />
      <ReservationFilter />
      <Reservations />
    </>
  );
};

export default MyReservations;
