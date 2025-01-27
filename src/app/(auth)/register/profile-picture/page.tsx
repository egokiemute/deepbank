"use client";
import ProfilePicture from "@/components/forms/register/ProfilePicture";
import GoBack from "@/components/ui/GoBack";
import React from "react";

export default function Page() {
  return (
    <div className="">
      <div className="mb-8">
        <GoBack />
        <h2 className="mt-8">Almost done</h2>
        <p className="mt-2">
          Choose a profile image for your Flextable account set up.
        </p>
      </div>

      <ProfilePicture  />
    </div>
  );
}
