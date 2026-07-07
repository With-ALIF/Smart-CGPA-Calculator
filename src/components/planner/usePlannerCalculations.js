import { useMemo } from 'react';

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

  const highestGpaSemester = useMemo(() => {
    if (completedSemesters === 0 || highestGpa === null) return null;
    const index = semesterValues.findIndex((val) => val === highestGpa);
    return index !== -1 ? index + 1 : null;
  }, [completedSemesters, highestGpa, semesterValues]);

  const lowestGpaSemester = useMemo(() => {
    if (completedSemesters === 0 || lowestGpa === null) return null;
    const index = semesterValues.findIndex((val) => val === lowestGpa);
    return index !== -1 ? index + 1 : null;
  }, [completedSemesters, lowestGpa, semesterValues]);

  return {
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
    completedSum,
  };
}
