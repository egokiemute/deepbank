import { getSession } from "next-auth/react";

export const verificationToken = Math.floor(
  1000 + Math.random() * 9000,
).toString();

export function splitGoogleName(fullName: string) {
  const nameParts = fullName.trim().split(" ");

  const firstName = nameParts[0]; // The first part is the first name
  const lastName = nameParts.slice(1).join(" "); // The rest are the last name

  return { firstName, lastName };
}

function calculateEndDateExcludingSundays(
  startDate: string,
  daysToAdd: number,
): string {
  // Parse the input date string into a Date object
  const date = new Date(startDate); // Start with the given date
  let daysAdded = 0; // Counter for days added, excluding Sundays

  if (typeof daysToAdd !== "number" || daysToAdd < 0) {
    throw new Error("daysToAdd must be a non-negative number.");
  }

  // If daysToAdd is 1, return the startDate as the endDate
  if (daysToAdd === 1) {
    return startDate;
  }

  // Loop to add days, excluding Sundays
  while (daysAdded < daysToAdd - 1) {
    date.setDate(date.getDate() + 1); // Move to the next day
    // Check if it's not Sunday
    if (date.getDay() !== 0) {
      daysAdded++; // Increment the counter only for non-Sundays
    }
  }

  // Format date as yyyy-mm-dd
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default calculateEndDateExcludingSundays;

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // const dayName = days[date.getUTCDay()]; // Get day name (e.g., Mon)
  const dateNumber = date.getUTCDate(); // Get date number (e.g., 27)
  const monthName = months[date.getUTCMonth()]; // Get month name (e.g., Jan)
  const year = date.getUTCFullYear(); // Get full year (e.g., 2025)

  // Add "th", "st", "nd", or "rd" to the date number
  const suffix =
    dateNumber === 1 || dateNumber === 21 || dateNumber === 31
      ? "st"
      : dateNumber === 2 || dateNumber === 22
        ? "nd"
        : dateNumber === 3 || dateNumber === 23
          ? "rd"
          : "th";

  // return `${dayName}. ${dateNumber}${suffix} ${monthName}. ${year}`;
  return `${monthName}. ${dateNumber}${suffix}, ${year}`;
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const day = String(date.getUTCDate()).padStart(2, "0"); // Get day with leading zero
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Get month with leading zero
  const year = date.getUTCFullYear(); // Get full year

  return `${day}/${month}/${year}`;
}

