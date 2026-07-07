import { RotateCcw } from 'lucide-react';

export default function PlannerHeader({ onCalculate }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Semester CGPA Planner</h1>
        </div>
      </div>
    </div>
  );
}

