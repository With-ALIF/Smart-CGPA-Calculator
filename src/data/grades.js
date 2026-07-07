export const gradeScale = {
  'A+': { gpa: 4.0, label: 'A+ (4.00)' },
  A: { gpa: 3.75, label: 'A (3.75)' },
  'A-': { gpa: 3.5, label: 'A- (3.50)' },
  'B+': { gpa: 3.25, label: 'B+ (3.25)' },
  B: { gpa: 3.0, label: 'B (3.00)' },
  'B-': { gpa: 2.75, label: 'B- (2.75)' },
  'C+': { gpa: 2.5, label: 'C+ (2.50)' },
  C: { gpa: 2.25, label: 'C (2.25)' },
  D: { gpa: 2.0, label: 'D (2.00)' },
  F: { gpa: 0.0, label: 'F (0.00)' },
};

export const creditOptions = [0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4];

export const createEmptyRows = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    credit: 3,
    grade: '',
  }));

export const defaultRows = (count) => createEmptyRows(count);

export const formatNumber = (value) => Number(value).toFixed(2);

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
