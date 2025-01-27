"use client";
import React from "react";
import { useFormik } from "formik";
// import { toast } from "sonner";
import Link from "next/link";

import { loginRoute } from "@/utils/Routes";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import * as Yup from "yup";
import { useForgetpassword } from "@/hooks/useAuthHooks";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  // const router = useRouter();
  const {mutate,isPending} = useForgetpassword(); 
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      mutate(values);

    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
        />

        <Button
          css="mt-2"
          style="primary"
          type="submit"
          loading={isPending}
          disabled={
            isPending || Object.keys(formik.errors).length > 0
          }
        >
          Send reset link
        </Button>
      </form>

      <div className="mt-4">
        <div className="mt-8">
          <p className="text-center">
            Already have an account ?{" "}
            <Link
              href={loginRoute}
              className="font-bold text-text-strong underline underline-offset-2"
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
