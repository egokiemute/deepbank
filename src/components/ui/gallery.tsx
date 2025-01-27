import { categoryImages } from "@/utils/contents/ListingPage.content";
import React from "react";

interface SpaceGridProps {
  className?: string;
}

const Gallery: React.FC<SpaceGridProps> = ({ className = "" }) => {


  return (
    <div className={`p-4 ${className}`}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {categoryImages.map((space) => (
          <div key={space.title} className="group relative cursor-pointer">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <img
                src={space.imageUrl}
                alt={space.title}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end rounded-lg bg-black bg-opacity-40 p-4">
                <span className="md:text-[20px]lg:text-[20px] text-[12px] font-medium text-white">
                  {space.title}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-[#9327DB0F]">
          <span className="rounded-full border-2 border-gray-300 p-2 text-[9.6px] font-bold text-gray-500 md:text-[16px] lg:text-[16px]">
            + Add place
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
