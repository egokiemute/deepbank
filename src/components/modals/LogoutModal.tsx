import React from "react";
import Button from "../ui/Button";
import { useLogoutModal } from "@/store/Modals";
import ModalLayout from "./ModalLayout";
import { signOut } from "next-auth/react";

export default function LogoutModal() {
  const { closeModal, isModalOpen } = useLogoutModal();

  return (
    <ModalLayout
      className="max-w-[576px]"
      isOpen={isModalOpen}
      onClose={() => closeModal()}
      heading="Log out?"
    >
      <p className="p-8 text-paragraph-lg">
        Just confirming, do you really want to log out? Make sure you&quot;ve
        wrapped everything up!
      </p>
      {/* <div className="flex w-full items-end justify-end gap-3 border-[1px] border-[#0000001A] px-8 py-4"> */}
      <div className="flex w-full gap-3 border-[1px] border-[#0000001A] px-8 py-4 max-xs:flex-col">
        <Button
          style="nobg"
          type="button"
          css="w-full bg-white text-black"
          fn={() => closeModal()}
        >
          Cancel
        </Button>
        <Button
          style="danger"
          type="button"
          css="w-full bg-red-400 text-white"
          fn={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </Button>
      </div>
    </ModalLayout>
  );
}
