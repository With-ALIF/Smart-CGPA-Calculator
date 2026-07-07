import PlannerHeader from './PlannerHeader';
import PlannerControls from './PlannerControls';
import PlannerTopStats from './PlannerTopStats';
import PlannerInputSection from './PlannerInputSection';
import PlannerSummary from './PlannerSummary';

export default function PlannerPage({
  totalSemesters,
  targetFinalCgpa,
  handleTotalSemestersChange,
  setTargetFinalCgpa,
  currentCgpa,
  completedSemesters,
  remainingSemesters,
  highestGpa,
  lowestGpa,
  highestGpaSemester,
  lowestGpaSemester,
  semesterGpas,
  validationErrors,
  targetInfo,
  setDefaultPlanner,
}) {
  return (
    <div className="space-y-6">
      <PlannerHeader />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Right Column: Dashboard Sidebar (Shows at the top on mobile) */}
        <div className="space-y-6 order-1 lg:order-2">
          <PlannerSummary
            targetFinalCgpa={targetFinalCgpa}
            requiredGpa={targetInfo.requiredGpa}
            remainingSemesters={remainingSemesters}
            maxPossibleFinal={targetInfo.maxPossibleFinal}
            estimatedFinalCgpa={targetInfo.estimatedFinalCgpa}
          />
          
          <PlannerTopStats
            currentCgpa={currentCgpa}
            completedSemesters={completedSemesters}
            remainingSemesters={remainingSemesters}
            highestGpa={highestGpa}
            lowestGpa={lowestGpa}
            highestGpaSemester={highestGpaSemester}
            lowestGpaSemester={lowestGpaSemester}
          />

          <PlannerControls
            totalSemesters={totalSemesters}
            targetFinalCgpa={targetFinalCgpa}
            handleTotalSemestersChange={handleTotalSemestersChange}
            setTargetFinalCgpa={setTargetFinalCgpa}
            disabled={currentCgpa === 0}
          />
        </div>

        {/* Left Column: GPA Inputs (Shows below dashboard on mobile) */}
        <div className="space-y-6 order-2 lg:order-1">
          <PlannerInputSection
            totalSemesters={totalSemesters}
            semesterGpas={semesterGpas}
            disabled={currentCgpa === 0}
          />
        </div>
      </div>
    </div>
  );
}
