export function usePlannerValidation({ semesterGpas, semesterValues }) {
  return {
    validationErrors: semesterValues.map((value, index) => {
      if (semesterGpas[index] === '') return null;
      if (value === null || value < 0 || value > 4) return 'Enter a value between 0.00 and 4.00.';
      return null;
    }),
  };
}
