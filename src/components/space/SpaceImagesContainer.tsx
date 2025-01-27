import React, { useState, useCallback } from "react";
import Image from "next/image";

interface SpaceImagesContainerProps {
  images: { url: string; _id: string }[];
  spaceName?: string;
}

const SpaceImagesContainer: React.FC<SpaceImagesContainerProps> = ({
  images = [],
  spaceName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  // Handle image click to open modal
  const openImageModal = useCallback((image: string) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  }, []);

  // Handle keyboard navigation in the modal
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!images.length) return;

    const currentIndex = images.findIndex((img) => img.url === currentImage);
    if (event.key === "ArrowLeft") {
      setCurrentImage(images[(currentIndex - 1 + images.length) % images.length]?.url);
    } else if (event.key === "ArrowRight") {
      setCurrentImage(images[(currentIndex + 1) % images.length]?.url);
    } else if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  // Render slider dot class dynamically
  const getDotClass = (isActive: boolean) =>
    `h-3 w-3 cursor-pointer rounded-full ${
      isActive ? "bg-white border-white" : "bg-gray-400 border-gray-400"
    }`;

  // Handle empty images case
  if (!images.length) {
    return <div className="text-center text-gray-500">No images available</div>;
  }

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-2">
        <Image
          src={images && images?.[0]?.url || "/assets/placeholder-image.png"}
          alt={spaceName || "Space"}
          width={800}
          height={400}
          className="object-cover h-[400px] w-full rounded-md"
        />
        <div className="grid grid-cols-2 gap-1">
          {images.slice(1).map((image, idx) => (
            <Image
              key={image._id}
              src={image.url || "/assets/placeholder-image.png"}
              alt={`Image ${idx + 2}`}
              width={400}
              height={200}
              className="object-cover w-full h-[200px] rounded-md cursor-pointer"
              onClick={() => openImageModal(image.url)}
              loading="lazy"
              onError={(e) => (e.currentTarget.src = "/assets/placeholder-image.png")}
            />
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden relative h-[300px] w-full overflow-hidden rounded-lg">
        {/* Display the active image */}
        <Image
          src={currentImage || images?.[0]?.url || "/assets/placeholder-image.png"}
          alt={spaceName || "Space"}
          width={1000}
          height={1000}
          className="h-full w-full object-cover object-center"
          onError={(e) => (e.currentTarget.src = "/assets/placeholder-image.png")}
        />
        {/* Mobile Image Slider */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((image) => (
            <div
              key={image._id}
              onClick={() => setCurrentImage(image.url)}
              className={getDotClass(currentImage === image.url)}
            ></div>
          ))}
        </div>
      </div>

      {/* Modal for Fullscreen Image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Image Modal"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className="relative">
            <Image
              src={currentImage || "/assets/placeholder-image.png"}
              alt="Fullscreen Image"
              width={800}
              height={600}
              className="object-contain max-w-full max-h-screen"
              onError={(e) => (e.currentTarget.src = "/assets/placeholder-image.png")}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceImagesContainer;
