"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
// import { useRouter } from "next/navigation";
// import { loginRoute, registerRoute } from "@/utils/Routes";
import { useBookingModal, useLoginModal } from "@/store/Modals";
import { useCreateReservation } from "@/hooks/user/useUser";
import { useParams } from "next/navigation";
import { useAllFetchSpaces } from "@/hooks/admin/useAdmin";
import { useSession } from "next-auth/react";
import calculateEndDateExcludingSundays from "@/utils/Helpers";
import { toast } from "sonner";
import CustomDatePicker from "../space/CustomDatePicker";
import SelectDuration from "../space/SelectDuration";
import GuestsSelect from "../space/GuestsSelect";
import ModalLayout from "./ModalLayout";

interface Guests {
  justMe: number;
  team: number;
  friends: number;
  startupSpace: number;
}

export default function BookingModal() {
  const { closeModal, isModalOpen } = useBookingModal();
  const { mutate, isPending } = useCreateReservation();
  //   const [bookingPopupOpen, setBookingPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { openModal } = useLoginModal();
  const [days, setDays] = useState<number>(1);
  const [price, setPrice] = useState<number | undefined>();
  const [guests, setGuests] = useState<number>(1);
  const { slug } = useParams();
  const { data } = useAllFetchSpaces(slug as string);
  const { status } = useSession();

  //   console.log(data);

  useEffect(() => {
    if (data?.duration?.length) {
      const defaultDuration = data.duration[0];
      setDays(defaultDuration.days);
      // setBasePrice(defaultDuration.price);
      setPrice(defaultDuration.price); // Initial price for 1 guest
    }
  }, [data?.duration]);

  //   const operatingHours = data?.operatingHours;

  const handleDurationChange = (selected: {
    key: string;
    days: number;
    price: number;
  }) => {
    setDays(selected?.days);
    setPrice(selected?.price);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleGuestsChange = (updatedGuests: Guests) => {
    const totalGuests = Object.values(updatedGuests).reduce(
      (sum, count) => sum + count,
      0,
    );
    setGuests(totalGuests);
    // const newPrice = basePrice * totalGuests;
    // console.log("New Price:", newPrice);
    // setPrice(newPrice);
  };

  const endDate = calculateEndDateExcludingSundays(selectedDate, days);

  const bookSpace = () => {
    if (status != "authenticated") {
      closeModal();
      openModal();
    }

    if (!selectedDate || !endDate || !days || !price || !guests) {
      // console.error("Invalid booking data");
      toast.error("Invalid booking data");
      return;
    }
    const user = data?.createdBy;
    const space = data?._id;
    const spaceStatus = "awaiting payment";
    const amount = price * guests;
    const reservationData = {
      user,
      space,
      startDate: selectedDate,
      endDate,
      duration: days,
      guests,
      amount,
      status: spaceStatus,
      email: data?.createdByEmail || "", // Add email property
    };
    mutate(reservationData);
  };

  return (
    <ModalLayout
      isOpen={isModalOpen}
      onClose={() => closeModal()}
      className="relative min-h-[410px] max-w-md"
      heading={`${data?.name || "Space"}`}
    >
      <div className="py-5">
        <div className="px-4">
          <CustomDatePicker
            onDateChange=   {handleDateChange}
            label="Start Date"
          />
        </div>
        <div className="mt-4 px-4">
          <SelectDuration
            durations={data?.duration || []}
            label="Choose a Duration"
            onDurationChange={handleDurationChange}
          />
        </div>
        <div className="mt-4 px-4">
          <GuestsSelect onGuestsChange={handleGuestsChange} />
        </div>
      </div>
      <div className="absolte bottom-0 w-full rounded-b-2xl bg-white">
        <div className="flex items-center justify-between gap-4 p-5">
          <Button
            fn={bookSpace}
            style="primary"
            type="button"
            css="w-full px-12"
            loading={isPending}
          >
            Book Space
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
