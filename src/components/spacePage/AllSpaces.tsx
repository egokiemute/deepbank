"use client";
import React from "react";
import SpaceCard from "../ui/SpaceCard";
import { useAllFetchSpaces } from "@/hooks/admin/useAdmin";
import { ISpace } from "@/types";
import PageLoading from "../ui/PageLoading";

export default function AllSpaces() {
  // Fetch spaces based on a specific ID
  const { data, isLoading } = useAllFetchSpaces();
  // const { data, isLoading } = useAllFetchSpaces();
  const spaces = data?.data;
  console.log(data);

  // Handle loading state
  if (isLoading) return <PageLoading />;

  // Check if data is an array before calling map
  const renderSpaces = () => {
    if (Array.isArray(spaces)) {
      return spaces.map((space: ISpace, i: number) => (
        <SpaceCard key={i} {...space} />
      ));
    } else {
      return <div className="text-title-lg">No spaces available</div>;
    }
  };

  return (
    <section className="min-h-[50vh] bg-[#00000005] py-10">
      <div className="container">
        <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          {renderSpaces()}
        </div>
      </div>
    </section>
  );
}
