"use client";

import SubTitle from "../ui/SubTitle";
import Gallery from "../ui/gallery";

export default function Categories() {
  return (
    <section className="py-[57px] md:py-[74px]">
      <div className="container mx-auto">
        <div className="mx-auto max-w-5xl">
          <div className="my-6 flex items-center justify-center">
            <SubTitle text="Our categories" theme="purple" />
          </div>
          <h2 className="mb-4 text-center text-[24px] font-bold md:mb-2 md:text-[40px] lg:mb-2 lg:text-[40px]">
            Every space belongs on Flextable
          </h2>
          <p className="mb-14 text-center text-[16px] leading-[28px] md:text-[20px] lg:text-[20px]">
            Spaces of all shapes, styles, and sizes do well on Flextable-from
            empty storefronts to industrial lofts. After all, it’s the diversity
            of options that makes Flextable special.
          </p>
        </div>
        <Gallery />
      </div>
    </section>
  );
}
