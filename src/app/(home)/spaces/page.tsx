"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Filter from "@/components/spacePage/Filter";
import Spaces from "@/components/spacePage/AllSpaces";
import { useAllFetchSpaces } from "@/hooks/admin/useAdmin";

export default function Page() {
  const { data } = useAllFetchSpaces("", "");

  console.log(data?.data);

  const stats = data?.meta;

  return (
    <>
      <Header />
      <Filter />
      <Spaces />
      <Pagination
        total={stats?.totalSpaces}
        pageNumber={stats?.page}
        totalPages={stats?.totalPages}
      />
      <Footer />
    </>
  );
}
