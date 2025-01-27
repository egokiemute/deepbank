"use client";
import React from "react";
import BlueSubTitle from "../ui/SubTitle";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { registerRoute } from "@/utils/Routes";

const FlexEnabler = () => {
  const router = useRouter();
  const gotoRegister = () => {
    router.push(registerRoute);
  };
  return (
    <section id="FlexEnablers" className="py-[74px] sm:py-20">
      <div className="container">
        <div className="flex flex-col items-center">
          <BlueSubTitle text="Your experience" />
          <h2 className="mt-4 text-center text-heading-sm font-bold text-text-strong xs:text-heading-lg">
            Become a FlexEnabler!
          </h2>

          <p className="mx-auto mb-7 mt-4 max-w-xl text-center leading-[28px]">
            Be part of the change you want to see! Join as a FlexEnabler, help
            connect people to flexible workspaces as a Host or Community Member
            and stand a chance to get Membership perks.
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
