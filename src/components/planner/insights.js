import { formatValue } from './constants';

export const getPlannerSuggestion = ({ completedSemesters, currentCgpa, hasTarget, requiredGpa }) => {
  if (completedSemesters === 0) return 'Start entering semester GPAs to see your academic trajectory.';
  if (hasTarget && requiredGpa !== null && requiredGpa > 4) {
    return 'Your target is above the maximum achievable GPA. Consider a more realistic target or improve early semester performance.';
  }
  if (currentCgpa >= 3.75) return 'You are performing at an excellent level. Keep the momentum going with consistent study habits.';
  if (currentCgpa >= 3.5) return 'You are strong academically. Focus on maintaining consistent scores in remaining semesters.';
  if (currentCgpa >= 3.0) return 'You are in a very good position. Target higher marks in the remaining semesters to reach your goal.';
  return 'A stronger study plan and better semester preparation can help raise your CGPA next term.';
};

export const getInsightMessage = ({ highestGpa, lowestGpa, performanceTrend, hasTarget, requiredGpa }) => {
  const best = highestGpa ? `Best semester: ${formatValue(highestGpa)}.` : '';
  const worst = lowestGpa ? ` Weakest semester: ${formatValue(lowestGpa)}.` : '';
  const effort = hasTarget && requiredGpa !== null
    ? requiredGpa > 4
      ? 'Target is currently out of reach. Focus on strong grades and reassess your plan.'
      : `You need an average of ${formatValue(requiredGpa)} in remaining semesters.`
    : 'Maintain your current pace to sustain this performance.';
  return `${best}${worst} ${performanceTrend}. ${effort}`;
};
