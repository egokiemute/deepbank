"use client";
import React, { useEffect } from "react";
import InputField from "../../ui/InputField";
import { useFormik } from "formik";
import { userDetailsValidationSchema } from "@/lib/validations/userValidations";
import Button from "../../ui/Button";
import SelectField from "../../ui/SelectField";
import { ChevronDown, CircleAlert } from "lucide-react";
import CountryCodesModal from "../../modals/CountryCodesModal";
import { skillset } from "@/utils/contents/AuthPages.content";
import { useCountryCodeModal } from "@/store/Modals";
// import { profilePictureRoute } from "@/utils/Routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdateUser } from "@/hooks/user/useUser";
import { profilePictureRoute } from "@/utils/Routes";
import { useSession } from "next-auth/react";

interface IUserDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  skillset: string;
}

const UserDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  const email = searchParams.get("email") || session.data?.user.email;

  const { isModalOpen, openModal, countryCode } = useCountryCodeModal();
  const { mutate, isPending, isSuccess } = useUpdateUser();

  //   console.log(countryCode);

  const formik = useFormik<IUserDetails>({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      skillset: "",
    },
    validationSchema: userDetailsValidationSchema,
    onSubmit: (values) => {
      const { firstName, lastName, skillset } = values;
      const phone = countryCode.code + values.phoneNumber.trim();
      if (email)
        mutate({
          email,
          firstname: firstName,
          lastname: lastName,
          skillSet: skillset,
          phone,
        });
    },
  });

  useEffect(() => {
    if (isSuccess && email) {
      router.push(`${profilePictureRoute}?email=${email}`);
    }
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          name="firstName"
          label="First name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.firstName && formik.errors.firstName
              ? formik.errors.firstName
              : null
          }
        />

        <InputField
          name="lastName"
          label="Last name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.lastName && formik.errors.lastName
              ? formik.errors.lastName
              : null
          }
        />

        {/* <div>
          <div>
            <div>dd</div>
          </div>

          <InputField
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? formik.errors.phoneNumber
                : null
            }
          />
        </div> */}

        <div className="flex flex-col gap-2">
          <label className="label-class" htmlFor="email">
            Phone number
          </label>
          <div className="relative flex w-full justify-center gap-1">
            <div className="input-class flex w-1/4 items-center justify-center px-1 xs:px-3">
              <div
                onClick={openModal}
                className="flex h-8 w-full max-w-[80px] cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#FFFFFFFA] px-3 py-1 text-title-sm font-bold hover:bg-[#0000001A]"
              >
                <span>{countryCode.abb}</span>
                <span>
                  <ChevronDown size={16} />
                </span>
              </div>
            </div>
            <input
              onBlur={formik.handleBlur}
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber.trim()}
              onChange={formik.handleChange}
              className={`input-class w-3/4 ${
                formik.errors.phoneNumber &&
                formik.touched.phoneNumber &&
                "border-2 border-text-negative bg-[#CC18180F] text-text-negative"
              }`}
            />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="-mt-1 flex items-center gap-1 text-title-sm font-bold text-text-negative">
              <CircleAlert size={16} />
              {/* <span>Field can&apos;t be empty</span> */}
              <span>{formik.errors.phoneNumber}</span>
            </div>
          )}
        </div>

        <SelectField
          value={formik.values.skillset}
          name="skillset"
          label="Skill set"
          options={skillset}
          onChange={(e) => formik.setFieldValue("skillset", e.target.value)}
          onBlur={formik.handleBlur}
          error={
            formik.touched.skillset && formik.errors.skillset
              ? formik.errors.skillset
              : null
          }
        />

        <Button
          css="mt-2"
          style="primary"
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          Continue
        </Button>
      </form>
      {isModalOpen && <CountryCodesModal />}
    </>
  );
};

export default UserDetails;
