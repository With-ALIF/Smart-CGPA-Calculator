export default function StatsCards({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => (
        <div key={item.label} className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900/70 dark:shadow-black/10">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.label}</p>
            <div className="rounded-2xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <item.icon size={18} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
