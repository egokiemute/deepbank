import React from "react";
import Logo from "./ui/Logo";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import { RxLinkedinLogo } from "react-icons/rx";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-fill-strong py-12 text-text-weakInverse sm:py-24">
      <section className="">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:gap-24">
            <div className="mb-8 flex">
              <Logo type="white" />
            </div>
            <div className="grid w-full grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
              <div className="w-full">
                <h4 className="mb-3 text-white">Company</h4>
                <div className="flex flex-col gap-3 text-paragraph-md xs:text-paragraph-lg">
                  <Link href="#">About</Link>
                  <Link href="#">Career</Link>
                </div>
              </div>

              <div className="w-full">
                <h4 className="mb-3 text-white">Explore</h4>
                <div className="flex flex-col gap-3 text-paragraph-md xs:text-paragraph-lg">
                  <Link href="#">Activities</Link>
                  <Link href="#">Resources</Link>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-white">Host</h4>
                <div className="flex flex-col gap-3 text-paragraph-md xs:text-paragraph-lg">
                  <Link href="#">List your space</Link>
                  <Link href="#">Flex Enablers</Link>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-white">Locations</h4>
                <div className="flex flex-col gap-3 text-paragraph-md xs:text-paragraph-lg">
                  <Link href="#">Warri</Link>
                  <Link href="#">Asaba</Link>
                  <Link href="#">Benin City</Link>
                  <Link href="#">Port-harcourt</Link>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-white">Support</h4>
                <div className="flex flex-col gap-3 text-paragraph-md xs:text-paragraph-lg">
                  <Link href="#">Help Center</Link>
                  <Link href="#">Trust and Safety </Link>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-white">Company</h4>
                <div className="flex flex-col gap-3 text-paragraph-md xs:text-paragraph-lg">
                  <div className="flex items-center gap-1">
                    <div>
                      <Mail size={16} className="" />
                    </div>
                    <Link href="#" className="underline underline-offset-4">
                      chidera@flextable.co
                    </Link>
                  </div>
                  <div className="flex items-center gap-1">
                    <div>
                      <Phone size={16} />
                    </div>
                    <Link className="whitespace-nowrap" href="#">
                      +234 704 034 0319
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-t-[#E6E6E6] pt-6 sm:flex-row sm:justify-between">
            <div className="flex gap-6 text-icon-strong-inverse sm:order-2">
              <Link href="#">
                <Instagram size={24} />
              </Link>
              <Link href="#">
                <RiTwitterXFill size={24} />
              </Link>
              <Link href="#">
                <RxLinkedinLogo size={24} />
              </Link>
              <Link href="#">
                <FaFacebook size={24} />
              </Link>
            </div>
            <div className="flex gap-8 underline underline-offset-4 sm:order-1">
              <Link href="#">Privacy</Link>
              <Link href="#">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
