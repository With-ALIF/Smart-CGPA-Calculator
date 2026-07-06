import { useMemo, useState } from 'react';
import { Target } from 'lucide-react';

function TargetCalculator() {
  const [currentCgpa, setCurrentCgpa] = useState('3.20');
  const [completedCredit, setCompletedCredit] = useState('90');
  const [remainingCredit, setRemainingCredit] = useState('30');
  const [targetCgpa, setTargetCgpa] = useState('3.50');

  const parseNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const result = useMemo(() => {
    const current = parseNumber(currentCgpa);
    const completed = parseNumber(completedCredit);
    const remaining = parseNumber(remainingCredit);
    const target = parseNumber(targetCgpa);

    if (!completed || !remaining || !target || current < 0) {
      return { requiredGpa: 0, message: 'Enter valid values to calculate your target GPA.', achievable: false };
    }

    if (current > 4 || target > 4) {
      return { requiredGpa: 0, message: 'CGPA values must be between 0 and 4.', achievable: false };
    }

    const requiredGpa = (target * (completed + remaining) - current * completed) / remaining;
    if (requiredGpa > 4) {
      return { requiredGpa: Number(requiredGpa.toFixed(2)), message: 'Target CGPA is not achievable with the remaining credits.', achievable: false };
    }

    return {
      requiredGpa: Number(requiredGpa.toFixed(2)),
      message: `You need a GPA of ${requiredGpa.toFixed(2)} in the remaining credits.`,
      achievable: true,
    };
  }, [currentCgpa, completedCredit, remainingCredit, targetCgpa]);

  return (
    <section className="rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-2 text-white">
          <Target size={18} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Target CGPA Calculator</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Plan the GPA you need for the remaining credits.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/80">
          <span className="mb-2 block text-sm font-medium">Current CGPA</span>
          <input type="number" step="0.01" value={currentCgpa} onChange={(e) => setCurrentCgpa(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/80">
          <span className="mb-2 block text-sm font-medium">Completed Credit</span>
          <input type="number" step="0.01" value={completedCredit} onChange={(e) => setCompletedCredit(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/80">
          <span className="mb-2 block text-sm font-medium">Remaining Credit</span>
          <input type="number" step="0.01" value={remainingCredit} onChange={(e) => setRemainingCredit(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/80">
          <span className="mb-2 block text-sm font-medium">Target CGPA</span>
          <input type="number" step="0.01" value={targetCgpa} onChange={(e) => setTargetCgpa(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      <div className={`mt-5 rounded-2xl border p-4 text-sm ${result.achievable ? 'border-emerald-200 bg-emerald-50/80 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300' : 'border-rose-200 bg-rose-50/80 text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-300'}`}>
        <p className="font-semibold">Result</p>
        <p className="mt-1">{result.message}</p>
      </div>
    </section>
  );
}

export default TargetCalculator;
