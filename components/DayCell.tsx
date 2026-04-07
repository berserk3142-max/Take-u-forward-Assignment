import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday } from "date-fns";
import { motion } from "framer-motion";
import { isHoliday } from "@/utils/dateUtils";

interface DayCellProps {
  day: Date;
  isCurrentMonth: boolean;
  isInRange: boolean;
  isStart: boolean;
  isEnd: boolean;
  onClick: () => void;
  onHover: () => void;
}

export function DayCell({ day, isCurrentMonth, isInRange, isStart, isEnd, onClick, onHover }: DayCellProps) {
  const isSelected = isStart || isEnd;
  const isDayHoliday = isHoliday(day);
  const isMiddleRange = isInRange && !isSelected;
  
  return (
    <motion.button
      whileHover={{ scale: isMiddleRange ? 1 : 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseEnter={onHover}
      className={twMerge(
        clsx(
          "relative h-12 w-full md:h-[4.5rem] flex flex-col items-center justify-center font-medium transition-colors border border-transparent text-sm md:text-base",
          // Out of month days (clickable but visually distinct)
          !isCurrentMonth && "text-slate-300 hover:bg-slate-50 rounded-xl",
          // Normal current month days
          isCurrentMonth && !isSelected && !isInRange && "bg-transparent text-slate-800 hover:bg-slate-100/80 rounded-xl",
          // Range and Selection
          isMiddleRange && "bg-blue-50 text-blue-800 font-semibold rounded-none",
          isStart && "bg-blue-600 text-white rounded-l-xl rounded-r-none shadow-md hover:bg-blue-700 z-10",
          isEnd && "bg-blue-600 text-white rounded-r-xl rounded-l-none shadow-md hover:bg-blue-700 z-10",
          (isStart && isEnd) && "rounded-xl",
          // Today marker logic
          isToday(day) && !isSelected && !isInRange && "border-[1.5px] border-blue-400 bg-blue-50/30 text-blue-700"
        )
      )}
    >
      <span className="z-10">{format(day, "d")}</span>
      {isDayHoliday && isCurrentMonth && (
        <span className="absolute bottom-1.5 md:bottom-2 w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
      )}
    </motion.button>
  );
}
