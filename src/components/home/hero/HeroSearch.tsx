"use client";
import Button from "@/components/ui/Button";
import { useAllFetchSpaces } from "@/hooks/admin/useAdmin";
import { useVariables } from "@/store/variables";
import { ISpace } from "@/types";
import { spacesPage } from "@/utils/Routes";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const HeroSearch = () => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const { setCategory: setCat, setCity, setDay: setD } = useVariables();
  const [locationCard, setLocationCard] = useState(false);
  const [categoryCard, setCategoryCard] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { data, isLoading } = useAllFetchSpaces();

  const city: string[] = Array.from(
    new Set(data?.data?.map((l: ISpace) => l.city)),
  );
  const types: string[] = Array.from(
    new Set(data?.data?.map((l: ISpace) => l.category)),
  );

const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedDate = e.target.value;
  setDate(selectedDate);

  // Extract the day of the week if a valid date is selected
  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    setDay(daysOfWeek[dateObj.getDay()]);
  } else {
    setDay(""); // Clear the day if the date is cleared
  }
};

  console.log(city, types, day);


  useEffect(() => {
    if (locationCard) {
      gsap.fromTo(
        dropdownRef.current,
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    } else {
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [locationCard]);

  const handleLocationSelect = (value: string) => {
    setLocation(value);
    setLocationCard(false);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setCategoryCard(false);
  };

  const gotoSearch = () => {
    // const route = `${spacesPage}?location=${location}&category=${category}&date=${date}`;
    setCat(category);
    setCity(location);
    setD(day);
    router.push(spacesPage);
  };

  if (isLoading) return <div></div>;

  return (
    <>
      <div className="mx-auto mt-10 flex min-h-[96px] max-w-[777px] flex-col justify-between gap-6 rounded-2xl border border-stroke-weak bg-white p-6 md:flex-row md:items-center">
        <div className="relative md:w-2/4">
          <label className="title-sm block px-1 font-bold text-text-weak">
            Where
          </label>
          <div
            className="cursor-pointer bg-white px-1 text-paragraph-lg text-[#000000A3] focus:outline-none"
            onClick={() => {
              setLocationCard((prev) => !prev);
              setCategoryCard(false);
            }}
          >
            {location || "Choose a location"}
          </div>
          {locationCard && (
            <div
              ref={dropdownRef}
              className="absolute -right-4 top-14 z-20 w-[224px] rounded-2xl border border-[#0000001A] bg-white shadow-overlay xs:-right-7 xs:top-20"
            >
              {city?.map((c: string, i: number) => (
                <div
                  key={i}
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => handleLocationSelect(c)}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category */}
        <div className="relative md:w-2/4">
          <label className="title-sm block px-1 font-bold text-text-weak">
            Category
          </label>
          <div
            className="cursor-pointer bg-white px-1 text-paragraph-lg text-[#000000A3] focus:outline-none"
            onClick={() => {
              setCategoryCard((prev) => !prev);
              setLocationCard(false);
            }}
          >
            {category || "Choose a category"}
          </div>
          {categoryCard && (
            <div
              // ref={dropdownRef}
              className="absolute -right-4 top-14 w-[224px] rounded-2xl border border-[#0000001A] bg-white shadow-overlay xs:-right-7 xs:top-20"
            >
              {types?.map((t: string, i: number) => (
                <div
                  key={i}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => handleCategory(t)}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div className="md:w-2/4">
          <label className="title-sm block px-1 font-bold text-text-weak">
            Type of spaces
          </label>
          <input
            value={friends}
            onChange={(e) => setFriends(e.target.value)}
            placeholder="Coworking, Restaurant, etc"
            className="rounded-lg px-1 text-paragraph-lg text-text-strong focus:outline-none"
          />
        </div> */}
        <div className="md:w-1/4">
          <label className="title-sm block px-1 font-bold text-text-weak">
            When
          </label>
          <input
            value={date}
            onChange={handleDateChange}
            type="text"
            placeholder="Pick a date"
            className="rounded-lg px-1 text-paragraph-lg text-text-strong focus:outline-none"
            onFocus={(e) => {
              e.target.type = "date";
              setCategoryCard(false);
              setLocationCard(false);
            }}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>

        <Button fn={gotoSearch} style="primary" type="button">
          Search
        </Button>
      </div>
    </>
  );
};

export default HeroSearch;
