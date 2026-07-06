import { AlertCircle } from 'lucide-react';

export default function PlannerSummary({ targetFinalCgpa, requiredGpa, remainingSemesters, maxPossibleFinal, estimatedFinalCgpa }) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50 to-cyan-50 p-5 text-slate-900 shadow-sm shadow-slate-200/40 dark:border-slate-700 dark:from-slate-800 dark:to-slate-700 dark:text-slate-100">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Required GPA Calculator</p>
        <div className="mt-4 space-y-3">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/80">
            <p className="text-sm text-slate-500 dark:text-slate-400">Completed Semesters</p>
            <p className="mt-2 text-2xl font-semibold">{remainingSemesters}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/80">
            <p className="text-sm text-slate-500 dark:text-slate-400">Required Average GPA</p>
            <p className="mt-2 text-2xl font-semibold">
              {targetFinalCgpa !== '' && requiredGpa !== null && remainingSemesters > 0 ? requiredGpa.toFixed(2) : '—'}
            </p>
          </div>
        </div>
      </div>
      {targetFinalCgpa !== '' && requiredGpa !== null && requiredGpa > 4 ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50/80 p-5 text-rose-700 shadow-sm dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-200">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-rose-200 p-2 text-rose-800 dark:bg-rose-800 dark:text-rose-200">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="font-semibold">Target Final CGPA is not achievable.</p>
              <p className="text-sm text-rose-700/90 dark:text-rose-200/90">Even with GPA 4.00 in all remaining semesters, this final CGPA cannot be reached.</p>
            </div>
          </div>
          <div className="mt-4 rounded-3xl border border-rose-200 bg-white/90 p-4 dark:border-rose-800 dark:bg-rose-900/20">
            <p className="text-sm text-slate-500 dark:text-slate-400">Maximum Possible Final CGPA</p>
            <p className="mt-2 text-2xl font-semibold">{maxPossibleFinal.toFixed(2)}</p>
          </div>
        </div>
      ) : null}
      {estimatedFinalCgpa !== null ? (
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">Estimated Final CGPA</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{estimatedFinalCgpa.toFixed(2)}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">This estimate assumes you maintain the same average GPA in remaining semesters.</p>
        </div>
      ) : null}
    </div>
  );
}
