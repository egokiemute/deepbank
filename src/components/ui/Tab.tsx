"use client";
import { FC } from "react";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  theme?: "blue" | "purple"; // Add theme prop with specific types
}

const Tab: FC<TabProps> = ({
  label,
  isActive,
  onClick,
  theme = "blue", // Default to blue theme
}) => {
  const themeStyles = {
    blue: {
      active: "bg-fill-blueStrong text-text-strongInverse",
      inactive: "bg-icon-strong-inverse text-text-blue",
    },
    purple: {
      active: "bg-[#9327DB] text-text-strongInverse",
      inactive: "bg-icon-strong-inverse text-[#9327DB]",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div
      className={`h-8 cursor-pointer whitespace-nowrap rounded-[1000px] px-2 py-1 text-center text-paragraph-md duration-150 xs:px-4 ${isActive ? currentTheme.active : currentTheme.inactive} `}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

export default Tab
