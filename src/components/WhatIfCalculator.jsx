import { useMemo, useState } from 'react';
import { Plus, Sparkles, Trash2 } from 'lucide-react';
import { gradeScale } from '../data/grades';

function WhatIfCalculator({ baseCgpa, rows }) {
  const [changes, setChanges] = useState([]);

  const addChange = () => {
    setChanges((prev) => [
      ...prev,
      {
        subjectIndex: prev.length < rows.length ? prev.length : 0,
        targetGrade: 'A',
      },
    ]);
  };

  const updateChange = (index, key, value) => {
    setChanges((prev) => prev.map((change, changeIndex) => (changeIndex === index ? { ...change, [key]: value } : change)));
  };

  const removeChange = (index) => {
    setChanges((prev) => prev.filter((_, changeIndex) => changeIndex !== index));
  };

  const result = useMemo(() => {
    const effectiveRows = rows.map((row, idx) => {
      const change = changes.find((c) => c.subjectIndex === idx);
      const grade = change ? change.targetGrade : row.grade;
      return { credit: Number(row.credit), grade };
    }).filter((r) => r.grade);

    const totalCredits = effectiveRows.reduce((sum, r) => sum + r.credit, 0);
    if (!totalCredits) return Number(baseCgpa.toFixed(2));

    const adjustedPoints = effectiveRows.reduce(
      (sum, r) => sum + r.credit * (gradeScale[r.grade]?.gpa ?? 0),
      0,
    );

    return Number((adjustedPoints / totalCredits).toFixed(2));
  }, [baseCgpa, changes, rows]);

  return (
    <section className="rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 p-2 text-white">
          <Sparkles size={18} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">What-If Calculator</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Simulate multiple grade improvements across subjects.</p>
        </div>
      </div>

      <div className="space-y-3">
        {changes.map((change, index) => {
          const currentGrade = rows[change.subjectIndex]?.grade;
          const currentLabel = currentGrade && gradeScale[currentGrade] ? gradeScale[currentGrade].label : 'Not set';
          return (
            <div key={index} className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/80 md:grid-cols-[1.5fr_1fr_1fr_auto] items-end">
              <label className="block w-full">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Subject</span>
                <select value={change.subjectIndex} onChange={(e) => updateChange(index, 'subjectIndex', Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900">
                  {rows.map((row, subjectIndex) => (
                    <option key={subjectIndex} value={subjectIndex}>{row.name || `Subject ${subjectIndex + 1}`}</option>
                  ))}
                </select>
              </label>
              <div className="w-full">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Current Grade</span>
                <div className="w-full h-[38px] flex items-center rounded-xl border border-slate-200 bg-slate-100/80 px-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-400">
                  {currentLabel}
                </div>
              </div>
              <label className="block w-full">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Change to</span>
                <select value={change.targetGrade} onChange={(e) => updateChange(index, 'targetGrade', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900">
                  {Object.entries(gradeScale)
                    .filter(([_, gradeInfo]) => {
                      if (!currentGrade) return true;
                      const currentGpa = gradeScale[currentGrade]?.gpa ?? -1;
                      return gradeInfo.gpa >= currentGpa;
                    })
                    .map(([grade, { label }]) => <option key={grade} value={grade}>{label}</option>)
                  }
                </select>
              </label>
              <button onClick={() => removeChange(index)} className="flex h-[38px] w-full items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 text-rose-600 transition hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-300 md:w-auto" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <button onClick={addChange} className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
        <Plus size={16} />
        Add another subject
      </button>

      {changes.length > 0 && (
        <div className="mt-5 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-cyan-50 p-4 dark:border-violet-800 dark:from-slate-800 dark:to-slate-700">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Estimated CGPA</p>
          <p className="mt-2 text-3xl font-semibold">{result.toFixed(2)}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">This updates the selected subjects only and recalculates your CGPA instantly.</p>
        </div>
      )}
    </section>
  );
}

export default WhatIfCalculator;
