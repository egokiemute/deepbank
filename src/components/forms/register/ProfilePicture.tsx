import Button from "@/components/ui/Button";
import { useUploadProfilePicture } from "@/hooks/user/useUser";
import { loginRoute } from "@/utils/Routes";
import { SquarePen, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfilePicture = () => {
  const router = useRouter();
  const session = useSession();
  const [preview, setPreview] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || session.data?.user.email;

  const [file, setFile] = useState<File | null>(null); // Store the file object
  const { mutate, isPending, isSuccess } = useUploadProfilePicture();

  console.log(session);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile); // Store the file
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string); // Display the preview
      };
      reader.readAsDataURL(selectedFile); // Read the file as base64
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Call the mutation to upload the profile picture
        if (email) {
          mutate({ email, profilePicture: base64String }); // Replace with the actual email
        } else {
          toast.error("Email is missing.");
        }
      };
      reader.readAsDataURL(file); // Convert the file to base64
    } else {
      toast.error("Please select a file.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile picture uploaded successfully!");

      // Check session exists and is authenticated
      if (session?.data?.user) {
        router.push("/");
      } else {
        router.push(loginRoute);
      }
    }
  }, [isSuccess, session, router]);

  return (
    <form className="w-full" onSubmit={handleUpload}>
      <div className="relative mx-auto w-fit">
        <div className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-full bg-[#0000000F]">
          {preview ? (
            <Image
              className="h-full w-full object-cover"
              src={preview}
              height={208} // Adjusted to match container size (52 * 4)
              width={208}
              alt="Profile Picture Preview"
            />
          ) : (
            <User size={100} className="text-[#00000066]" />
          )}
        </div>
        <div className="absolute bottom-2 right-2">
          <label
            htmlFor="profile-pic"
            className="flex h-12 w-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#F15A2A] font-medium shadow-raised transition duration-150"
          >
            <SquarePen className="text-[#FFFFFF8F]" size={24} />
          </label>
          <input
            id="profile-pic"
            name="profile-pic"
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      <Button
        css="mt-20 w-full"
        style="primary"
        type="submit"
        loading={isPending}
      >
        Upload Profile Picture
      </Button>
      <div className="">
        {session.status === "authenticated" ? (
          <Link
            href={loginRoute}
            className="mx-auto mt-4 block w-fit p-3 text-center text-title-md font-bold underline underline-offset-2"
          >
            Skip
          </Link>
        ) : (
          <Link
            href={loginRoute}
            className="mx-auto mt-4 block w-fit p-3 text-center text-title-md font-bold underline underline-offset-2"
          >
            Skip
          </Link>
        )}
      </div>
    </form>
  );
};

export default ProfilePicture;
