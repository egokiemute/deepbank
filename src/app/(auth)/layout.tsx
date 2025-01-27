"use client";
import LogoThumbnail from "@/components/ui/LogoThumbnail";
import { useResetState } from "@/hooks/useResetState.hook";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  useResetState();
  //   console.log(pathname);

  return (
    <div className="flex h-screen bg-white">
      <div className="hide-scroll h-full flex-1 overflow-auto pb-20">
        <section className="container px-4 pt-16 md:pt-8 lg:px-16">
          <div className="flex">
            <LogoThumbnail type="black" />
          </div>
          <div className="mx-auto mt-8 max-w-96 lg:mt-16">{children}</div>
        </section>
      </div>

      <div className="hidden h-full flex-1 md:block">
        {pathname === "/register" ? (
          <div className="h-full">
            <Image
              className="h-full object-cover transition"
              src="/images/sign-up-Image.svg"
              alt="Image"
              height={1000}
              width={1000}
            />
          </div>
        ) : (
          <div>
            <div
              style={{
                backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/images/sign-in-Image.svg')
  `,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-screen px-8 py-14 xl:px-14"
            >
              <div className="mx-auto flex h-full max-w-5xl flex-col justify-end text-text-strongInverse">
                <p className="text-heading-sm 2xl:text-heading-lg">
                  “We&apos;ve been using Flextable for about 2 years and I must
                  say that It&apos;s been an incredible journey. We&apos;ve had
                  a significant increase in revenue, and I can&apos;t imagine
                  the coming years without it.”
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <h3>Thename Unknown</h3>
                    <p>Founder, SkysenxHub</p>
                  </div>
                  <div className="flex gap-4 xl:gap-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-stroke-strongInverse">
                      <ArrowLeft size={24} />
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-stroke-strongInverse">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
