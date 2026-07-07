import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PlannerPage from './PlannerPage';
import { usePlannerState } from './usePlannerState';
import { usePlannerCalculations } from './usePlannerCalculations';
import { usePlannerValidation } from './usePlannerValidation';
import { DEFAULT_SEMESTERS } from './constants';

export default function PlannerRoot({ initialCloudData }) {
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

  // Hydrate from cloud data
  useEffect(() => {
    if (initialCloudData && initialCloudData.length > 0) {
      const gpas = Array.from({ length: totalSemesters }, () => '');
      initialCloudData.forEach((sem) => {
        if (sem.semester_no <= totalSemesters) {
          gpas[sem.semester_no - 1] = sem.semester_gpa !== null && sem.semester_gpa !== 0 ? sem.semester_gpa.toString() : '';
        }
      });
      setSemesterGpas(gpas);
    }
  }, [initialCloudData, totalSemesters, setSemesterGpas]);

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
        targetInfo={{ requiredGpa, maxPossibleFinal, estimatedFinalCgpa }}
        setDefaultPlanner={resetPlanner}
      />
    </motion.section>
  );
}
