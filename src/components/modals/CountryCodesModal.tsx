import { useCountryCodeModal } from "@/store/Modals";
import { countryCodes } from "@/utils/contents/AuthPages.content";
import React, { useState } from "react";
import InputField from "../ui/InputField";
import { X } from "lucide-react";

const CountryCodesModal = () => {
  const { closeModal, setCountryCode } = useCountryCodeModal();
  const [country, setCountry] = useState("");

  const handleSelectCountry = (country: {
    country: string;
    code: string;
    abb: string;
  }) => {
    setCountryCode(country);
  };

  const renderCountryCodes = countryCodes
    .filter((c) => c.country.toLowerCase().startsWith(country.toLowerCase()))
    .map((c, i) => (
      <li
        onClick={() => {
          handleSelectCountry(c);
          closeModal();
        }}
        key={i}
        className="cursor-pointer px-6 py-3 duration-150 hover:bg-[#0000000F]"
      >
        {c.country} ({c.code})
      </li>
    ));
  // console.log(renderCountryCodes);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 h-screen bg-[#00000066]">
        <div className="relative flex h-full items-center justify-center px-4">
          <ul className="hide-scroll max-h-[90vh] min-h-[90vh] w-full max-w-[777px] overflow-auto rounded-xl bg-white">
            <div className="flex justify-end px-4 pt-4">
              <X onClick={closeModal} className="cursor-pointer" size={24} />
            </div>
            <div className="mb-3 mt-3 px-4">
              <InputField
                placeholder="Search Country"
                label=""
                name="country"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
            </div>
            {renderCountryCodes.length > 0 ? (
              renderCountryCodes
            ) : (
              <p className="mt-4 px-4 text-title-md">No Country Code Found</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CountryCodesModal;
