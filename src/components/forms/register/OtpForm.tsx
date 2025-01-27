"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import { useOtpVerification } from "@/hooks/useAuthHooks";
import { useSearchParams } from "next/navigation";
// OtpInput component
const OtpForm: React.FC = () => {
  const { mutate, isPending } = useOtpVerification();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // console.log(user);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Backspace") {
      setError(false);
    }
  };

  const renderInputs = () => {
    return otp.map((value, index) => (
      <input
        key={index}
        ref={(ref) => {
          if (ref) inputRefs.current[index] = ref;
        }}
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (/^\d?$/.test(inputValue)) {
            handleChange(index, inputValue); // Allow only numeric input
          }
        }}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className={`input-class h-12 w-12 rounded-lg`}
      />
    ));
  };

  function handleSubmit() {
    const joinedOtp = otp.join("");

    if (otp.includes("")) {
      setError(true);
      return;
    }

    if (email) {
      mutate({ email, otp: joinedOtp });
    } else {
      setError(true);
    }
  }

  return (
    <div className="">
      <div className="bg-ed-800 flex justify-evenly gap-4">
        {renderInputs()}
      </div>
      {error && !otp.includes("") && (
        <div className="text-xs text-error mt-2 text-center">Invalid Otp</div>
      )}
      {!otp.includes("") && (
        <Button
          css="w-full mt-4"
          fn={handleSubmit}
          style="primary"
          type="button"
          loading={isPending}
        >
          Verify
        </Button>
      )}
    </div>
  );
};

export default OtpForm;
