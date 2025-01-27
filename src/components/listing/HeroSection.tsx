"use client";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { registerRoute } from "@/utils/Routes";
import Image from "next/image";

export default function HeroSection() {
      const router = useRouter();
      const gotoRegister = () => {
        router.push(registerRoute);
      };
  return (
    <section className="min-h-screen pb-12 pt-44 sm:pb-16 md:pt-64">
      <div className="container mx-auto">
        <div className="mx-auto flex flex-col items-center">
          <h1 className="text-center text-heading-lg font-bold leading-10 text-text-strong sm:text-display-lg sm:leading-[64px]">
            {" "}
            Turn Idle spaces into Active <br />Workspaces
          </h1>
          <p className="mt-4 text-center text-paragraph-lg max-w-xl">
            Turn your space into a money maker! List your space with us and get
            paid while helping professionals find their perfect spot to get
            things done.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Button
              style="primary"
              type="button"
              css="w-[328px] h-[56px] md:w-[164px] md:h-[54px]"
              fn={gotoRegister}
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 h-[291px] w-full xs:h-[454px]">
          <Image
            width={1500}
            height={500}
            src="/images/listing-hero-bg.svg"
            alt="illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
