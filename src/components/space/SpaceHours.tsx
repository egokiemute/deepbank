import React, { useState } from "react";

interface SpaceHoursProps {
  hours: {
    day: string;
    open: string;
    close: string;
    status: string;
  }[];
}

const SpaceHours: React.FC<SpaceHoursProps> = ({ hours }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedHours = showAll ? hours : hours.slice(0, 3);

  return (
    <div className="">
      <div className="mb-3 text-heading-sm font-bold text-black">Hours</div>
      <div className="flex flex-col items-start gap-2">
        {displayedHours.map((hour) => (
          <div key={hour.day} className="flex items-center gap-10">
            <div className="w-10 font-bold">{hour.day.slice(0, 3)}</div>
            {hour.status === "Closed" ? (
              <p>Closed</p>
            ) : (
              <p className="">
                {hour.open} &mdash; {hour.close}
              </p>
            )}
          </div>
        ))}
      </div>
      {hours.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-blue-600 underline hover:text-blue-800"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      )}
    </div>
  );
};

export default SpaceHours;
