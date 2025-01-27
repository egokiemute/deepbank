"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { FC, useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

interface IProps {
  question: string;
  answer: string;
}

const FaqListItem: FC<IProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        // Open animation
        gsap.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            overflow: "hidden",
          },
        );
      } else {
        // Close animation
        gsap.fromTo(
          contentRef.current,
          { height: contentRef.current.scrollHeight, opacity: 1 },
          {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            overflow: "hidden",
          },
        );
      }
    }
  }, [open]);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`cursor-pointer rounded-xl px-4 py-5 ${
        open ? "bg-icon-strong-inverse" : "bg-fill-weaker"
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-title-sm font-bold text-text-strong xs:text-title-md">
          {question}
        </h4>
        <div>
          {!open ? (
            <ChevronDown
              size={22}
              className="text-icon-neutral transition-transform duration-500"
              strokeWidth={2.5}
            />
          ) : (
            <ChevronUp
              size={22}
              className="text-icon-neutral transition-transform duration-500"
              strokeWidth={2.5}
            />
          )}
        </div>
      </div>

      <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
        <div className="mt-3">
          <p className="text-paragraph-md leading-6">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqListItem;
