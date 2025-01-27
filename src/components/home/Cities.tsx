"use client";
import Button from "../ui/Button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { spacesPage } from "@/utils/Routes";

const Cities = () => {
  const places = ["Effurun", "Warri", "Asaba", "Benin City", "Port harcourt"];
  const router = useRouter();
    const gotoSpaces = () => {
      router.push(spacesPage);
    };
  return (
    <section className="mb-20 bg-fill-strong max-md:px-0">
      <div className="container relative flex h-[850px] items-center overflow-hidden md:h-[763px]">
        <div className="flex flex-1 flex-col justify-center text-[120px] font-bold text-text-strongInverse max-md:-ml-8">
          {places.map((p, i) => (
            <span key={i} className="inline-block whitespace-nowrap">
              {p}
            </span>
          ))}
        </div>
        <div className="absolute right-0 px-4 max-md:left-0 md:right-[10%]">
          <div className="mx-auto max-w-[392px] rounded-xl bg-fill-strong p-6 text-white max-xs:max-w-[326px]">
            <p className="mb-8 font-bold leading-[64px] max-xs:text-display-sm max-xs:leading-[48px] xs:text-display-lg">
              10 cities, <br /> 1,000 users, <br /> and growing!
            </p>
            <Button fn={gotoSpaces} style="secondary" type="button">
              <div className="flex items-end">
                <span className="inline-block">Find a space near you</span>
                <MdOutlineKeyboardArrowRight size={20} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cities;
