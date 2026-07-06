import PlannerSummary from './PlannerSummary';
import InsightsPanel from './InsightsPanel';

export default function PlannerSummaryPanel({
  targetFinalCgpa,
  requiredGpa,
  remainingSemesters,
  maxPossibleFinal,
  estimatedFinalCgpa,
  insight,
  suggestions,
  hasTarget,
  setDefaultPlanner,
}) {
  return (
    <div className="space-y-6">
      <PlannerSummary
        targetFinalCgpa={targetFinalCgpa}
        requiredGpa={requiredGpa}
        remainingSemesters={remainingSemesters}
        maxPossibleFinal={maxPossibleFinal}
        estimatedFinalCgpa={estimatedFinalCgpa}
      />
      <InsightsPanel
        insight={insight}
        suggestions={suggestions}
        hasTarget={hasTarget}
        requiredGpa={requiredGpa}
        setDefaultPlanner={setDefaultPlanner}
      />
    </div>
  );
}
