import UserDetails from "@/components/forms/register/UserDetails";
import GoBack from "@/components/ui/GoBack";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <GoBack />
        <h2 className="mt-8">Next, fill in some details</h2>
        <p className="mt-2">
          Provide your details below, it will only take a few moment.
        </p>
      </div>

      <UserDetails />

      <div className="mt-8">
        <p className="text-title-md">
          By continuing, I agree to Flextable&apos;s{" "}
          <Link href="#">
            <strong className="text-[#F15A2A] underline underline-offset-2">
              Terms of Service
            </strong>
          </Link>{" "}
          and acknowledge it&apos;s{" "}
          <Link href="#">
            <strong className="text-[#F15A2A] underline underline-offset-2">
              Privacy Policy
            </strong>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
