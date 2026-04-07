import { Calendar } from "@/components/Calendar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-slate-50 to-slate-100 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden relative">
      <div className="absolute top-0 left-1/4 w-3/4 h-[500px] bg-gradient-to-b from-blue-200/20 to-transparent -z-10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-indigo-200/20 to-transparent -z-10 blur-3xl pointer-events-none rounded-full" />
      <Calendar />
    </main>
  );
}
