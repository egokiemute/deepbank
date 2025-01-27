import { spaceSlugPage } from "@/utils/Routes";
import Image from "next/image";
import React, { FC, useState, useEffect, useRef } from "react";
import { BsStarFill } from "react-icons/bs";
import gsap from "gsap";
import { useRouter } from "next/navigation";

interface SpaceCardProps {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  city?: string;
  state?: string;
  street?: string;
  price?: number;
  images?: { url: string }[];
}

const SpaceCard: FC<SpaceCardProps> = ({
  _id,
  name,
  slug,
  street,
  city,
  state,
  price,
  description,
  images,
}) => {
  const [activePicture] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
      );
    }
  }, [activePicture]);

  const pictures = images || [];

  const gotoSpace = (slug: string, id: string) => {
    router.push(spaceSlugPage(slug, id));
  };

  return (
    <div
      onClick={() => gotoSpace(slug, _id)}
      className="h-[549px] w-full max-w-[373px] cursor-pointer overflow-hidden rounded-lg bg-white p-2"
    >
      <div
        className="relative h-[281px] w-full overflow-hidden rounded-lg"
        ref={imageRef}
      >
        {pictures.length > 0 ? (
          <Image
            src={pictures[0].url}
            height={1000}
            width={1000}
            alt={`Image of ${name}`}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <Image
            src="/images/space.jpg"
            height={1000}
            width={1000}
            alt="space"
            className="h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {/* {pictures.map((_, index) => (
            <div
              onClick={() => setActivePicture(index)}
              key={index}
              className={`h-[8px] cursor-pointer backdrop-blur-md duration-150 ${
                activePicture === index
                  ? "w-6 rounded-xl bg-gray-100"
                  : "w-[8px] rounded-full bg-gray-300"
              }`}
            ></div>
          ))} */}
        </div>
      </div>

      <div className="mt-6 cursor-pointer">
        <h3 className="text-text-strong">{name}</h3>
        <p className="line-clamp-1 text-paragraph-lg">
          {street}, {city}, {state}.
        </p>

        <div className="mt-2 flex items-start gap-2">
          <div className="flex gap-1 text-[#FBB03B]">
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
          </div>
          <div className="text-text-strong">
            <span className="text-title-md font-bold">3.5 </span>
            <span className="text-paragraph-sm underline">(23 reviews)</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="line-clamp-2 text-paragraph-lg leading-6">
            {description}
          </p>

          <h5 className="mt-6 text-title-md font-bold text-text-strong">
            &#8358;{price} per day
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
