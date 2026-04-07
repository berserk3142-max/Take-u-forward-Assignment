"use client";

import { useState } from "react";
import { addMonths, subMonths, format } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";

import { useDateRange } from "@/hooks/useDateRange";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";
import { HeroImage } from "./HeroImage";

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const {
    startDate,
    endDate,
    hoverDate,
    setHoverDate,
    handleDateClick,
    isInRange,
    isStart,
    isEnd,
  } = useDateRange();

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const resetToToday = () => setCurrentMonth(new Date());

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-8 lg:p-10 min-h-screen flex flex-col font-sans">
      {/* Premium Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-10 gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <CalendarIcon className="text-white w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Wall Calendar</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium tracking-wide">Premium Workspace Component</p>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-2 md:gap-4 bg-white/70 backdrop-blur-xl p-2 rounded-2xl shadow-sm border border-white/50 w-full md:w-auto overflow-x-auto">
          <button
            onClick={resetToToday}
            className="px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex-shrink-0"
          >
            Today
          </button>
          <div className="h-6 w-px bg-slate-200 flex-shrink-0"></div>
          <div className="flex items-center gap-1 flex-1 justify-between md:justify-center">
            <button 
              onClick={handlePrevMonth}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <span className="w-32 md:w-40 text-center font-bold text-slate-700 text-sm md:text-base tracking-wide flex-shrink-0">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <button 
              onClick={handleNextMonth}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1"
      >
        {/* Left Column: Hero Image (3/12 width) */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <HeroImage currentMonth={currentMonth} />
        </div>

        {/* Middle Column: Calendar Grid (5/12 width) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <CalendarGrid
            currentMonth={currentMonth}
            isInRange={isInRange}
            isStart={isStart}
            isEnd={isEnd}
            onDateClick={handleDateClick}
            onDateHover={setHoverDate}
          />
        </div>

        {/* Right Column: Notes (4/12 width) */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <NotesPanel startDate={startDate} endDate={endDate} />
        </div>
      </motion.div>
    </div>
  );
}
