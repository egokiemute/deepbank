import React from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { loginRoute, registerRoute } from "@/utils/Routes";
import { useLoginModal } from "@/store/Modals";
import ModalLayout from "./ModalLayout";

export default function LoginModal() {
  const { closeModal, isModalOpen } = useLoginModal();
  const router = useRouter();
  return (
    <ModalLayout
      className="max-w-[576px]"
      isOpen={isModalOpen}
      onClose={() => closeModal()}
      heading="You're not logged in"
    >
      <p className="p-8 text-paragraph-lg">
        Uh-oh! It seems you&apos;re not logged in. To view your reservation and
        access all the details, please log in to your account first.
      </p>

      <div className="flex w-full gap-3 border-[1px] border-[#0000001A] px-8 py-4 max-xs:flex-col">
        <Button
          style="reverse"
          type="button"
          css="w-full"
          fn={() => router.push(registerRoute)}
        >
          Sign up
        </Button>
        <Button
          style="primary"
          type="button"
          css="w-full"
          fn={() => router.push(loginRoute)}
        >
          Login
        </Button>
      </div>
    </ModalLayout>
  );
}
