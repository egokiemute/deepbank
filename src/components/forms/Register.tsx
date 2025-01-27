"use client";
import React from "react";
import InputField from "../ui/InputField";
import { useFormik } from "formik";
import {
  isStrongPassword,
  loginValidationSchema,
} from "@/lib/validations/userValidations";
import Button from "../ui/Button";
import { toast } from "sonner";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { ILogin } from "@/types";
import { useRouter } from "next/navigation";
import { loginRoute, otpVerifyRoute } from "@/utils/Routes";

const Register = () => {
  const router = useRouter();
  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(values.email);
        // Simulate API call or other asynchronous task
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });

        setTimeout(() => {
          toast.success("Successful");
          router.push(`${otpVerifyRoute}?email=${values.email}`);
        });
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setSubmitting(false); // End submission
      }
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

        <InputField
          name="password"
          label="Password"
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
          <ul className="text-text-negative -mt-2 flex flex-col gap-1 text-title-sm font-medium">
            {!formik.values.password && (
              <li className="text-text-negative flex items-center gap-1">
                <CircleAlert size={16} />
                <span className="">Password is required</span>
              </li>
            )}
            {isStrongPassword(formik.values.password) ? (
              <li className="text-text-positive flex items-center gap-1">
                <CircleCheck size={16} />
                <span className="">Password strength: Strong</span>
              </li>
            ) : (
              <li className="flex items-center gap-1">
                <CircleAlert size={16} />
                <span className="">Password strength: Weak</span>
              </li>
            )}
            {!formik.values.password.includes(formik.values.email) ? (
              <li className="text-text-positive flex items-center gap-1">
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
              <li className="text-text-positive flex items-center gap-1">
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
              <li className="text-text-positive flex items-center gap-1">
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

        <Button
          css="mt-2"
          style="primary"
          type="submit"
          loading={formik.isSubmitting}
          disabled={
            formik.isSubmitting || Object.keys(formik.errors).length > 0
          }
        >
          Sign up
        </Button>
      </form>

      <div className="mt-4">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[2px] w-full bg-[#0000001A]"></div>
          <div>Or</div>
          <div className="h-[2px] w-full bg-[#0000001A]"></div>
        </div>

        <Button
          css="mt-4 w-full"
          style="reverse"
          type="button"
          disabled={formik.isSubmitting}
        >
          <div className="flex items-center gap-2">
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </div>
        </Button>

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

export default Register;
