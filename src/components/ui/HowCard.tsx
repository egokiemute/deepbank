import Image from "next/image";
import React, { FC } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { registerRoute } from "@/utils/Routes";

interface IHow {
  title: string;
  text: string;
  image: string;
  step: number;
}

const HowCard: FC<IHow> = ({ text, title, image, step }) => {
      const router = useRouter();
      const gotoRegister = () => {
        router.push(registerRoute);
      };
  return (
    <div className="w-full items-center justify-between sm:flex sm:flex-row-reverse sm:gap-[50px]">
      <div className="h-[347px] sm:h-[418px]">
        <Image
          src={image}
          height={300}
          width={300}
          alt="hand holding a phone"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-col items-start max-sm:items-center">
        <h5 className="text-title-xs font-bold text-text-strong max-sm:mt-8 max-sm:text-center">
          Step {step}
        </h5>
        <h3 className="mb-2 mt-1 text-title-lg font-bold text-text-strong max-sm:text-center">
          {title}
        </h3>
        <p className="mb-6 mt-2 max-w-sm leading-[28px] max-sm:text-center">
          {text}
        </p>

        <Button style="primary" type="button" fn={gotoRegister}>
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default HowCard;
