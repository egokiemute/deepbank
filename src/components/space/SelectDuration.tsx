import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

interface SpaceDuration {
  [key: string]: {
    price: number;
    description: string;
    days: number;
  };
}

interface SelectDurationProps {
  durations: SpaceDuration;
  label?: string;
  onDurationChange?: (selected: { key: string; days: number; price: number }) => void;
}

const Select: React.FC<{
  icon?: React.ComponentType;
  label?: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, options, value, onChange }) => {
  return (
    <div className="relative">
      {label && (
        <label className="block text-base font-medium text-[#000000E5] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full pl-4 py-2 bg-white rounded-lg border border-[#00000066] focus:outline-none text-black placeholder-gray-400 transition duration-200 appearance-none`}
        >
          <option value="" disabled>
            Choose a plan
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-[#00000066]" />
        </div>
      </div>
    </div>
  );
};

const SelectDuration: React.FC<SelectDurationProps> = ({
  durations,
  label,
  onDurationChange,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>("");

  const options = Object.entries(durations).map(([key, value]) => ({
    label: `${key.charAt(0).toUpperCase() + key.slice(1)} - ₦${value.price} (${value.description})`,
    value: key,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = e.target.value;
    setSelectedKey(selectedKey);

    if (onDurationChange && selectedKey) {
      const selectedDuration = durations[selectedKey];
      onDurationChange({
        key: selectedKey,
        days: selectedDuration.days,
        price: selectedDuration.price,
      });
    }
  };

  return (
    <div>
      <Select
        icon={ChevronDownIcon}
        label={label || "Select Duration"}
        options={options}
        value={selectedKey}
        onChange={handleChange}
      />
    </div>
  );
};

export default SelectDuration;
