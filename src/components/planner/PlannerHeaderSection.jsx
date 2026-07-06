import PlannerHeader from './PlannerHeader';
import PlannerControls from './PlannerControls';
import PlannerTopStats from './PlannerTopStats';

export default function PlannerHeaderSection({
  totalSemesters,
  targetFinalCgpa,
  handleTotalSemestersChange,
  setTargetFinalCgpa,
  currentCgpa,
  completedSemesters,
  remainingSemesters,
  highestGpa,
  lowestGpa,
  lastCalculated,
  onCalculate,
}) {
  return (
    <div className="space-y-6">
      <PlannerHeader lastCalculated={lastCalculated} onCalculate={onCalculate} />
      <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <PlannerControls
            totalSemesters={totalSemesters}
            targetFinalCgpa={targetFinalCgpa}
            handleTotalSemestersChange={handleTotalSemestersChange}
            setTargetFinalCgpa={setTargetFinalCgpa}
          />
          <PlannerTopStats
            currentCgpa={currentCgpa}
            completedSemesters={completedSemesters}
            remainingSemesters={remainingSemesters}
            highestGpa={highestGpa}
            lowestGpa={lowestGpa}
          />
        </div>
      </div>
    </div>
  );
}
