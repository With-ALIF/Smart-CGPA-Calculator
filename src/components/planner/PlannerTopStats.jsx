import StatsCards from './StatsCards';
import { BarChart3, CheckCircle2, TrendingDown, TrendingUp, Zap } from 'lucide-react';

export default function PlannerTopStats({ currentCgpa, completedSemesters, remainingSemesters, highestGpa, lowestGpa }) {
  return (
    <StatsCards
      stats={[
        { label: 'Current CGPA', value: currentCgpa.toFixed(2), icon: CheckCircle2 },
        { label: 'Completed Semesters', value: completedSemesters, icon: BarChart3 },
        { label: 'Remaining Semesters', value: remainingSemesters, icon: Zap },
        { label: 'Highest GPA', value: highestGpa !== null ? highestGpa.toFixed(2) : '—', icon: TrendingUp },
        { label: 'Lowest GPA', value: lowestGpa !== null ? lowestGpa.toFixed(2) : '—', icon: TrendingDown },
      ]}
    />
  );
}
