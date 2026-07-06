import { RefreshCw } from 'lucide-react';

export default function PlannerHeader({ lastCalculated, onCalculate }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Semester CGPA Planner</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Calculate your current CGPA from completed semesters and find the GPA required in the remaining semesters to reach your target final CGPA.
          </p>
        </div>
        <button
          type="button"
          onClick={onCalculate}
          className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          <RefreshCw size={16} />
          Calculate
        </button>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
        Last calculated <span className="font-semibold text-slate-900 dark:text-white">{new Date(lastCalculated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
}
