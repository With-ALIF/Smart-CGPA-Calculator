import PlannerHeaderSection from './PlannerHeaderSection';
import PlannerInputSection from './PlannerInputSection';
import PerformanceCards from './PerformanceCards';
import PlannerSummaryPanel from './PlannerSummaryPanel';

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
  semesterGpas,
  validationErrors,
  updateSemesterGpa,
  performanceTrend,
  academicStanding,
  targetInfo,
  insight,
  suggestions,
  hasTarget,
  setDefaultPlanner,
}) {
  return (
    <>
      <PlannerHeaderSection
        totalSemesters={totalSemesters}
        targetFinalCgpa={targetFinalCgpa}
        handleTotalSemestersChange={handleTotalSemestersChange}
        setTargetFinalCgpa={setTargetFinalCgpa}
        currentCgpa={currentCgpa}
        completedSemesters={completedSemesters}
        remainingSemesters={remainingSemesters}
        highestGpa={highestGpa}
        lowestGpa={lowestGpa}
        lastCalculated={Date.now()}
        onCalculate={() => null}
      />
      <PlannerInputSection
        totalSemesters={totalSemesters}
        semesterGpas={semesterGpas}
        validationErrors={validationErrors}
        updateSemesterGpa={updateSemesterGpa}
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <PerformanceCards performanceTrend={performanceTrend} academicStanding={academicStanding} />
        <PlannerSummaryPanel
          targetFinalCgpa={targetFinalCgpa}
          requiredGpa={targetInfo.requiredGpa}
          remainingSemesters={remainingSemesters}
          maxPossibleFinal={targetInfo.maxPossibleFinal}
          estimatedFinalCgpa={targetInfo.estimatedFinalCgpa}
          insight={insight}
          suggestions={suggestions}
          hasTarget={hasTarget}
          setDefaultPlanner={setDefaultPlanner}
        />
      </div>
    </>
  );
}
