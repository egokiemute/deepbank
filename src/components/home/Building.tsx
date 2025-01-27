import React from "react";
import SubTitle from "../ui/SubTitle";

export default function Building() {
  return (
    <section>
      <div className="container py-8 sm:py-[90px]">
        <div>
          <SubTitle text="Building flextable" theme="blue" />

          <div className="mt-4">
            <p className="text-heading-sm font-bold leading-9 text-text-strong sm:text-display-lg sm:leading-[64px]">
              Search, Book, and Manage workspaces in Minutes.{" "}
              <span className="text-text-weak">
                Frankly, finding the right space should never slow you down.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
