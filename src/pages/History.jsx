import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSemesters, deleteSemester } from '../services/database';
import { useAuth } from '../context/AuthContext';
import { Calendar, Trash2, Edit2, Loader, AlertTriangle, X, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Delete Confirmation Modal
function DeleteModal({ semesterNo, onConfirm, onCancel, loading }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative z-10 w-full max-w-sm rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/90"
        >
          <button
            onClick={onCancel}
            className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400">
              <AlertTriangle size={32} />
            </div>
          </div>
          <h3 className="mb-2 text-center text-xl font-bold text-slate-800 dark:text-slate-100">
            Delete Semester {semesterNo}?
          </h3>
          <p className="mb-8 text-center text-sm text-slate-500 dark:text-slate-400">
            This will permanently delete Semester {semesterNo} and all its subject data. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-200 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium text-white shadow-lg shadow-red-500/30 transition hover:bg-red-600 disabled:opacity-60"
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <Trash2 size={18} />}
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Grade badge color
function gradeColor(gp) {
  const n = Number(gp);
  if (n >= 3.75) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
  if (n >= 3.0)  return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
  if (n >= 2.5)  return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
  return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
}

// Single semester card with expandable subjects
function SemesterCard({ sem, onDeleteClick }) {
  const [expanded, setExpanded] = useState(false);
  const totalCredits = sem.semester_subjects?.reduce((sum, sub) => sum + Number(sub.credit), 0) || 0;
  const hasSubjects = sem.semester_subjects && sem.semester_subjects.length > 0;

  return (
    <div className="group rounded-3xl border border-white/60 bg-white/70 shadow-lg shadow-slate-200/60 backdrop-blur-xl transition hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
      {/* Card Header */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-brand-100 p-2 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              <Calendar size={18} />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Semester {sem.semester_no}</h3>
          </div>
          <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
            <Link to="/calculator" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-600 dark:text-slate-400 dark:hover:bg-slate-800">
              <Edit2 size={16} />
            </Link>
            <button
              onClick={() => onDeleteClick(sem)}
              className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-900/20"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
            <p className="text-xs text-slate-500 dark:text-slate-400">GPA</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{sem.semester_gpa}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Credits</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalCredits.toFixed(2)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {sem.semester_subjects?.length || 0} courses · Updated {new Date(sem.updated_at).toLocaleDateString()}
          </span>
          {hasSubjects && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-900/20 transition"
            >
              {expanded ? (
                <><ChevronUp size={14} /> Hide courses</>
              ) : (
                <><ChevronDown size={14} /> View courses</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Subject List */}
      <AnimatePresence>
        {expanded && hasSubjects && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 dark:border-slate-800 px-6 pb-5 pt-4">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <BookOpen size={13} /> Course Details
              </p>
              <div className="space-y-2">
                {/* Header */}
                <div className="grid grid-cols-[1fr_80px_80px] gap-2 px-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                  <span>Course Name</span>
                  <span className="text-center">Credit</span>
                  <span className="text-center">Grade Pt.</span>
                </div>
                {/* Rows */}
                {sem.semester_subjects.map((sub) => (
                  <div
                    key={sub.id}
                    className="grid grid-cols-[1fr_80px_80px] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/50"
                  >
                    <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                      {sub.subject_name}
                    </span>
                    <span className="text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {Number(sub.credit).toFixed(2)}
                    </span>
                    <span className={`mx-auto rounded-lg px-2 py-0.5 text-xs font-bold ${gradeColor(sub.grade_point)}`}>
                      {sub.grade_point}
                    </span>
                  </div>
                ))}
                {/* Total row */}
                <div className="grid grid-cols-[1fr_80px_80px] items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2.5 dark:border-brand-800/40 dark:bg-brand-900/20">
                  <span className="text-xs font-bold text-brand-700 dark:text-brand-400">Total</span>
                  <span className="text-center text-sm font-bold text-brand-700 dark:text-brand-400">
                    {totalCredits.toFixed(2)}
                  </span>
                  <span className="text-center text-sm font-bold text-brand-700 dark:text-brand-400">
                    {sem.semester_gpa}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function History() {
  const { user } = useAuth();
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user) fetchSemesters();
  }, [user]);

  const fetchSemesters = async () => {
    setLoading(true);
    const { data, error } = await getSemesters(user.id);
    if (!error && data) setSemesters(data);
    setLoading(false);
  };

  const handleDeleteClick = (sem) => setDeleteTarget({ id: sem.id, semester_no: sem.semester_no });

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteSemester(deleteTarget.id);
    await fetchSemesters();
    setDeleting(false);
    setDeleteTarget(null);
  };

  const handleCancelDelete = () => { if (!deleting) setDeleteTarget(null); };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader size={40} className="animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <>
      {deleteTarget && (
        <DeleteModal
          semesterNo={deleteTarget.semester_no}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={deleting}
        />
      )}

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Semester History</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {semesters.length > 0 ? `${semesters.length} semester${semesters.length > 1 ? 's' : ''} saved` : ''}
            </p>
          </div>
          {semesters.length > 0 && (
            <Link to="/calculator" className="flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700">
              <Edit2 size={16} /> Add / Edit
            </Link>
          )}
        </div>

        {semesters.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/60 bg-white/70 py-20 text-center shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
            <Calendar size={48} className="mb-4 text-slate-400" />
            <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-slate-100">No History Yet</h3>
            <p className="mb-6 text-slate-500 dark:text-slate-400">Enter courses in the Calculator to save semester data.</p>
            <Link to="/calculator" className="rounded-xl bg-brand-600 px-6 py-3 font-medium text-white transition hover:bg-brand-700">
              Go to Calculator
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {semesters.map((sem) => (
              <SemesterCard key={sem.id} sem={sem} onDeleteClick={handleDeleteClick} />
            ))}
          </div>
        )}
      </motion.section>
    </>
  );
}
