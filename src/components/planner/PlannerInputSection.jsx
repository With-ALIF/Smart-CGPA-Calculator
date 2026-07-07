function SemesterGpaDisplay({ totalSemesters, semesterGpas }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: totalSemesters }, (_, index) => {
        const semesterNo = index + 1;
        const gpa = semesterGpas[index];
        const hasGpa = gpa !== '' && gpa !== null && gpa !== undefined;

        return (
          <div key={semesterNo} className="space-y-1.5">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Semester {semesterNo}</p>
            <div className="flex h-[46px] items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 dark:border-slate-700 dark:bg-slate-800/50">
              <p className={`text-sm font-semibold ${hasGpa ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}`}>
                {hasGpa ? Number(gpa).toFixed(2) : 'N/A'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PlannerInputSection({ totalSemesters, semesterGpas, disabled }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Semester-wise GPA</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {disabled ? 'Please add subjects in the main calculator first.' : 'GPAs are automatically fetched from the calculator.'}
          </p>
        </div>
      </div>
      {disabled ? (
        <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-10 dark:border-slate-700 dark:bg-slate-800/30">
          <p className="text-center font-medium text-slate-500 dark:text-slate-400">
            Please go to the main calculator and add subjects to view semester GPAs.
          </p>
        </div>
      ) : (
        <SemesterGpaDisplay totalSemesters={totalSemesters} semesterGpas={semesterGpas} />
      )}
    </div>
  );
}
