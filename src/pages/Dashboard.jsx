import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getSemesters } from '../services/database';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { Trophy, BookOpen, AlertCircle, TrendingUp, Calendar, Loader, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [semesters, setSemesters] = useState([]);
  const [totalSemestersLimit, setTotalSemestersLimit] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([
        getSemesters(user.id),
        supabase.from('users').select('total_semesters').eq('id', user.id).single()
      ]).then(([semRes, userRes]) => {
        if (!semRes.error && semRes.data) {
          setSemesters(semRes.data);
        }
        if (!userRes.error && userRes.data) {
          setTotalSemestersLimit(userRes.data.total_semesters || 8);
        }
        setLoading(false);
      });
    }
  }, [user]);

  const metrics = useMemo(() => {
    if (!semesters.length) return null;

    let totalQualityPoints = 0;
    let totalCredits = 0;
    let highestGpa = 0;
    let lowestGpa = 4.0;
    let highestGpaSemNo = null;
    let lowestGpaSemNo = null;
    let latestUpdate = new Date(0);

    semesters.forEach(sem => {
      const semCredits = sem.semester_subjects?.reduce((sum, sub) => sum + Number(sub.credit), 0) || 0;
      const semQP = sem.semester_subjects?.reduce((sum, sub) => sum + Number(sub.credit) * Number(sub.grade_point), 0) || 0;
      
      totalQualityPoints += semQP;
      totalCredits += semCredits;
      
      const gpa = Number(sem.semester_gpa);
      if (gpa > highestGpa) { highestGpa = gpa; highestGpaSemNo = sem.semester_no; }
      if (gpa < lowestGpa) { lowestGpa = gpa; lowestGpaSemNo = sem.semester_no; }

      const updateTime = new Date(sem.updated_at);
      if (updateTime > latestUpdate) latestUpdate = updateTime;
    });

    const currentCgpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';
    const completed = semesters.length;
    const remaining = Math.max(0, totalSemestersLimit - completed);

    return {
      currentCgpa,
      completed,
      remaining,
      highestGpa: highestGpa.toFixed(2),
      highestGpaSemNo,
      lowestGpa: lowestGpa === 4.0 && completed === 0 ? '0.00' : lowestGpa.toFixed(2),
      lowestGpaSemNo,
      latestUpdate: latestUpdate.toLocaleDateString(),
      totalSemestersLimit
    };
  }, [semesters, totalSemestersLimit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader size={40} className="animate-spin text-brand-500" />
      </div>
    );
  }

  if (!metrics) {
    return (
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-slate-100 p-6 dark:bg-slate-800">
          <BookOpen size={48} className="text-slate-400" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-100">No Data Yet</h2>
        <p className="mb-6 text-slate-500 dark:text-slate-400">Start planning your semesters to see your dashboard.</p>
        <Link to="/tools" className="rounded-xl bg-brand-600 px-6 py-3 font-medium text-white transition hover:bg-brand-700">
          Go to Planner
        </Link>
      </motion.section>
    );
  }

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Current CGPA</h3>
            <Trophy size={20} className="text-brand-500" />
          </div>
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{metrics.currentCgpa}</p>
        </div>
        
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Semesters</h3>
            <BookOpen size={20} className="text-emerald-500" />
          </div>
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{metrics.completed} <span className="text-lg text-slate-400">/ {metrics.totalSemestersLimit}</span></p>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Highest GPA</h3>
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{metrics.highestGpa}</p>
          {metrics.highestGpaSemNo && (
            <p className="mt-2 text-sm font-medium text-indigo-500 dark:text-indigo-400">Semester {metrics.highestGpaSemNo}</p>
          )}
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Lowest GPA</h3>
            <AlertCircle size={20} className="text-orange-500" />
          </div>
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{metrics.lowestGpa}</p>
          {metrics.lowestGpaSemNo && (
            <p className="mt-2 text-sm font-medium text-indigo-500 dark:text-indigo-400">Semester {metrics.lowestGpaSemNo}</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
          <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/calculator" className="flex items-center gap-3 rounded-xl bg-slate-100/50 p-4 transition hover:bg-slate-200/50 dark:bg-slate-800/50 dark:hover:bg-slate-700/50">
              <div className="rounded-lg bg-brand-100 p-2 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400"><BookOpen size={20} /></div>
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">CGPA Calculator</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Calculate & auto-save to cloud</p>
              </div>
            </Link>
            <Link to="/sandbox" className="flex items-center gap-3 rounded-xl bg-slate-100/50 p-4 transition hover:bg-slate-200/50 dark:bg-slate-800/50 dark:hover:bg-slate-700/50">
              <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"><Calculator size={20} /></div>
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">Sandbox Calculator</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Calculate offline (no database)</p>
              </div>
            </Link>
            <Link to="/tools" className="flex items-center gap-3 rounded-xl bg-slate-100/50 p-4 transition hover:bg-slate-200/50 dark:bg-slate-800/50 dark:hover:bg-slate-700/50">
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"><Calendar size={20} /></div>
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">Semester Planner</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Plan and sync all 08 semesters</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
