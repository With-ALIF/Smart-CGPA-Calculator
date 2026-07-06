import { BarChart3, TrendingDown, TrendingUp } from 'lucide-react';

export default function PerformanceCards({ performanceTrend, academicStanding }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 p-3 text-white">
          <BarChart3 size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Semester Performance</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your progress and trend based on entered semester GPAs.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/80">
          <p className="text-sm text-slate-500 dark:text-slate-400">Trend</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{performanceTrend}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/80">
          <p className="text-sm text-slate-500 dark:text-slate-400">Academic Standing</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{academicStanding}</p>
        </div>
      </div>
    </div>
  );
}
