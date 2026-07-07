export default function StatsCards({ stats }) {
  return (
    <div className="grid gap-4 grid-cols-2">
      {stats.map((item, index) => (
        <div 
          key={item.label} 
          className={`rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900/70 dark:shadow-black/10 transition-all duration-300 ${
            index === 0 ? 'col-span-2 bg-gradient-to-br from-brand-50 to-cyan-50 dark:from-slate-850 dark:to-slate-800' : ''
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.label}</p>
            <div className={`rounded-2xl p-2 ${
              index === 0 
                ? 'bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-500/20' 
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
            }`}>
              <item.icon size={18} />
            </div>
          </div>
          <p className={`mt-3 font-semibold text-slate-900 dark:text-white ${
            index === 0 ? 'text-4xl' : 'text-2xl'
          }`}>{item.value}</p>
          {item.subtitle && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>}
        </div>
      ))}
    </div>
  );
}

