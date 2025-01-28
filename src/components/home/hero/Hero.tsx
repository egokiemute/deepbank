"use client";
import HeroSearch from "./HeroSearch";

const Hero = () => {
  // const session = useSession();
  // console.log(session);
  return (
    <div className="bg-[#FFFFFFF5] pt-52 max-md:h-screen md:min-h-screen">
      <section className="hero-bg h-full w-full md:h-[750px] min-[1660px]:h-screen">
        <div className="container pb-10">
          <div className="mx-auto max-w-[667px] flex flex-col justify-center align-center text-center">
            <h1 className="text-center text-heading-xl font-bold leading-10 text-text-strong sm:text-display-lg sm:leading-[64px]">
              Smart and simple, <br />online banking.
            </h1>
            {/* <p className="mt-8 text-white text-center text-[18px] max-w-sm mx-auto">
              With our secure online banking services, you can manage your
              finances from anywhere, at any time.
            </p> */}
          </div>
          {/* <HeroSearch /> */}
        </div>
      </section>
    </div>
  );
};

export default Hero;
