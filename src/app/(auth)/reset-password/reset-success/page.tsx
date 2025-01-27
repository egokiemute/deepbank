"use client";
import Button from "@/components/ui/Button";
import { loginRoute } from "@/utils/Routes";

import { useRouter } from "next/navigation";
import React from "react";
import { FcCheckmark } from "react-icons/fc";

export default function Page() {
  const router = useRouter();
  return (
    <div className="mt-24 flex flex-col items-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#008F000F]">
        <FcCheckmark size={32} className="text-[#008F00AD]" />
      </div>
      <h2 className="text-center">Password changed!</h2>
      <p className="mb-8 mt-2 text-center">
        Your password has been changed successfully, you can now proceed to
        login.
      </p>

      <Button
        fn={() => router.push(loginRoute)}
        style="primary"
        css="w-full"
        type="button"
      >
        Continue to Login
      </Button>
    </div>
  );
}
