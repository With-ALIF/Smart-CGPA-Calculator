import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { gradeScale } from '../data/grades';

function GradeInfoModal({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-2xl rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-2xl shadow-slate-900/20 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Grade Scale & Formula</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Reference values for every grade.</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Grade</th>
                <th className="px-4 py-3 font-semibold">GPA</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(gradeScale).map(([grade, { gpa }]) => (
                <tr key={grade} className="border-t border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-3">{grade}</td>
                  <td className="px-4 py-3">{gpa.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-cyan-50 p-4 dark:border-violet-800 dark:from-slate-800 dark:to-slate-700">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">CGPA Formula</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">CGPA = Σ(Grade Point × Credit) ÷ Σ(Credit)</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">This calculation uses the total quality points earned across all selected subjects divided by the total credit hours.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default GradeInfoModal;
