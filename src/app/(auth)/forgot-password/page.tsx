import ForgotPassword from "@/components/forms/ForgotPassword";
import GoBack from "@/components/ui/GoBack";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="mb-8">
        <GoBack />
        <h2 className="mt-8">Forgot password?</h2>
        <p className="mt-2">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <ForgotPassword />
    </div>
  );
}
