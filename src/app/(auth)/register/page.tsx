import Register from "@/components/forms/register/Register";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="mb-8">
        <h2>Welcome to Flextable</h2>
        <p className="mt-2">Signing up on Flextable is very easy</p>
      </div>

      <Register />
    </div>
  );
}
