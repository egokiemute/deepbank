"use client";
import Button from "../ui/Button";
import Image from "next/image";
import SubTitle from "../ui/SubTitle";
// import { useInView } from "react-intersection-observer";

// const { useInView } = require("react-intersection-observer");

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const circle3Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Line 1 fluid animation
    gsap.fromTo(
      line1Ref.current,
      { width: 0 },
      {
        width: "240px",
        scrollTrigger: {
          trigger: circle1Ref.current,
          start: "top center", // Start when the top of the circle reaches the center
          end: "bottom center", // End when the bottom of the circle reaches the center
          scrub: true,
          toggleActions: "play reverse play reverse", // Play and reverse the animation
          // markers: true, // For debugging (optional)
        },
      },
    );

    // Circle 2 color change when line 1 fluid reaches it
    gsap.to(circle2Ref.current, {
      backgroundColor: "#9327DB",
      scrollTrigger: {
        trigger: line1Ref.current,
        start: "bottom center", // Start when the bottom of the line reaches the center
        end: "bottom top", // End when the bottom of the line reaches the top
        scrub: true,
        toggleActions: "play reverse play reverse",
        // markers: true, // For debugging (optional)
      },
    });

    // Line 2 fluid animation
    gsap.fromTo(
      line2Ref.current,
      { width: 0 },
      {
        width: "240px",
        scrollTrigger: {
          trigger: circle2Ref.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          toggleActions: "play reverse play reverse",
          // markers: true, // For debugging (optional)
        },
      },
    );

    // Circle 3 color change when line 2 fluid reaches it
    gsap.to(circle3Ref.current, {
      backgroundColor: "#9327DB",
      scrollTrigger: {
        trigger: circle1Ref.current,
        start: "bottom center",
        end: "bottom top",
        scrub: true,
        toggleActions: "play reverse play reverse",
        // markers: true, // For debugging (optional)
      },
    });

    // Circle 1 initial color change
    gsap.to(circle1Ref.current, {
      backgroundColor: "#9327DB",
      scrollTrigger: {
        trigger: circle1Ref.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        toggleActions: "play reverse play reverse",
        // markers: true, // For debugging (optional)
      },
    });
  }, []);

  return (
    <div id="howItWorks" className="flex items-center max-sm:hidden">
      {/* Circle 1 */}
      <div
        ref={circle1Ref}
        className="h-[50px] w-[50px] rounded-full bg-[#9327DB3D]"
      ></div>

      {/* Line 1 */}
      <div className="relative h-[4px] w-[240px] bg-[#9327DB3D]">
        <div
          ref={line1Ref}
          className="absolute left-0 h-[4px] bg-[#9327DB]"
        ></div>
      </div>

      {/* Circle 2 */}
      <div
        ref={circle2Ref}
        className="bg-textblue h-[50px] w-[50px] rounded-full bg-[#9327DB3D]"
      ></div>

      {/* Line 2 */}
      <div className="relative h-[4px] w-[240px] bg-[#9327DB3D]">
        <div
          ref={line2Ref}
          className="absolute left-0 h-[4px] bg-[#9327DB]"
        ></div>
      </div>

      {/* Circle 3 */}
      <div
        ref={circle3Ref}
        className="h-[50px] w-[50px] rounded-full bg-[#9327DB3D]"
      ></div>
    </div>
  );
};

// export default ScrollAnimation;

export default function HowListingWorks() {
  return (
    <section className="w-full bg-[#9327DB0F] py-[59px] sm:py-[75px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <SubTitle text="Your Experience" theme="purple" />

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <h2 className="mb-3 text-[24px] font-bold sm:text-[40px]">
              How listing works
            </h2>
            <p className="mb-10 text-[16px] leading-loose md:text-[20px] lg:text-[20px]">
              A simple and rewarding checkout experience your customers love. No
              account, routing, or microdeposits needed. As simple as Venmo or
              Zelle.
            </p>
          </div>

          <div className="mb-[40px] w-full md:mb-[90px]">
            <ScrollAnimation />
          </div>

          <div className="grid w-full grid-cols-1 gap-[48px] md:grid-cols-3 lg:grid-cols-3">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex flex-col items-center md:items-start"
              >
                <div className="h-[58.42px] w-[64.92px] sm:h-[123px] sm:w-[110px]">
                  <Image
                    src="/images/howhand.svg"
                    height={100}
                    width={100}
                    alt="hand holding a phone"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex flex-col items-start max-sm:items-center">
                  <h5 className="text-title-xs font-bold text-text-strong max-sm:mt-8 max-sm:text-center">
                    Step {step}
                  </h5>
                  <h3 className="mb-2 mt-1 text-title-lg font-bold text-text-strong max-sm:text-center">
                    {step === 1 && "Search for Spaces"}
                    {step === 2 && "Book a space"}
                    {step === 3 && "Manage your space"}
                  </h3>
                  <p className="mb-6 mt-2 max-w-sm leading-[28px] max-sm:text-center">
                    {step === 1 &&
                      "Explore our wide range of Spaces and find the one that fits your needs."}
                    {step === 2 &&
                      "Secure your spot in a few simple steps, just select, confirm, and you’re all set."}
                    {step === 3 &&
                      "Take charge of your bookings, easily renew your Subscription, drop your reviews and Flex."}
                  </p>

                  <Button style="primary" type="button">
                    Create Account
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
