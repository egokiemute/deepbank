"use client"
import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  isAddYours?: boolean;
}

 export const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, isAddYours = false }) => {
  if (isAddYours) {
    return (
      <div className="relative rounded-2xl bg-purple-50 aspect-square flex items-center justify-center cursor-pointer hover:bg-purple-100 transition-colors">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full border-2 border-dashed border-purple-500 flex items-center justify-center">
            <span className="text-2xl text-purple-500">+</span>
          </div>
          <span className="text-purple-500 font-medium">Add yours</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square group cursor-pointer">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
        {title}
      </h3>
    </div>
  );
};
