import { SEMESTER_OPTIONS } from './constants';

export default function PlannerControls({ totalSemesters, targetFinalCgpa, handleTotalSemestersChange, setTargetFinalCgpa }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/80">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Total Semesters</span>
          <select
            value={totalSemesters}
            onChange={(event) => handleTotalSemestersChange(Number(event.target.value))}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
          >
            {SEMESTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Target Final CGPA</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            max="4"
            step="0.01"
            placeholder="e.g. 3.50"
            value={targetFinalCgpa}
            onChange={(event) => setTargetFinalCgpa(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
          />
        </label>
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        Live calculations are updated automatically when semester GPAs are entered.
      </p>
    </div>
  );
}
