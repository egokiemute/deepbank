import { useAllFetchSpaces } from "@/hooks/admin/useAdmin";
import { Calendar, ChevronDown } from "lucide-react";
// import { Calendar, ChevronDown } from "lucide-react";
import React from "react";

const SearchTab = () => {
  return (
    <div className="flex min-h-8 min-w-[135px] items-center justify-between rounded-[1000px] border border-[#00000066] bg-[#FFFFFF03] px-2 py-2 xs:min-h-12 xs:min-w-[169px] xs:px-4 xs:py-[14px]">
      <Calendar size={16} className="text-[#000D4D73] xs:hidden" />
      <Calendar size={20} className="text-[#000D4D73] max-xs:hidden" />
      <div className="text-title-sm font-bold xs:text-title-md">
        Sat, Feb 10
      </div>
      <ChevronDown size={16} className="xs:hidden" />
      <ChevronDown size={20} className="max-xs:hidden" />
    </div>
  );
};

const Filter = () => {
  const { data } = useAllFetchSpaces();

  // console.log(data);

  return (
    <section className="pb-5 pt-[136px] xs:pb-12 xs:pt-40">
      <div className="container">
        <h2 className="font-normal text-text-weak max-xs:text-title-lg">
          {(data && data?.meta?.totalSpaces) || 0} working spaces
        </h2>

        <div className="mt-6 flex gap-6 max-sm:flex-col sm:items-center">
          <h4 className="text-title-md font-bold text-text-strong">
            Filter your Search:
          </h4>
          <div className="hide-scroll flex gap-6 overflow-auto">
            <SearchTab />
            <SearchTab />
            <SearchTab />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;
