import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

function GradeDistribution({ distribution }) {
  const grades = Object.entries(distribution);
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Grade Distribution</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Count of each grade in your selection.</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 p-2 text-white">
          <BarChart3 size={18} />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {grades.map(([grade, count]) => (
          <motion.div key={grade} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800/80">
            <span className="font-medium">{grade}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-700 dark:text-slate-200">× {count}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default GradeDistribution;
