"use client";
import React, { useState } from "react";
import SubTitle from "../ui/SubTitle";
import Tab from "../ui/Tab";
import FaqListItem from "../ui/FaqListItem";
import { FaqContent } from "@/utils/contents/HomePage.content";

interface FaqProps {
  theme?: "blue" | "purple";
}

interface FaqItem {
  question: string;
  answer: string;
}

type TabName = "About us" | "Our Service" | "Support";

const Faq: React.FC<FaqProps> = ({ theme = "blue" }) => {
  const [activeTab, setActiveTab] = useState<TabName>("About us");
  const tabs: TabName[] = ["About us", "Our Service", "Support"];

  const themeStyles = {
    blue: {
      background: "bg-[#0A26FF0F]",
      text: "text-text-strong",
    },
    purple: {
      background: "bg-[#9327DB0F]",
      text: "text-purple-900",
    },
  };

  const currentTheme = themeStyles[theme];

  const tabContentMap: Record<TabName, FaqItem[]> = {
    "About us": FaqContent.about,
    "Our Service": FaqContent.services,
    Support: FaqContent.support,
  };

  return (
    <section className={`${currentTheme.background} py-[74px] sm:py-20`}>
      <div className="container">
        <div className="flex flex-col items-center">
          <SubTitle text="Find out from us" theme={theme} />
          <h2
            className={`mt-4 text-center text-heading-sm font-bold text-black xs:text-heading-lg`}
          >
            Frequently Asked Question
          </h2>

          <p className="mt-2 text-center leading-[28px]">
            Trusted more than 1000+ customers
          </p>
        </div>

        <div className="hide-scroll mb-8 mt-6 flex justify-center gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              theme={theme}
            />
          ))}
        </div>

        <div className="mx-auto flex max-w-[673px] flex-col gap-4">
          {tabContentMap[activeTab].map((content, index) => (
            <FaqListItem
              key={index}
              question={content.question}
              answer={content.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
