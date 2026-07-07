import { SEMESTER_OPTIONS } from './constants';

export default function PlannerControls({ totalSemesters, targetFinalCgpa, handleTotalSemestersChange, setTargetFinalCgpa, disabled }) {
  return (
    <div className={`rounded-3xl border p-5 transition-colors ${disabled ? 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30' : 'border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/80'}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={`text-sm font-medium transition-colors ${disabled ? 'text-slate-400 dark:text-slate-500' : ''}`}>Total Semesters</span>
          <select
            value={totalSemesters}
            onChange={(event) => handleTotalSemestersChange(Number(event.target.value))}
            disabled={disabled}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
          >
            {SEMESTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className={`text-sm font-medium transition-colors ${disabled ? 'text-slate-400 dark:text-slate-500' : ''}`}>Target Final CGPA</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            max="4"
            step="0.01"
            placeholder="e.g. 3.50"
            value={targetFinalCgpa}
            onChange={(event) => setTargetFinalCgpa(event.target.value)}
            disabled={disabled}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
          />
        </label>
      </div>
      <p className={`mt-4 text-sm transition-colors ${disabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
        Updates automatically as you enter GPAs.
      </p>
    </div>
  );
}
