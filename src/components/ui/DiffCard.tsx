import React from "react";
import * as Icons from "lucide-react";

interface CardProps {
  title: string;
  text: string;
  icon: keyof typeof Icons; // Restrict to valid Lucide icon names
}

const DiffCard: React.FC<CardProps> = ({ title, text, icon }) => {
  const Icon = Icons[icon] as React.ComponentType<{
    size?: number;
    className: string;
  }>;

  return (
    <div className="flex w-full max-w-[340px] gap-4 max-sm:flex-col max-sm:items-center">
      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-lg bg-fill-weak xs:h-[92px] sm:min-w-[88px]">
        {Icon ? (
          <Icon size={30} className="text-stroke-strong" />
        ) : (
          <div>Icon not found</div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="whitespace-nowrap font-bold text-text-strong max-sm:text-center">
          {title}
        </h3>
        <p className="max-sm:text-center">{text}</p>
      </div>
    </div>
  );
};

export default DiffCard;
