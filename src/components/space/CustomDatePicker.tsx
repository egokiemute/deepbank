"use client";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface CustomDatePickerProps {
  label: string;
  onDateChange?: (date: string) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const today: Dayjs = dayjs();
  const currentMonth: Dayjs = dayjs();
  const nextMonth: Dayjs = currentMonth.add(1, "month");

  const generateDaysForMonth = (month: Dayjs): number[] => {
    const daysInMonth = month.daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const handleDateSelection = (day: number, month: Dayjs) => {
    const selected = dayjs()
      .set("month", month.month())
      .set("year", month.year())
      .set("date", day)
      .format("YYYY-MM-DD");

    console.log("Selected Date:", selected); // Debugging: log the selected date
    if (!dayjs(selected).isValid()) {
      console.error("Invalid date format:", selected); // Debugging: log invalid dates
      return;
    }

    setSelectedDate(selected);
    setShowCalendar(false);

    if (onDateChange) {
      onDateChange(selected);
    }
  };

  const isPastDate = (day: number, month: Dayjs): boolean => {
    const date = dayjs()
      .set("month", month.month())
      .set("year", month.year())
      .set("date", day);
    return date.isBefore(today, "day");
  };

  return (
    <div className="relative">
      <label className="text-sm mb-2 block font-medium text-gray-700">
        {label}
      </label>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Pick a date"
        value={selectedDate}
        onFocus={() => setShowCalendar(!showCalendar)}
        readOnly
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="shadow-lg absolute top-full z-50 mt-2 w-full rounded-lg border border-gray-300 bg-white p-4">
          <div className="hide-scroll scrollable flex space-x-8 overflow-x-auto py-2">
            {/* Current Month */}
            <div className="min-w-[50%] flex-shrink-0">
              <h3 className="text-lg mb-4 text-center font-medium">
                {currentMonth.format("MMMM YYYY")}
              </h3>
              <div className="grid grid-cols-7 gap-4">
                {generateDaysForMonth(currentMonth).map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDateSelection(day, currentMonth)}
                    disabled={isPastDate(day, currentMonth)}
                    className={`text-sm h-10 w-10 rounded-full p-2 transition-all duration-150 ${
                      isPastDate(day, currentMonth)
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : "bg-gray-200 text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Month */}
            <div className="min-w-[50%] flex-shrink-0">
              <h3 className="text-lg mb-4 text-center font-medium">
                {nextMonth.format("MMMM YYYY")}
              </h3>
              <div className="grid grid-cols-7 gap-4">
                {generateDaysForMonth(nextMonth).map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDateSelection(day, nextMonth)}
                    disabled={isPastDate(day, nextMonth)}
                    className={`text-sm h-10 w-10 rounded-full p-2 transition-all duration-150 ${
                      isPastDate(day, nextMonth)
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : "bg-gray-200 text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
