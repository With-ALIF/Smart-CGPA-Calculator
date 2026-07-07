import { motion } from 'framer-motion';
import { BadgeCheck, BookText, Star, TrendingUp } from 'lucide-react';
import { formatNumber } from '../data/grades';

const cards = [
  { label: 'Final CGPA', value: (metrics) => metrics.cgpa.toFixed(2), icon: BadgeCheck },
  { label: 'Total Credit', value: (metrics) => metrics.totalCredits.toFixed(2), icon: BookText },
  { label: 'Total Quality Points', value: (metrics) => metrics.totalQualityPoints.toFixed(2), icon: TrendingUp },
  { label: 'Average Grade Point', value: (metrics) => metrics.averageGradePoint.toFixed(2), icon: Star },
];

function ResultDashboard({ metrics }) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Result Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Academic overview</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map(({ label, value, icon: Icon }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/80">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
              <div className="rounded-xl bg-white/80 p-2 text-violet-600 shadow-sm dark:bg-slate-700 dark:text-cyan-300">
                <Icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-semibold">{value(metrics)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ResultDashboard;
