import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_SEMESTERS, STORAGE_KEY } from './constants';

export function usePlannerState() {
  const [totalSemesters, setTotalSemesters] = useState(DEFAULT_SEMESTERS);
  const [semesterGpas, setSemesterGpas] = useState(Array.from({ length: DEFAULT_SEMESTERS }, () => ''));
  const [targetFinalCgpa, setTargetFinalCgpa] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.totalSemesters) setTotalSemesters(parsed.totalSemesters);
      if (Array.isArray(parsed?.semesterGpas)) setSemesterGpas(parsed.semesterGpas);
      if (parsed?.targetFinalCgpa !== undefined) setTargetFinalCgpa(parsed.targetFinalCgpa);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ totalSemesters, semesterGpas, targetFinalCgpa }));
  }, [totalSemesters, semesterGpas, targetFinalCgpa]);

  const semesterValues = useMemo(
    () => semesterGpas.map((value) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }),
    [semesterGpas]
  );

  const handleTotalSemestersChange = (count) => {
    setTotalSemesters(count);
    setSemesterGpas((prev) => {
      const next = prev.slice(0, count);
      while (next.length < count) next.push('');
      return next;
    });
  };

  const updateSemesterGpa = (index, value) => {
    setSemesterGpas((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  return {
    totalSemesters,
    semesterGpas,
    targetFinalCgpa,
    handleTotalSemestersChange,
    updateSemesterGpa,
    setTargetFinalCgpa,
    setTotalSemesters,
    setSemesterGpas,
    semesterValues,
  };
}
