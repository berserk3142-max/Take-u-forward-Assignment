"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface NotesPanelProps {
  startDate: Date | null;
  endDate: Date | null;
}

export function NotesPanel({ startDate, endDate }: NotesPanelProps) {
  // Use a string key safely derived from the date ranges
  const rangeKey = `notes_${startDate ? format(startDate, "yyyy-MM-dd") : "none"}_${
    endDate ? format(endDate, "yyyy-MM-dd") : "none"
  }`;

  const [notes, setNotes] = useLocalStorage<string>(rangeKey, "");
  // To avoid hydration mismatch errors with localStorage,
  // we render actual input strictly on client side using a mount state check
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40">
      <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1 lg:mb-2">Notes</h3>
      <p className="text-xs md:text-sm text-slate-500 mb-4 md:mb-6 font-medium tracking-wide">
        {startDate
          ? endDate
            ? `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`
            : format(startDate, "MMMM d, yyyy")
          : "Select a date range to add notes"}
      </p>

      {mounted && startDate ? (
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes or plans here..."
          className="flex-1 w-full bg-white md:bg-slate-50/50 hover:bg-white focus:bg-white transition-colors border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 rounded-2xl p-4 text-slate-700 outline-none resize-none font-medium text-sm lg:text-base leading-relaxed"
        />
      ) : (
        <div className="flex-1 w-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
          <p className="text-slate-400 text-sm font-medium">Waiting for selection...</p>
        </div>
      )}
    </div>
  );
}
