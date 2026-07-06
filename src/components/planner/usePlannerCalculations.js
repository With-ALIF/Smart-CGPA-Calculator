import { useMemo } from 'react';
import { statusLabel, trendLabel } from './constants';

export function usePlannerCalculations({ totalSemesters, semesterValues, targetFinalCgpa }) {
  const targetValue = useMemo(() => Number.isFinite(Number(targetFinalCgpa)) ? Number(targetFinalCgpa) : null, [targetFinalCgpa]);
  const completedValues = useMemo(() => semesterValues.filter((value) => value !== null), [semesterValues]);
  const completedSemesters = completedValues.length;
  const remainingSemesters = totalSemesters - completedSemesters;
  const completedSum = completedValues.reduce((sum, value) => sum + value, 0);
  const currentCgpa = completedSemesters ? completedSum / completedSemesters : 0;
  const highestGpa = completedSemesters ? Math.max(...completedValues) : null;
  const lowestGpa = completedSemesters ? Math.min(...completedValues) : null;

  const requiredGpa = useMemo(() => {
    if (targetValue === null || remainingSemesters <= 0) return null;
    return (targetValue * totalSemesters - completedSum) / remainingSemesters;
  }, [completedSum, targetValue, remainingSemesters, totalSemesters]);

  const maxPossibleFinal = useMemo(() => {
    if (remainingSemesters <= 0) return currentCgpa;
    return (completedSum + remainingSemesters * 4) / totalSemesters;
  }, [completedSum, currentCgpa, remainingSemesters, totalSemesters]);

  const estimatedFinalCgpa = useMemo(() => {
    if (targetFinalCgpa !== '' || completedSemesters === 0) return null;
    return currentCgpa;
  }, [completedSemesters, currentCgpa, targetFinalCgpa]);

return {
  completedSemesters,
  remainingSemesters,
  currentCgpa,
  highestGpa,
  lowestGpa,
  requiredGpa,
  maxPossibleFinal,
  estimatedFinalCgpa,
  performanceTrend: trendLabel(completedValues),
  academicStanding: statusLabel(currentCgpa),
  completedSum,
};
}
