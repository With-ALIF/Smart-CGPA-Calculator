import { motion } from 'framer-motion';
import PlannerPage from './PlannerPage';
import { usePlannerState } from './usePlannerState';
import { usePlannerCalculations } from './usePlannerCalculations';
import { usePlannerValidation } from './usePlannerValidation';
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
    highestGpaSemester,
    lowestGpaSemester,
    requiredGpa,
    maxPossibleFinal,
    estimatedFinalCgpa,
    performanceTrend,
    academicStanding,
  } = usePlannerCalculations({ totalSemesters, semesterValues, targetFinalCgpa });

  const { validationErrors } = usePlannerValidation({ semesterGpas, semesterValues });
  const hasTarget = targetFinalCgpa !== '' && Number.isFinite(Number(targetFinalCgpa));

  const resetPlanner = () => {
    setTotalSemesters(DEFAULT_SEMESTERS);
    setSemesterGpas(Array.from({ length: DEFAULT_SEMESTERS }, () => ''));
    setTargetFinalCgpa('3.00');
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
        highestGpaSemester={highestGpaSemester}
        lowestGpaSemester={lowestGpaSemester}
        semesterGpas={semesterGpas}
        validationErrors={validationErrors}
        updateSemesterGpa={updateSemesterGpa}
        targetInfo={{ requiredGpa, maxPossibleFinal, estimatedFinalCgpa }}
        setDefaultPlanner={resetPlanner}
      />
    </motion.section>
  );
}
