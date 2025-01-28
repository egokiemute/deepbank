import React from "react";
import SubTitle from "../ui/SubTitle";

export default function Building() {
  return (
    <section>
      <div className="container py-8 sm:py-[90px]">
        <div>
          <SubTitle text="Why Flinflow" theme="blue" />

          <div className="mt-4">
            <p className="text-heading-sm font-bold leading-9 text-text-strong sm:text-display-lg sm:leading-[64px]">
            Super convenient banking for everyone.{" "}
              <span className="text-text-weak">
                And, using the right bank that would never slow you down.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
