"use client";
import React from "react";
import { useAllFetchSpaces } from "@/hooks/admin/useAdmin";
import PageLoading from "@/components/ui/PageLoading";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import SpaceImagesContainer from "@/components/space/SpaceImagesContainer";
import SpaceDescription from "@/components/space/SpaceDescription";
import SpaceHours from "@/components/space/SpaceHours";
import SpaceAmenities from "@/components/space/SpaceAmenities";
import Footer from "@/components/Footer";
import SpaceHeader from "@/components/space/SpaceHeader";
import LoginModal from "@/components/modals/LoginModal";
import BookingModal from "@/components/modals/BookingModal";
import { useBookingModal } from "@/store/Modals";

// export async function generateMetadata({ params }: {params: {slug: string}}) {
//   try {
//     const response = useAllFetchSpaces(params?.slug);
//     console.log(response);
//     if(response?.data.length === 0) {
//       return {
//         title: "Not Found",
//         description: "The page you are looking for does not exist"
//       }
//     }

//     return {
//       openGraph: {
//         title: response?.data
//       }
//     }
//   } catch (error) {
    
//   }
// }

export default function Spaces() {
  const { openModal } = useBookingModal();
  const { slug } = useParams();
  const { data, isLoading } = useAllFetchSpaces(slug as string);

  // console.log(data);

  const operatingHours = data?.operatingHours;

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <Header />
      <section className="min-h-[50vh] pb-20 pt-20 max-xs:pt-1">
        <div className="container">
          <SpaceHeader
            name={data?.name}
            city={data?.city}
            state={data?.state}
            bookSpace={openModal}
            operatingHours={operatingHours}
          />
          <SpaceImagesContainer images={data?.images} spaceName={data?.name} />
          <div className="grid grid-cols-1 gap-6 py-6 pt-4 md:grid-cols-2 md:py-10 md:pt-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SpaceDescription
                spaceName={data?.name}
                description={data?.description}
              />
            </div>
            <SpaceHours hours={operatingHours} />
            <SpaceAmenities amenities={data?.amenities} />
          </div>
        </div>
      </section>
      <Footer />
      <BookingModal />
      <LoginModal />
    </>
  );
}
