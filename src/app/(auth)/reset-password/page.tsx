
import ResetPassword from "@/components/forms/ResetPassword";
// import GoBack from "@/components/ui/GoBack";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="mt-[176px] mb-[32px]">
        <h2 className="mt-8">Change password</h2>
        <p className="mt-2">
          Set up a new password for your Flextable account. Your password should
          include a character, number and symbol.
        </p>
      </div>

      <ResetPassword />
    </div>
  );
}
