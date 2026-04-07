import { useState } from 'react';
import { isBefore, isSameDay } from 'date-fns';

export function useDateRange() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleDateClick = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      // Start a new selection
      setStartDate(day);
      setEndDate(null);
    } else if (isSameDay(day, startDate) || isBefore(day, startDate)) {
      // If clicked date is before start date or is the same date, reset start date
      setStartDate(day);
      setEndDate(null);
    } else {
      // Set end date
      setEndDate(day);
    }
  };

  const isInRange = (day: Date) => {
    const start = startDate ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) : null;
    const end = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) : null;
    const hover = hoverDate ? new Date(hoverDate.getFullYear(), hoverDate.getMonth(), hoverDate.getDate()) : null;
    const target = new Date(day.getFullYear(), day.getMonth(), day.getDate());

    if (start && end) {
      return target > start && target < end;
    }
    if (start && hover && !end) {
      if (hover > start) {
        return target > start && target < hover;
      }
    }
    return false;
  };

  const isStart = (day: Date) => !!startDate && isSameDay(day, startDate);
  const isEnd = (day: Date) => !!endDate && isSameDay(day, endDate);

  return {
    startDate,
    endDate,
    hoverDate,
    setHoverDate,
    handleDateClick,
    isInRange,
    isStart,
    isEnd,
  };
}
