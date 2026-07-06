export default function InsightsPanel({ insight, suggestions, hasTarget, requiredGpa, setDefaultPlanner }) {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-3 text-white">
            <span className="sr-only">Insights</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Smart Insights</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Automatic guidance based on your semester performance.</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80">
            <p className="text-sm text-slate-500 dark:text-slate-400">Insight</p>
            <p className="mt-2 font-semibold text-slate-900 dark:text-white">{insight}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80">
            <p className="text-sm text-slate-500 dark:text-slate-400">Personalized Suggestion</p>
            <p className="mt-2 text-slate-900 dark:text-slate-100">{suggestions}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80">
            <p className="text-sm text-slate-500 dark:text-slate-400">Required Effort</p>
            <p className="mt-2 font-semibold text-slate-900 dark:text-white">
              {hasTarget && requiredGpa !== null
                ? requiredGpa > 4
                  ? 'Not achievable with current data'
                  : `Average ${requiredGpa.toFixed(2)} needed`
                : 'Maintain your current pace.'}
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={setDefaultPlanner}
        className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      >
        Reset Planner
      </button>
    </div>
  );
}
