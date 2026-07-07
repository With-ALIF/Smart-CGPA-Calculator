
export default function SemesterInputs({ totalSemesters, semesterGpas, validationErrors, updateSemesterGpa }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: totalSemesters }, (_, index) => {
        const value = semesterGpas[index];
        const error = validationErrors[index];
        return (
          <label key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/80">
            <div className="mb-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Semester {index + 1} GPA</p>
            </div>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="4"
              step="0.01"
              value={value}
              onChange={(event) => updateSemesterGpa(index, event.target.value)}
              placeholder="0.00"
              className={`w-full rounded-3xl border px-4 py-3 text-lg font-semibold outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:bg-slate-950 dark:text-white ${error ? 'border-rose-400 bg-rose-50/40 focus:border-rose-400 focus:ring-rose-200' : 'border-slate-200 bg-white dark:border-slate-700'}`}
            />
            {error ? <p className="mt-2 text-xs text-rose-600 dark:text-rose-300">{error}</p> : null}
          </label>
        );
      })}
    </div>
  );
}
