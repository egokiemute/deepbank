import React from "react";

interface SpaceDescriptionProps {
  spaceName: string;
  description: string;
}

const SpaceDescription: React.FC<SpaceDescriptionProps> = ({
  spaceName,
  description,
}) => {
  return (
    <div className="max-w-2xl">
      <h2 className="text-black mb-3">{spaceName}</h2>
      <p className="leading-relaxed">{description}</p>
    </div>
  );
};

export default SpaceDescription;
