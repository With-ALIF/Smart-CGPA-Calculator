export const STORAGE_KEY = 'cgpa-semester-planner-state';
export const SEMESTER_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9, 10];
export const DEFAULT_SEMESTERS = 8;

export const formatValue = (value) => (Number.isFinite(value) ? value.toFixed(2) : '—');

export const parseGpa = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const statusLabel = (gpa) => {
  if (gpa === null) return 'Pending';
  if (gpa >= 3.75) return 'Excellent';
  if (gpa >= 3.5) return 'Very Good';
  if (gpa >= 3.0) return 'Good';
  if (gpa >= 2.5) return 'Average';
  return 'Needs Improvement';
};

export const statusColor = (gpa) => {
  if (gpa === null) return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200';
  if (gpa >= 3.75) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200';
  if (gpa >= 3.5) return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200';
  if (gpa >= 3.0) return 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200';
  if (gpa >= 2.5) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200';
  return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200';
};

export const trendLabel = (values) => {
  if (!values || values.length < 2) {
    return 'Not enough data';
  }

  const last = values[values.length - 1];
  const previous = values[values.length - 2];

  if (last > previous) return 'Improving';
  if (last < previous) return 'Declining';

  return 'Stable';
};
