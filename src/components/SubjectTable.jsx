import { motion } from 'framer-motion';
import { Calculator, RotateCcw } from 'lucide-react';
import { creditOptions, gradeScale } from '../data/grades';

function SubjectTable({ subjectCount, rows, onCountChange, onRowChange, onReset }) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Subject Input</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Select how many subjects you want to evaluate.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Subjects</label>
          <select value={subjectCount} onChange={(e) => onCountChange(Number(e.target.value))} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium outline-none dark:border-slate-700 dark:bg-slate-900">
            {Array.from({ length: 15 }, (_, i) => i + 1).map((count) => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 hidden grid-cols-[1fr_0.5fr] gap-3 rounded-2xl bg-slate-100/80 px-4 py-3 text-sm font-semibold text-slate-600 dark:bg-slate-800/80 dark:text-slate-300 md:grid">
        <span>Subject</span>
        <span>Credit / Grade</span>
      </div>

      <div className="space-y-3">
        {rows.map((row, index) => (
          <motion.div layout key={row.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
            <div className="flex flex-col gap-3 md:grid md:grid-cols-[1fr_1fr_1fr] md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">Subject {index + 1}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Credit and grade selection</p>
                </div>
              </div>
              <select value={row.credit} onChange={(e) => onRowChange(index, 'credit', Number(e.target.value))} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900">
                {creditOptions.map((credit) => (
                  <option key={credit} value={credit}>{credit.toFixed(2)}</option>
                ))}
              </select>
              <select value={row.grade} onChange={(e) => onRowChange(index, 'grade', e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900">
                {Object.entries(gradeScale).map(([grade, { label }]) => (
                  <option key={grade} value={grade}>{label}</option>
                ))}
              </select>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01]">
          <Calculator size={16} />
          Calculate
        </button>
        <button onClick={onReset} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </section>
  );
}

export default SubjectTable;
