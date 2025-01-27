"use client";
import React from "react";
import InputField from "../../ui/InputField";
import { useFormik } from "formik";
import {
  isStrongPassword,
  loginValidationSchema,
} from "@/lib/validations/userValidations";
import Button from "../../ui/Button";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { ILogin } from "@/types";
import { loginRoute } from "@/utils/Routes";
import {  signIn } from "next-auth/react";
import { useRegister } from "@/hooks/useAuthHooks";
import { toast } from "sonner";

const Register = () => {
  const { mutate, isPending } = useRegister();

  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      mutate({ email, password });
    },
  });

 const handleGoogle = async () => {
   try {
     await signIn("google", {
       callbackUrl: "/", // This will be handled by the redirect callback
     });
   } catch (error) {
     console.error("Google sign-in error:", error);
     toast.error("Failed to sign in with Google");
   }
 };

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
          autoComplete="new-password" // or "current-password" based on context
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
            {!formik.values.password.includes(formik.values.email) ? (
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

        <Button
          css="mt-2"
          style="primary"
          type="submit"
          loading={isPending}
          disabled={isPending || Object.keys(formik.errors).length > 0}
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
          fn={handleGoogle}
          disabled={isPending}
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
