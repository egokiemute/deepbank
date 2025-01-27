"use client";
import { FC } from "react";
import SubTitle from "../ui/SubTitle";
import { fillSpaceContent } from "@/utils/contents/ListingPage.content";

interface IStats {
  title: string;
  text1: string;
  text2: string;
}

const Stats: FC<IStats> = ({ text1, text2, title }) => {
  return (
    // <div className="h-[44px] w-[363px] rounded-lg md:h-[126px] md:w-[229px] lg:w-[363px]">
    // <div className="max-w-[363px] w-1/3 min-w-[200px] bg-red-300">
    <div className="bg-re-300 w-10/12 max-w-[463px] xs:w-full">
      <h3 className="text-heading-lg text-[#9327DB]">{title}</h3>
      <p className="mt-2 text-title-md sm:text-heading-sm">
        <span className="font-bold">{text1}</span>{" "}
        <span className="">{text2}</span>
      </p>
    </div>
  );
};

export default function FillSpace() {
  return (
    <section className="pb-20 pt-12 md:pt-[102px]">
      <div className="container mx-auto">
        <div className="">
          <div className="">
            <SubTitle text=" What we can achieve" theme="purple" />
            <h2 className="mt-4">Join us in Making workspaces available to <br />remote workers in Africa.</h2>
          </div>

          {/* <div className="mt-[50px] grid grid-cols-1 gap-x-[204px] gap-y-20 sm:grid-cols-2 md:gap-y-4 lg:grid-cols-3 lg:gap-y-6"> */}
          <div className="mt-[50px] grid grid-cols-1 justify-between gap-x-[16px] gap-y-6 xs:grid-cols-2 md:grid-cols-3">
            {/* <div className="mt-[50px] flex flex-wrap bg-green-500 gap-x-[106px] gap-y-6"> */}
            {fillSpaceContent.map((c, i) => (
              <Stats key={i} text1={c.text1} text2={c.text2} title={c.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
