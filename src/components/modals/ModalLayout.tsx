import { X } from "lucide-react";
import React, { useEffect } from "react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heading: string;
  className?: string;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  isOpen,
  onClose,
  children,
  heading,
  className,
}) => {
  // Disable scrolling on the background when the  is oLayoutpen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 h-[100vh] bg-[#00000066]"
        onClick={onClose}
      ></div>

      {/*  CardLayout */}
      <div className={`${className} z-10 w-full rounded-lg bg-white`}>
        <div className="flex items-center gap-4 p-5">
          {/* Close Icon */}
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <X className="size-4 text-[#00000066]" />
          </button>
          <h3 className="text-xl line-clamp-1 font-semibold">{heading}</h3>
        </div>
        <div className="h-[0.5px] w-full border-[1px] border-[#0000001A]" />

        {/* Card Content */}
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
