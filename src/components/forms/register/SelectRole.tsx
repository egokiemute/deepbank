"use client";
import { User, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { spaceOwnerDetailsRoute, userDetailsRoute } from "@/utils/Routes";
import { useUpdateUser } from "@/hooks/user/useUser";
import { useSession } from "next-auth/react";

const SelectRole = () => {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || session.data?.user.email;
  const [role, setRole] = useState("");
  const { mutate, isPending, isSuccess } = useUpdateUser();
  // console.log(session?.data?.user);

  const handleContinue = () => {
    if (email) {
      // router.push(role === "user" ? userDetailsRoute : spaceOwnerDetailsRoute);
      mutate({ role, email });
    } else {
      console.error("Email is null");
    }
  };

  useEffect(() => {
    if (isSuccess && email) {
      router.push(
        role === "user"
          ? `${userDetailsRoute}?email=${encodeURIComponent(email)}`
          : `${spaceOwnerDetailsRoute}?email=${encodeURIComponent(email)}`,
      );
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col gap-6">
      <div
        onClick={() => setRole("user")}
        className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 duration-150 ${role === "user" ? "border-[#F15A2AAD] bg-[#F15A2A0F]" : "border-[#00000005] bg-[#00000005]"} p-5`}
      >
        <div className="flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-full bg-[#F15A2A0F]">
          <User size={20} className="text-[#F15A2AAD]" />
        </div>
        <div>
          <h3 className="text-text-strong">User</h3>
          <p>
            Register as a user to reserve list of 10,000+ spaces and more on
            Flextable, becoming a part of our community.
          </p>
        </div>
      </div>

      <div
        onClick={() => setRole("host")}
        className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 duration-150 ${role === "host" ? "border-[#0A26FFAD] bg-[#0A26FF0F]" : "border-[#00000005] bg-[#00000005]"} p-5`}
      >
        <div className="flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-full bg-[#0A26FF0F]">
          <Users size={20} className="text-[#0A26FFAD]" />
        </div>
        <div>
          <h3 className="text-text-strong">Space owner</h3>
          <p>
            List your space on Flextable, for users to book and get paid for it,
            becoming one of our growing partners.
          </p>
        </div>
      </div>

      <Button
        css="w-full"
        disabled={role === ""}
        style={role !== "" ? "primary" : "disabled"}
        type="button"
        loading={isPending}
        fn={handleContinue}
      >
        {" "}
        Continue{" "}
      </Button>
    </div>
  );
};

export default SelectRole;
