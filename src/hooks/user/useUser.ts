import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import IUser from "@/types";
import { toast } from "sonner";
import { useVariables } from "@/store/variables";
import { useRouter } from "next/navigation";
import { bookingRoute } from "@/utils/Routes";
import { filterReservation } from "@/store/Reservation";
import { useSession } from "next-auth/react";
// import { useSession } from "next-auth/react";

interface UpdateUserInput {
  email: string;
  [key: string]: string | number | boolean; // For additional update fields
}

interface UpdateUserResponse {
  message: string;
  user: IUser; // Define the user type based on your schema
  space?: string; // Add the space property
  _id: string; // Add the _id property
  url: string;
}

interface ErrorResponse {
  error: string;
}

export const useFetchUser = (email: string) => {
  const getUser = async (email: string) => {
    const params = new URLSearchParams();

    if (email) params.append("email", email);

    const url = `/api/user?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["user", email],
    queryFn: () => getUser(email),
  });
};

export const useUpdateUser = () => {
  //   const router = useRouter();
  const { data: session, update } = useSession();
  // console.log(session?.user);
  // Define the function to handle the update user API call
  const updateUser = async (data: UpdateUserInput) => {
    const response = await axios.patch<UpdateUserResponse>("/api/user", data);
    return response.data;
  };

  const updateSession = async (data: IUser) => {
    await update({
      ...session,
      user: {
        ...data,
      },
    });
    // console.log("it updated");
  };

  // Use React Query's useMutation hook
  const mutation = useMutation<
    UpdateUserResponse,
    AxiosError<ErrorResponse>,
    UpdateUserInput
  >({
    mutationFn: updateUser,
    onSuccess: (data) => {
      //   toast.success("User updated successfully!");
      // console.log(data);
      if (session) updateSession(data.user);
      // Optional: Redirect or perform other actions after success
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

// interface UploadProfilePictureInput {
//   message: string;
//   user: IUser; // Define the user type based on your schema
// }

export const useUploadProfilePicture = () => {
  //   const router = useRouter();
  const { data: session, update } = useSession();
  // Define the function to handle the update user API call
  const uploadProfilePicture = async (data: UpdateUserInput) => {
    const response = await axios.patch<UpdateUserResponse>(
      "/api/user/image/upload",
      data,
    );
    return response.data;
  };

  const updateSession = async (data: IUser) => {
    await update({
      ...session,
      user: {
        ...data,
      },
    });
    console.log("it updated");
  };

  // Use React Query's useMutation hook
  const mutation = useMutation<
    UpdateUserResponse,
    AxiosError<ErrorResponse>,
    UpdateUserInput
  >({
    mutationFn: uploadProfilePicture,
    onSuccess: (data) => {
      toast.success("Profile picture uploaded successfully!");
      console.log(data);

      if (session) updateSession(data.user);
      // console.log("Updated session:", updatedSession);
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

export const useCreateReservation = () => {
  const router = useRouter();

  const createReservation = async (data: UpdateUserInput) => {
    const response = await axios.post<UpdateUserResponse>(
      "/api/user/reservations",
      data,
    );
    return response.data;
  };

  const mutation = useMutation<
    UpdateUserResponse,
    AxiosError<ErrorResponse>,
    UpdateUserInput
  >({
    mutationFn: createReservation,
    onSuccess: (data) => {
      toast.success("Reservation created successfully!");
      console.log(data);
      router.push(bookingRoute(data?._id, data?.space ?? ""));
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  return mutation;
};

export const useUpdateReservation = () => {
  const updateReservation = async (data: UpdateUserInput) => {
    const response = await axios.patch<UpdateUserResponse>(
      "/api/user/reservations",
      data,
    );
    return response.data;
  };

  const mutation = useMutation<
    UpdateUserResponse,
    AxiosError<ErrorResponse>,
    UpdateUserInput
  >({
    mutationFn: updateReservation,
    onSuccess: (data) => {
      toast.success("Reservation updated successfully!");
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

  return mutation;
};

export const useFetchtReservations = (id?: string) => {
  const { limit, page } = useVariables(); // Ensure sensible defaults
  const { status } = filterReservation();

  const fetchAllReservation = async (
    id?: string,
    page?: number,
    limit?: number,
    status?: string,
  ) => {
    const params = new URLSearchParams();

    if (id) params.append("id", id);
    if (status) params.append("status", status);
    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString());

    const url = `/api/user/reservations?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["spaces", id, page, limit, status],
    queryFn: () => fetchAllReservation(id, page, limit, status),
  });
};
