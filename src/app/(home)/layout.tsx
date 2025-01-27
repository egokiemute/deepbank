"use client";

import { useFetchUser } from "@/hooks/user/useUser";
import { useResetState } from "@/hooks/useResetState.hook";
import { selectRoleRoute } from "@/utils/Routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  const router = useRouter();
  const { data } = useFetchUser(session.data?.user.email || "");

//   console.log(data?.role);

//   console.log("hello");

  useEffect(() => {
    if (session && data && !data.role ) {
      router.push(selectRoleRoute || "/");
    }
  }, [data]);
  // Automatically resets modals on route change or page refresh
  useResetState();

  return <>{children}</>;
}
