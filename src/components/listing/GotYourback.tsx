"use client";
import React from "react";
import DiffCard from "../ui/DiffCard";
import * as Icons from "lucide-react";
import { Back } from "@/utils/contents/ListingPage.content";
import SubTitle from "../ui/SubTitle";

export default function GotYourback() {
  return (
    <section className="py-[52px] md:py-[77px] lg:py-[77px]">
      <div className="container">
        <div className="flex flex-col items-center">
          <SubTitle theme="purple" text="Got your back" />

          <div className="mt-4">
            <h2 className="text-center">Your space, fully protected, no questions asked</h2>
            <p className="mt-4 w-full max-w-xl text-center">
            A simple and rewarding checkout experience your customers love. No account, routing, or microdeposits needed. As simple as Venmo or Zelle.
            </p>
          </div>

          <div className="mt-10 grid gap-y-9 sm:mt-12 sm:grid-cols-2 sm:gap-x-20 lg:grid-cols-3">
            {Back.map((d, i) => (
              <DiffCard
                key={i}
                icon={d.icon as keyof typeof Icons}
                text={d.text}
                title={d.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
