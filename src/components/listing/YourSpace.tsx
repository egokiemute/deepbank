"use client";
import Image from "next/image";
import SubTitle from "../ui/SubTitle";

export default function YourSpace() {
  return (
    <section className="py-14 sm:py-28">
      <div className="container mx-auto">
        {/* <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]"> */}
        <div className="flex justify-center md:hidden">
          <SubTitle text="Your space, your rules" theme="purple" />
        </div>
        <div className="flex justify-center gap-12 max-md:mt-6 max-md:flex-col max-md:gap-6">
          <div className="h-[305px] w-full max-w-[415px] rounded-xl max-md:mx-auto sm:h-[416px]">
            <Image
              width={500}
              height={500}
              src="/images/YourSpaceGuy.png"
              alt="this is an image of a man on a skyblue background"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex max-w-[700px] flex-1 flex-col gap-4">
            <div className="max-md:hidden">
              <SubTitle text="Empower locals" theme="purple" />
            </div>
            {/* <h2 className="text-center text-[24px] leading-relaxed text-black md:text-right md:text-[48px] md:leading-none lg:text-start lg:text-[48px]"> */}
            <h2 className="max-md:text-center">
              Make Your Space a Glocal{" "}
              <span className="text-text-weak">Landmark for Productivity.</span>
            </h2>
            <p className="max-md:text-center">
              Turn your space into a go-to spot for creators, professionals, and
              innovators. By listing it on Flextable, you'll attract local and
              global guests who are ready to boost their productivity in a space
              like yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
