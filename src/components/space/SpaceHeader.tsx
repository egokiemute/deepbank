import React from "react";
import { Clock9 } from "lucide-react";
import Button from "../ui/Button";

interface SpaceHeaderProps {
  name: string;
  city: string;
  state: string;
  bookSpace: () => void;
  operatingHours: {
    day: string;
    open: string;
    close: string;
    status: string;
  }[]; // Operating hours for the space
}

const SpaceHeader: React.FC<SpaceHeaderProps> = ({ name, city, state, bookSpace, operatingHours }) => {

  // Calculate the closing time message
  const getClosingTimeMessage = (): string => {
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" }); // Get the current day (e.g., "Monday")
    const currentHour = new Date().getHours(); // Get the current hour in 24-hour format
  
    const todayHours = operatingHours.find((hour) => hour.day === currentDay);
  
    if (!todayHours || todayHours.status === "Closed") {
      return "Closed";
    }
  
    const [closeHour, closeMinute] = todayHours.close.split(/[:\s]/).map(Number); // Parse close hour and minute
    const isPm = todayHours.close.toLowerCase().includes("pm");
    const adjustedCloseHour = isPm && closeHour !== 12 ? closeHour + 12 : closeHour;
  
    if (currentHour >= adjustedCloseHour) {
      return "Closed";
    }
  
    const remainingHours = adjustedCloseHour - currentHour;
    return `Closes in ${remainingHours} ${remainingHours === 1 ? "hour" : "hours"}`;
  };
  

  const closingTimeMessage = getClosingTimeMessage();

  return (
    <div className="flex w-full flex-col items-center justify-between pb-6 pt-32 md:flex-row">
      <div className="flex flex-col items-start mb-2">
        <h2>{name}</h2>
        <p>
          {city}, {state}.
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 w-full md:w-[180px]">
        <Button
          fn={bookSpace}
          style="primary"
          type="button"
          css="w-full px-12"
        >
          Book Space
        </Button>
        <p className="flex items-center gap-1 text-title-sm text-gray-800">
          <Clock9 className="size-5" /> {closingTimeMessage}
        </p>
      </div>
    </div>
  );
};

export default SpaceHeader;
