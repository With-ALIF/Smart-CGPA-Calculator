export const STORAGE_KEY = 'cgpa-semester-planner-state';
export const SEMESTER_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9, 10];
export const DEFAULT_SEMESTERS = 8;

export const formatValue = (value) => (Number.isFinite(value) ? value.toFixed(2) : '—');

export const parseGpa = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

