"use client";
import Space from "@/components/listing/YourSpace";
import Faq from "@/components/home/Faq";
import FlexEnabler from "@/components/listing/FlexEnabler";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/listing/HeroSection";
import FillSpace from "@/components/listing/FillSpace";
import HowListingWorks from "@/components/listing/HowListingWorks";
import Catergories from "@/components/listing/Categories";
import GotYourback from "@/components/listing/GotYourback";

export default function Page() {
  return (
    <>
      <Header />
      <HeroSection />
      <FillSpace />
      <Space />
      <HowListingWorks />
      <Catergories />
      <GotYourback />
      <Faq theme="purple" />
      <FlexEnabler heading="Become a FlexEnabler!" description="Showcase and receive payments for your work and services, sell online, create invoices, manage clients, build a community, and track analytics all in one-place, starting now." />
      <Footer />
    </>
  );
}
