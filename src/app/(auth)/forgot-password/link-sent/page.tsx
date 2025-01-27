"use client";
import Button from "@/components/ui/Button";
import { loginRoute } from "@/utils/Routes";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  return (
    <div className="mt-24 flex flex-col items-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#F15A2A0F]">
        <Mail size={48} className="text-[#F15A2AAD]" />
      </div>
      <h2 className="text-center">Check your email</h2>
      <p className="mb-8 mt-2 text-center">
        If an account exists for the email address submitted,
        hel...era@gmail.com, you will receive a password reset link.
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
