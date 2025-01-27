import React, { FC } from "react";

interface SubTitleProps {
  text: string;
  theme?: "blue" | "purple"; // or whatever type currentTheme.background is
}

const SubTitle: FC<SubTitleProps> = ({ text, theme = "blue" }) => {
  const styles = {
    blue: {
      fill: "bg-fill-blueWeak",
      text: "text-text-blue",
    },
    purple: {
      fill: "bg-[#9327DB0F]",
      text: "text-purple-600",
    },
  } as const; // Add const assertion

  // Type-safe theme access
  const selectedTheme = styles[theme as keyof typeof styles];

  return (
    <div
      className={`flex h-8 w-fit items-center justify-between rounded-2xl px-3 py-1 ${selectedTheme.fill}`}
    >
      <h5 className={`text-title-sm font-bold ${selectedTheme.text}`}>
        {text}
      </h5>
    </div>
  );
};

export default SubTitle;
