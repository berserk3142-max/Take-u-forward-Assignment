import { startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, format } from "date-fns";

export function getCalendarGridDays(date: Date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  
  // To always align the grid to Sunday as the first day of the week
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
}

// Fixed set of sample holidays for the premium calendar feature
export const HOLIDAYS = [
  "2026-01-01", // New Year
  "2026-01-26", // Republic Day
  "2026-08-15", // Independence Day
  "2026-10-02", // Gandhi Jayanti
  "2026-12-25", // Christmas
];

export function isHoliday(date: Date) {
  return HOLIDAYS.includes(format(date, "yyyy-MM-dd"));
}
