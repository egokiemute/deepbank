import Image from "next/image";
import React from "react";

export default function PageLoading() {
  return (
    <div className="bg-white fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen items-center justify-center">
      <Image
        src="/loader.gif"
        height={500}
        width={500}
        alt="loader"
        className="object-contain"
        unoptimized
      />
    </div>
  );
}
