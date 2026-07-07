import { RotateCcw } from 'lucide-react';

export default function PlannerHeader({ onCalculate }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Semester CGPA Planner</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Plan your target GPA across semesters.
          </p>
        </div>
        <button
          type="button"
          onClick={onCalculate}
          className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          <RotateCcw size={16} />
          Reset Planner
        </button>
      </div>
    </div>
  );
}

