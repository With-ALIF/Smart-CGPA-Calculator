import { motion } from 'framer-motion';
import PlannerPage from './PlannerPage';
import { usePlannerState } from './usePlannerState';
import { usePlannerCalculations } from './usePlannerCalculations';
import { usePlannerValidation } from './usePlannerValidation';
import { getPlannerSuggestion, getInsightMessage } from './insights';
import { DEFAULT_SEMESTERS } from './constants';

export default function PlannerRoot() {
  const {
    totalSemesters,
    semesterGpas,
    targetFinalCgpa,
    handleTotalSemestersChange,
    setTargetFinalCgpa,
    updateSemesterGpa,
    setTotalSemesters,
    setSemesterGpas,
    semesterValues,
  } = usePlannerState();

  const {
    completedSemesters,
    remainingSemesters,
    currentCgpa,
    highestGpa,
    lowestGpa,
    requiredGpa,
    maxPossibleFinal,
    estimatedFinalCgpa,
    performanceTrend,
    academicStanding,
  } = usePlannerCalculations({ totalSemesters, semesterValues, targetFinalCgpa });

  const { validationErrors } = usePlannerValidation({ semesterGpas, semesterValues });
  const hasTarget = targetFinalCgpa !== '' && Number.isFinite(Number(targetFinalCgpa));
  const insight = getInsightMessage({ highestGpa, lowestGpa, performanceTrend, hasTarget, requiredGpa });
  const suggestions = getPlannerSuggestion({ completedSemesters, currentCgpa, hasTarget, requiredGpa });

  const resetPlanner = () => {
    setTotalSemesters(DEFAULT_SEMESTERS);
    setSemesterGpas(Array.from({ length: DEFAULT_SEMESTERS }, () => ''));
    setTargetFinalCgpa('');
  };

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PlannerPage
        totalSemesters={totalSemesters}
        targetFinalCgpa={targetFinalCgpa}
        handleTotalSemestersChange={handleTotalSemestersChange}
        setTargetFinalCgpa={setTargetFinalCgpa}
        currentCgpa={currentCgpa}
        completedSemesters={completedSemesters}
        remainingSemesters={remainingSemesters}
        highestGpa={highestGpa}
        lowestGpa={lowestGpa}
        semesterGpas={semesterGpas}
        validationErrors={validationErrors}
        updateSemesterGpa={updateSemesterGpa}
        performanceTrend={performanceTrend}
        academicStanding={academicStanding}
        targetInfo={{ requiredGpa, maxPossibleFinal, estimatedFinalCgpa }}
        insight={insight}
        suggestions={suggestions}
        hasTarget={hasTarget}
        setDefaultPlanner={resetPlanner}
      />
    </motion.section>
  );
}
