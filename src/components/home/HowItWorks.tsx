"use client";
import React, { useEffect, useRef } from "react";
import BlueSubTitle from "../ui/SubTitle";
import HowCard from "../ui/HowCard";
// import { useInView } from "react-intersection-observer";
import { howItWorks } from "@/utils/contents/HomePage.content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      { height: 0 },
      {
        height: "481px",
        scrollTrigger: {
          trigger: circle1Ref.current,
          start: "top center", // Starts when the top of the circle reaches the center of the viewport
          end: "bottom center", // Ends when the bottom of the circle reaches the center of the viewport
          scrub: true,
        },
      },
    );

    // Circle 2 color change when line 1 fluid reaches it
    gsap.to(circle2Ref.current, {
      backgroundColor: "#0a26ff",
      scrollTrigger: {
        trigger: circle1Ref.current,
        start: "bottom center", // Starts when the bottom of the line reaches the center of the viewport
        end: "bottom top", // Ends when the bottom of the line reaches the top of the viewport
        scrub: true,
      },
    });

    // Line 2 fluid animation
    gsap.fromTo(
      line2Ref.current,
      { height: 0 },
      {
        height: "481px",
        scrollTrigger: {
          trigger: line1Ref.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      },
    );

    // Circle 3 color change when line 2 fluid reaches it
    gsap.to(circle3Ref.current, {
      backgroundColor: "#0a26ff",
      scrollTrigger: {
        trigger: line2Ref.current,
        start: "bottom center",
        end: "bottom top",
        scrub: true,
      },
    });

    // Circle 1 initial color change
    gsap.to(circle1Ref.current, {
      backgroundColor: "#0a26ff",
      scrollTrigger: {
        trigger: circle1Ref.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      id="howItWorks"
      className="mt-28 flex flex-col items-center max-sm:hidden"
    >
      {/* Circle 1 */}
      <div
        ref={circle1Ref}
        className="h-[50px] w-[50px] rounded-full bg-fill-blueWeak"
      ></div>

      {/* Line 1 */}
      <div className="relative h-[481px] w-[4px] bg-fill-blueWeak">
        <div
          ref={line1Ref}
          className="bg[#007bff] absolute top-0 w-[4px] bg-[#0A26FF]"
        ></div>
      </div>

      {/* Circle 2 */}
      <div
        ref={circle2Ref}
        className="bg-textblue h-[50px] w-[50px] rounded-full bg-fill-blueWeak"
      ></div>

      {/* Line 2 */}
      <div className="relative h-[481px] w-[4px] bg-fill-blueWeak">
        <div
          ref={line2Ref}
          className="bg[#007bff] absolute top-0 w-[4px] bg-[#0A26FF]"
        ></div>
      </div>

      {/* Circle 3 */}
      <div
        ref={circle3Ref}
        className="h-[50px] w-[50px] rounded-full bg-fill-blueWeak"
      ></div>
    </div>
  );
};

// export default ScrollAnimation;

const HowItWorks = () => {
  return (
    <section className="pb-20 sm:pt-8">
      <div className="container">
        <div className="flex justify-center sm:mt-8">
          <BlueSubTitle text="Your experience" />
        </div>

        <div className="mx-auto max-w-xl">
          <h2 className="mt-4 text-center text-heading-sm font-bold text-text-strong sm:text-display-sm">
            How it works
          </h2>

          <p className="mt-2 text-center text-paragraph-lg leading-7 sm:text-title-lg">
            A simple and rewarding checkout experience your customers love. No
            account, routing, or microdeposits needed. As simple as Venmo or
            Zelle.
          </p>
        </div>

        <div className="mx-auto mt-12 flex gap-8 sm:max-w-4xl">
          <ScrollAnimation />
          <div className="flex h-full w-full flex-col gap-[52px] sm:gap-[100px]">
            {howItWorks.map((h, i) => (
              <HowCard
                image={h.image}
                step={i + 1}
                text={h.text}
                title={h.title}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
