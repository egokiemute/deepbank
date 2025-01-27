"use client";
import OtpForm from "@/components/forms/register/OtpForm";
import GoBack from "@/components/ui/GoBack";
import { useSendOtp } from "@/hooks/useAuthHooks";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { mutate, isPending } = useSendOtp();

  const handleResend = () => {
    if (email) {
      mutate({ email });
    }
  };

  return (
    <div className=" ">
      <div className="mb-8">
        <GoBack />
        <h2 className="mt-8">Verify your email</h2>
        <p className="mt-2">
          A code has been sent to <strong>{email || "your email"}</strong>.
          Enter it below to complete your signup.
        </p>
      </div>
      <OtpForm />

      <div className="mt-8">
        <p className="text-center">
          Didn&apos;t receive a code.{" "}
          {!isPending && (
            <span
              onClick={handleResend}
              className="cursor-pointer font-bold text-text-strong underline underline-offset-2"
            >
              Resend
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
