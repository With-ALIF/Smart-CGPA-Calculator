import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SubjectTable from '../components/SubjectTable';
import ResultDashboard from '../components/ResultDashboard';
import WhatIfCalculator from '../components/WhatIfCalculator';
import { defaultRows, createEmptyRows, gradeScale } from '../data/grades';
import { Calculator } from 'lucide-react';

export default function QuickCalculator() {
  const [subjectCount, setSubjectCount] = useState(5);
  const [rows, setRows] = useState(defaultRows(5));

  const handleSubjectCountChange = (count) => {
    const newCount = Number(count);
    setSubjectCount(newCount);
    setRows((prevRows) => {
      const currentCount = prevRows.length;
      if (newCount > currentCount) {
        return [...prevRows, ...createEmptyRows(newCount - currentCount)];
      }
      return prevRows.slice(0, newCount);
    });
  };

  const updateRow = (index, key, value) => {
    setRows((prev) => prev.map((row, rowIndex) => (rowIndex === index ? { ...row, [key]: value } : row)));
  };

  const resetCalculator = () => {
    setSubjectCount(5);
    setRows(defaultRows(5));
  };

  const metrics = useMemo(() => {
    const validRows = rows.filter((row) => row.credit && row.grade);
    const totalCredits = validRows.reduce((sum, row) => sum + Number(row.credit), 0);
    const totalQualityPoints = validRows.reduce((sum, row) => sum + Number(row.credit) * gradeScale[row.grade].gpa, 0);
    const cgpa = totalCredits ? totalQualityPoints / totalCredits : 0;
    const gradePoints = validRows.map((row) => gradeScale[row.grade].gpa);
    const averageGradePoint = validRows.length ? gradePoints.reduce((a, b) => a + b, 0) / validRows.length : 0;

    return {
      totalCredits,
      totalQualityPoints,
      cgpa: Number(cgpa.toFixed(2)),
      averageGradePoint: Number(averageGradePoint.toFixed(2)),
    };
  }, [rows]);

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-3 text-white">
          <Calculator size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Sandbox Calculator</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Calculate grades offline without saving to the database.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="order-2 lg:order-1 space-y-6">
          <SubjectTable 
            subjectCount={subjectCount} 
            rows={rows} 
            onCountChange={handleSubjectCountChange} 
            onRowChange={updateRow} 
            onReset={resetCalculator} 
          />
        </div>
        <div className="order-1 lg:order-2 space-y-6">
          <ResultDashboard metrics={metrics} />
          <WhatIfCalculator baseCgpa={metrics.cgpa} rows={rows} />
        </div>
      </div>
    </motion.section>
  );
}
