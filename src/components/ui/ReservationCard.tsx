import { ISpace } from "@/types";
import { formatDate } from "@/utils/Helpers";
import { ChevronRight } from "lucide-react";
import React, { FC } from "react";

interface ReservationCardProps {
  name: string;
  space: ISpace;
  street: string;
  image: string;
  duration: string; // Duration in days
  startDate: string; // ISO string or Date
  endDate: string; // ISO string or Date
  status: string; // awaiting payment, confirmed, cancelled
  onViewDetails: () => void; // Callback for "View details"
}

const ReservationCard: FC<ReservationCardProps> = ({
  name,
  space,
  duration,
  startDate,
  endDate,
  status,
  onViewDetails,
}) => {
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "awaiting payment":
        return {
          label: "Pending",
          bgColor: "bg-[#A3761A0A]",
          borderColor: "border-[#A3761A33]",
          textColor: "text-[#A3761A]",
        };
      case "confirmed":
        return {
          label: "Confirmed",
          bgColor: "bg-[#0A26FF0F]",
          borderColor: "border-[#0A26FF3D]",
          textColor: "text-[#0A26FF]",
        };
      case "active":
        return {
          label: "On-going",
          bgColor: "bg-[#F15A2A0F]",
          borderColor: "border-[#F15A2A3D]",
          textColor: "text-[#F15A2A]",
        };
      case "cancelled":
        return {
          label: "Canceled",
          bgColor: "bg-[#CC18180F]",
          borderColor: "border-[#CC181833]",
          textColor: "text-[#CC1818]",
        };
      case "completed":
        return {
          label: "Completed",
          bgColor: "bg-[#008F000F]",
          borderColor: "border-[#008F003D]",
          textColor: "text-[#008F00]",
        };
      default:
        return {
          label: "",
          bgColor: "",
          borderColor: "",
          textColor: "",
        };
    }
  };

  const durationText =
    duration === "1"
      ? "1 day"
      : duration === "7"
        ? "1 week"
        : duration === "30"
          ? "1 month"
          : `${duration} day${duration !== "1" ? "s" : ""}`;

  return (
    <div className="flex w-full flex-col gap-0 rounded-2xl border-[1px] border-[#0000001A] bg-white">
      <div className="flex items-center gap-6 p-5 max-md:flex-col">
        {/* Image Section */}
        <div className="h-[200px] w-full md:h-40 md:max-w-96">
          <img
            src={space.images?.[0]?.url ?? ""}
            alt={`Image of ${name}`}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="flex w-full flex-col items-start">
          <div className="flex flex-col items-start gap-1">
            <h2 className=" ">{space.name}</h2>
            <p className="mt-1 text-paragraph-md">
              {space.street + ", " + space.city + ", " + space.state + "."}
            </p>
          </div>

          <div className="flex flex-col items-start gap-1">
            <span
              className={`text-xs mt-4 rounded-xl border-[1px] px-2 py-1 font-bold ${
                getStatusDetails(status).bgColor
              } ${getStatusDetails(status).borderColor} ${
                getStatusDetails(status).textColor
              }`}
            >
              {getStatusDetails(status).label}
            </span>
            <p className="mt-2 flex flex-col items-center text-paragraph-md">
              <span>
                {durationText} {"-"} {formatDate(startDate)} -{" "}
                {formatDate(endDate)}
              </span>
              {/* <span>-</span> */}
              <span>{/* {new Date(endDate).getFullYear()} */}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[0.5px] w-full border-[1px] border-[#0000001A]" />

      {/* View Details Button */}
      <button
        onClick={onViewDetails}
        className="flex items-center justify-between p-5"
      >
        <p className="text-lg bg-transparent font-bold underline">
          View details
        </p>
        <ChevronRight className="size-6 text-[#00000066]" />
      </button>
    </div>
  );
};

export default ReservationCard;
