"use client";
import React from "react";
import { useFormik } from "formik";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { useResetPassword } from "@/hooks/useAuthHooks";
import { useSearchParams } from "next/navigation";
import {
  isStrongPassword,
  resetPasswordValidationSchema,
} from "@/lib/validations/userValidations";
import { CircleAlert, CircleCheck } from "lucide-react";

const ResetPassword = () => {
  const { mutate, isPending } = useResetPassword();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const formik = useFormik({
    initialValues: {
      password: "",
      cPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values) => {
      mutate({ email, ...values });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          name="password"
          label="New password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }
        />

        {(formik.touched.password || formik.values.password) && (
          <ul className="-mt-2 flex flex-col gap-1 text-title-sm font-medium text-text-negative">
            {!formik.values.password && (
              <li className="flex items-center gap-1 text-text-negative">
                <CircleAlert size={16} />
                <span className="">Password is required</span>
              </li>
            )}
            {isStrongPassword(formik.values.password) ? (
              <li className="flex items-center gap-1 text-text-positive">
                <CircleCheck size={16} />
                <span className="">Password strength: Strong</span>
              </li>
            ) : (
              <li className="flex items-center gap-1">
                <CircleAlert size={16} />
                <span className="">Password strength: Weak</span>
              </li>
            )}

            {!formik.values.password.includes(email) ? (
              <li className="flex items-center gap-1 text-text-positive">
                <CircleCheck size={16} />
                <span className="">Can&apos;t contain your email address</span>
              </li>
            ) : (
              <li className="flex items-center gap-1">
                <CircleAlert size={16} />
                <span className="">Can&apos;t contain your email address</span>
              </li>
            )}
            {formik.values.password.length >= 8 ? (
              <li className="flex items-center gap-1 text-text-positive">
                <CircleCheck size={16} />
                <span className="">At least 8 characters</span>
              </li>
            ) : (
              <li className="flex items-center gap-1">
                <CircleAlert size={16} />
                <span className="">At least 8 characters</span>
              </li>
            )}
            {/[\d@$!%*?&]/.test(formik.values.password) ? (
              <li className="flex items-center gap-1 text-text-positive">
                <CircleCheck size={16} />
                <span className="">Contain a number or symbol</span>
              </li>
            ) : (
              <li className="flex items-center gap-1">
                <CircleAlert size={16} />
                <span className="">Contain a number or symbol</span>
              </li>
            )}
          </ul>
        )}

        <InputField
          name="cPassword"
          label="Confirm password"
          type="password"
          value={formik.values.cPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.cPassword && formik.errors.cPassword
              ? formik.errors.cPassword
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
          Change password
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
