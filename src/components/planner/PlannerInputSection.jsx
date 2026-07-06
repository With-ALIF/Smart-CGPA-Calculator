import SemesterInputs from './SemesterInputs';
import { plannerPanel } from './ui';

export default function PlannerInputSection({ totalSemesters, semesterGpas, validationErrors, updateSemesterGpa }) {
  return (
    <div className={plannerPanel}>
      <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Semester GPA Inputs</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Enter the GPAs for your completed semesters. Remaining semesters can stay empty.</p>
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
