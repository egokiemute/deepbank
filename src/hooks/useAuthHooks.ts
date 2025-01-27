import IUser, { ILogin } from "@/types";
import {
  linkSentRoute,
  otpVerifyRoute,
  resetSuccessRoute,
  selectRoleRoute,
} from "@/utils/Routes";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ErrorResponse {
  error: string;
}

interface RegisterResponse {
  message: string;
  user: IUser;
}

export const useRegister = () => {
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleRegister = async (data: ILogin) => {
    const response = await axios.post("/api/auth/register", data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    ILogin
  >({
    mutationFn: handleRegister,
    onSuccess: (data: RegisterResponse) => {
      toast.success("Otp Sent Successfully!");
      //   console.log(data);
      if (data.user) {
        const email = data.user.email;
        router.push(`${otpVerifyRoute}?email=${encodeURIComponent(email)}`); // Redirect after successful registration
      }
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};

interface OtpInput {
  email: string;
  otp: string;
}

export const useOtpVerification = () => {
  const router = useRouter();

  const handleOtpVerification = async (data: OtpInput) => {
    const response = await axios.post("/api/auth/otp/verify", data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    OtpInput
  >({
    mutationFn: handleOtpVerification,
    onSuccess: (data) => {
      toast.success("Otp Verified Successfully!");
      //   console.log(data);
      router.push(
        `${selectRoleRoute}?email=${encodeURIComponent(data.user.email)}`,
      ); // Redirect after successful registration
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};

interface ISendOtp {
  email: string;
}

//RESEND OTP
export const useSendOtp = () => {
  //   const router = useRouter();
  const handleSendOtp = async (data: ISendOtp) => {
    const response = await axios.post("/api/auth/otp/send", data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    ISendOtp
  >({
    mutationFn: handleSendOtp,
    onSuccess: (data: RegisterResponse) => {
      toast.success("Otp Sent Successfully!");
      console.log(data);
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};

interface IForgetPassword {
  email: string;
}

export const useForgetpassword = () => {
  const router = useRouter();
  const handleForgetPassword = async (data: IForgetPassword) => {
    const response = await axios.post("/api/auth/forgot-password", data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    IForgetPassword
  >({
    mutationFn: handleForgetPassword,
    onSuccess: (data: RegisterResponse) => {
      toast.success(data.message);
      router.push(linkSentRoute);
      console.log(data);
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};
interface IResetPassword {
  password: string;
  cPassword: string;
  email: string;
}

export const useResetPassword = () => {
  const router = useRouter();
  const handleForgetPassword = async (data: IResetPassword) => {
    const response = await axios.post("/api/auth/reset-password", data);
    console.log(response.data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    IResetPassword
  >({
    mutationFn: handleForgetPassword,
    onSuccess: (data: RegisterResponse) => {
      toast.success(data.message);
      router.push(resetSuccessRoute);
      // console.log(data);
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
      // console.log(error);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};
