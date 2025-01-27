"use client";
import React, { useEffect } from "react";
import InputField from "../../ui/InputField";
import { useFormik } from "formik";
import Button from "../../ui/Button";
import SelectField from "../../ui/SelectField";
import { spaceOwnerDetailsValidationSchema } from "@/lib/validations/userValidations";
import { position } from "@/utils/contents/AuthPages.content";
import { useRouter, useSearchParams } from "next/navigation";
import { profilePictureRoute } from "@/utils/Routes";
import { useUpdateUser } from "@/hooks/user/useUser";
import { useSession } from "next-auth/react";

interface IUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

const SpaceOwnerDetails = () => {
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useUpdateUser();
  const searchParams = useSearchParams() 
  const session = useSession();
  const email = searchParams.get("email") || session.data?.user.email;

  const formik = useFormik<IUserDetails>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      position: "",
    },
    validationSchema: spaceOwnerDetailsValidationSchema,
    onSubmit: (values) => {
      const { firstName, email: companyEmail, lastName, position } = values;
      if (email) {
        mutate({
          email,
          companyEmail,
          firstname: firstName,
          lastname: lastName,
          position,
        });
      }
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

        <InputField
          name="email"
          label="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
        />

        <SelectField
          value={formik.values.position}
          name="position"
          label="Position"
          options={position}
          onChange={(e) => formik.setFieldValue("position", e.target.value)}
          onBlur={formik.handleBlur}
          error={
            formik.touched.position && formik.errors.position
              ? formik.errors.position
              : null
          }
        />

        <Button
          css="mt-2"
          style="primary"
          type="submit"
          loading={isPending}
          disabled={isPending || Object.keys(formik.errors).length > 0}
        >
          Continue
        </Button>
      </form>
    </>
  );
};

export default SpaceOwnerDetails;
