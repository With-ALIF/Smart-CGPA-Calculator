import { motion } from 'framer-motion';
import PlannerRoot from '../components/planner';
import { TrendingUp } from 'lucide-react';

function ToolsPage({ metrics }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PlannerRoot />
      <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 p-2 text-white">
            <TrendingUp size={18} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Performance Profile</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Personalized insights based on your current calculations.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-brand-200/60 bg-gradient-to-br from-brand-50 to-cyan-50 p-5 text-sm text-slate-700 dark:border-brand-800/50 dark:from-slate-800 dark:to-slate-700 dark:text-slate-200">
          <p className="mb-2 font-semibold">{metrics.insight}</p>
          <p>{metrics.suggestion}</p>
        </div>
      </div>
    </motion.section>
  );
}

export default ToolsPage;
