import React from "react";

interface SpaceAmenitiesProps {
  amenities?: string[];
}

const SpaceAmenities: React.FC<SpaceAmenitiesProps> = ({ amenities = [] }) => {
  return (
    <div>
      <div className="mb-3 text-heading-sm font-bold text-black">
        Amenities
      </div>
      <div className="flex flex-wrap gap-3">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2 px-5 text-title-lg"
          >
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceAmenities;
