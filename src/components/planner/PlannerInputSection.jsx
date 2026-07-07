import SemesterInputs from './SemesterInputs';

export default function PlannerInputSection({ totalSemesters, semesterGpas, validationErrors, updateSemesterGpa }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Semester GPA Inputs</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Enter GPAs for completed semesters. Leave others blank.</p>
        </div>
      </div>
      <SemesterInputs
        totalSemesters={totalSemesters}
        semesterGpas={semesterGpas}
        validationErrors={validationErrors}
        updateSemesterGpa={updateSemesterGpa}
      />
    </div>
  );
}
