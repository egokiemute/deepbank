"use client";
import HeroSearch from "./HeroSearch";

const Hero = () => {
    // const session = useSession();
    // console.log(session);
  return (
    <div className="bg-[#FFFFFFF5] pt-40 max-md:h-screen md:min-h-screen">
      <section className="hero-bg h-full w-full md:h-[750px] min-[1660px]:h-screen">
        <div className="container pb-10">
          <div className="mx-auto max-w-[667px]">
            <h1 className="text-center text-heading-lg font-bold leading-10 text-text-strong sm:text-display-lg sm:leading-[64px]">
              Wherever work takes you, we&apos;ll find the space.
            </h1>
            <p className="mt-4 text-center text-paragraph-lg">
              Find the workspace that fits your day, book instantly and settle
              into a space that inspires, whether calm or buzzing with energy.
            </p>
          </div>
          <HeroSearch />
        </div>
      </section>
    </div>
  );
};

export default Hero;
