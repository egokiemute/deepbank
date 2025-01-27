"use client";
import { filterReservation } from "@/store/Reservation";
import React, { useState } from "react";

// Categories to filter by
// const categories = ["All", "Pending", "On-going", "Completed", "Cancelled"];
const categories = [
  {
    name: "All",
    status: "",
  },
  {
    name: "Pending",
    status: "awaiting payment",
  },
  {
    name: "On-going",
    status: "active",
  },
  {
    name: "Confirmed",
    status: "confirmed",
  },
  {
    name: "Completed",
    status: "completed",
  },
  {
    name: "Cancelled",
    status: "cancelled",
  },
];

const ReservationFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { setStatus } = filterReservation();

  return (
    <section className="overflow-hidden bg-[#00000005] pb-5 pt-[136px] xs:pb-12 xs:pt-40">
      <div className="container flex flex-col items-start gap-4">
        <h1 className="text-heading-lg font-bold tracking-wide text-text-strong">
          My Reservations
        </h1>
        <button className="hide-scroll flex w-full items-center gap-2 overflow-x-scroll px-1 py-2">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => {
                setStatus(category.status);
                setSelectedCategory(category.name);
              }}
              className={`text-sm whitespace-nowrap rounded-full p-2 px-4 font-medium tracking-[1px] text-black transition-all duration-300 ease-in-out ${
                selectedCategory === category.name
                  ? // ? "border-[2px] border-black bg-[#0000000d] text-black transition-all duration-500 ease-in-out"
                    "border-none bg-[#0000000F] text-black outline outline-[3px] transition-all duration-500 ease-in-out"
                  : "border-[1px] border-[#0000001A] bg-white text-[#0C0C0CB0]"
              }`}
            >
              {category.name}
            </div>
          ))}
        </button>
      </div>
    </section>
  );
};

export default ReservationFilter;
