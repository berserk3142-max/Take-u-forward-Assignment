"use client";

import { useMemo } from "react";
import { isSameMonth } from "date-fns";
import { DayCell } from "./DayCell";
import { getCalendarGridDays } from "@/utils/dateUtils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  currentMonth: Date;
  isInRange: (day: Date) => boolean;
  isStart: (day: Date) => boolean;
  isEnd: (day: Date) => boolean;
  onDateClick: (day: Date) => void;
  onDateHover: (day: Date) => void;
}

export function CalendarGrid({
  currentMonth,
  isInRange,
  isStart,
  isEnd,
  onDateClick,
  onDateHover,
}: CalendarGridProps) {
  const days = useMemo(() => getCalendarGridDays(currentMonth), [currentMonth]);

  return (
    <div className="w-full bg-white/70 backdrop-blur-2xl rounded-3xl p-5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 shadow-slate-200/50">
      <div className="grid grid-cols-7 mb-4 md:mb-6">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center font-bold text-slate-400 text-[10px] md:text-xs tracking-widest uppercase">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 lg:gap-y-2">
        {days.map((day) => (
          <DayCell
            key={day.toISOString()}
            day={day}
            isCurrentMonth={isSameMonth(day, currentMonth)}
            isInRange={isInRange(day)}
            isStart={isStart(day)}
            isEnd={isEnd(day)}
            onClick={() => onDateClick(day)}
            onHover={() => onDateHover(day)}
          />
        ))}
      </div>
    </div>
  );
}
