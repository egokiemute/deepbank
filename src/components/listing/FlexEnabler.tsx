"use client";
import React from "react";
import Button from "../ui/Button";
import SubTitle from "../ui/SubTitle";
import { useRouter } from "next/navigation";
import { registerRoute } from "@/utils/Routes";

interface FlexEnablerProps {
  heading: string;
  description: string;
}

const FlexEnabler = ({heading, description}: FlexEnablerProps) => {
    const router = useRouter();
    const gotoRegister = () => {
      router.push(registerRoute);
    };
  return (
    <section id="FlexEnablers" className="py-[74px] sm:py-20">
      <div className="container">
        <div className="flex flex-col items-center">
          <SubTitle text="Your experience" theme="purple" />
          <h2 className="mt-4 text-center text-heading-sm font-bold text-text-strong xs:text-heading-lg">
            {heading}
          </h2>

          <p className="mx-auto mb-7 mt-4 max-w-xl text-center leading-[28px]">
            {description}
          </p>

          <Button style="primary" type="button" fn={gotoRegister}>
            Get Started{" "}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FlexEnabler;
