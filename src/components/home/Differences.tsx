import React from "react";
import BlueSubTitle from "../ui/SubTitle";
import DiffCard from "../ui/DiffCard";
import { differences } from "@/utils/contents/HomePage.content";
import * as Icons from "lucide-react";

export default function Differences() {
  return (
    <section>
      <div className="container pb-20 pt-8 sm:pb-32 sm:pt-20">
        <div className="flex flex-col items-center">
          <BlueSubTitle text="Differences" />

          <div className="mt-4">
            <h2 className="text-center">
              Your Flexible Workspace Network, Everywhere.
            </h2>
            <p className="mt-4 w-full max-w-2xl text-center">
              Discover how Flextable empowers you to work smarter, stay
              connected, and unlock new possibilities, no matter where you are.
            </p>
          </div>

          <div className="mt-10 grid gap-y-9 sm:mt-12 sm:grid-cols-2 sm:gap-x-20 lg:grid-cols-3">
            {differences.map((d, i) => (
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
