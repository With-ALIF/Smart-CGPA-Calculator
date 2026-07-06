import { motion } from 'framer-motion';
import SubjectTable from '../components/SubjectTable';
import ResultDashboard from '../components/ResultDashboard';
import WhatIfCalculator from '../components/WhatIfCalculator';

function CalculatorPage({ subjectCount, rows, onCountChange, onRowChange, onReset, metrics }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <SubjectTable subjectCount={subjectCount} rows={rows} onCountChange={onCountChange} onRowChange={onRowChange} onReset={onReset} />
        </div>
        <div className="space-y-6">
          <ResultDashboard metrics={metrics} />
          <WhatIfCalculator baseCgpa={metrics.cgpa} rows={rows} />
        </div>
      </div>
    </motion.section>
  );
}

export default CalculatorPage;
