import SelectRole from "@/components/forms/register/SelectRole";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="mb-8">
        <h2>Let&apos;s get you started</h2>
        <p className="mt-2">
          Let&apos;s start by choosing the account you&apos;ll be signing up as:
        </p>
      </div>
      <SelectRole />
    </div>
  );
}
