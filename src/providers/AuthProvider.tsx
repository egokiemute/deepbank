"use client";
import PageLoading from "@/components/ui/PageLoading";
import { useResetState } from "@/hooks/useResetState.hook";
import { loginRoute } from "@/utils/Routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  const router = useRouter();
  useResetState();
  console.log(session);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace(loginRoute);
    }
  }, [router, session.status]);

  if (session.status === "loading") {
    return <PageLoading />;
  }

  return <div>{children}</div>;
}
