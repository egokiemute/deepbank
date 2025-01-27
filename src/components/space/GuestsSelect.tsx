import React, { useState } from "react";

export interface Guests {
  justMe: number;
  team: number;
  friends: number;
  startupSpace: number;
}

interface GuestsSelectProps {
  onGuestsChange: (guests: Guests) => void;
}

const GuestsSelect: React.FC<GuestsSelectProps> = ({ onGuestsChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [guests, setGuests] = useState<Guests>({
    justMe: 1,
    team: 0,
    friends: 0,
    startupSpace: 0,
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updateGuestCount = (key: keyof Guests, increment: boolean) => {
    setGuests((prev) => {
      const updatedGuests = {
        ...prev,
        [key]: Math.max(0, prev[key] + (increment ? 1 : -1)),
      };
      // Send the updated guest counts to the parent component
      onGuestsChange(updatedGuests);
      return updatedGuests;
    });
  };

  return (
    <div className="relative">
      <label className="text-base mb-2 block font-medium text-[#000000E5]">
        Guests:
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleModal}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-black text-base flex justify-between items-center w-full"
      >
        <span className="ml-2 text-gray-500">
          {Object.values(guests).reduce((sum, count) => sum + count, 0)} Selected
        </span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-lg font-medium mb-4">Who's coming along?</h3>
          {Object.entries(guests).map(([key, count]) => (
            <div
              key={key}
              className="flex justify-between items-center mb-4 last:mb-0"
            >
              <span className="text-sm text-black capitalize">{key}</span>
              <div className="flex items-center">
                <button
                  onClick={() => updateGuestCount(key as keyof Guests, false)}
                  className="p-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                >
                  <span>-</span>
                </button>
                <span className="mx-3">{count}</span>
                <button
                  onClick={() => updateGuestCount(key as keyof Guests, true)}
                  className="p-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestsSelect;
