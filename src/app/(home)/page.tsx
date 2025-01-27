"use client";
import Building from "@/components/home/Building";
import Cities from "@/components/home/Cities";
import Differences from "@/components/home/Differences";
import Faq from "@/components/home/Faq";
import FlexEnabler from "@/components/home/FlexEnabler";
import Footer from "@/components/Footer";
import Hero from "@/components/home/hero/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Header from "@/components/Header";

export default function Home() {


  return (
    <>
      <Header />
      <Hero />
      <Building />
      <Differences />
      <Cities />
      <HowItWorks />
      <Faq theme="blue" />
      <FlexEnabler />
      <Footer />
    </>
  );
}
