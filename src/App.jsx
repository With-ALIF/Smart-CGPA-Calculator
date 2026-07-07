import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import GradeInfoModal from './components/GradeInfoModal';
import Footer from './components/Footer';
import { gradeScale, defaultRows, createEmptyRows } from './data/grades';
import CalculatorPage from './pages/CalculatorPage';
import SemesterPlanner from './pages/SemesterPlanner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import QuickCalculator from './pages/QuickCalculator';
import { useAuth } from './context/AuthContext';
import { Loader } from 'lucide-react';
import { useAutoSave } from './hooks/useAutoSave';
import { saveSemester, getSemester } from './services/database';

const STORAGE_KEY = 'cgpa-calculator-state';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center py-20"><Loader size={40} className="animate-spin text-brand-500" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [subjectCount, setSubjectCount] = useState(5);
  const [rows, setRows] = useState(defaultRows(5));
  const [currentSemester, setCurrentSemester] = useState(1);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.subjectCount) setSubjectCount(parsed.subjectCount);
        if (parsed.rows) setRows(parsed.rows);
        if (parsed.currentSemester) setCurrentSemester(parsed.currentSemester);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ subjectCount, rows, currentSemester }));
  }, [subjectCount, rows, currentSemester]);

  // Load from cloud when user or semester changes
  useEffect(() => {
    const loadCloudData = async () => {
      if (!user) return;

      const { data, error } = await getSemester(user.id, currentSemester);

      if (data && data.semester_subjects && data.semester_subjects.length > 0) {
        const cloudRows = data.semester_subjects.map(sub => ({
          id: sub.id,
          name: sub.subject_name,
          credit: sub.credit.toString(),
          grade: Object.keys(gradeScale).find(key => gradeScale[key].gpa === sub.grade_point) || '',
        }));

        const newRowCount = Math.max(5, cloudRows.length);
        const newRows = createEmptyRows(newRowCount);
        cloudRows.forEach((row, index) => {
          newRows[index] = { ...newRows[index], ...row };
        });
        setRows(newRows);
        setSubjectCount(newRowCount);
      } else {
        // No data in cloud for this semester, so reset the view
        setRows(defaultRows(5));
        setSubjectCount(5);
      }
    };
    loadCloudData();
  }, [user, currentSemester]);

  // Auto save to cloud when rows change
  useAutoSave(
    { currentSemester, rows },
    async (data) => {
      if (!user) return { error: null };
      
      const mappedSubjects = data.rows
        .filter(row => row.grade && row.credit) // Only save subjects that have a selected grade and credit
        .map(row => ({
          subject_name: row.name || `Subject ${row.id}`,
          credit: Number(row.credit),
          grade_point: row.grade ? gradeScale[row.grade].gpa : 0
        }));

      // If there are no valid subjects to save, don't do anything.
      if (mappedSubjects.length === 0) {
        return { error: null };
      }

      return await saveSemester(user.id, data.currentSemester, mappedSubjects);
    },
    1500
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('cgpa-theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('cgpa-theme', theme);
  }, [theme]);

  const handleSubjectCountChange = (count) => {
    const newCount = Number(count);
    setSubjectCount(newCount);
    setRows((prevRows) => {
      const currentCount = prevRows.length;
      if (newCount > currentCount) {
        return [...prevRows, ...createEmptyRows(newCount - currentCount)];
      }
      return prevRows.slice(0, newCount);
    });
  };

  const updateRow = (index, key, value) => {
    setRows((prev) => prev.map((row, rowIndex) => (rowIndex === index ? { ...row, [key]: value } : row)));
  };

  const resetCalculator = () => {
    setSubjectCount(5);
    setRows(defaultRows(5));
    setCurrentSemester(1);
  };

  const metrics = useMemo(() => {
    const validRows = rows.filter((row) => row.credit && row.grade);
    const totalCredits = validRows.reduce((sum, row) => sum + Number(row.credit), 0);
    const totalQualityPoints = validRows.reduce((sum, row) => sum + Number(row.credit) * gradeScale[row.grade].gpa, 0);
    const cgpa = totalCredits ? totalQualityPoints / totalCredits : 0;
    const gradePoints = validRows.map((row) => gradeScale[row.grade].gpa);
    const averageGradePoint = validRows.length ? gradePoints.reduce((a, b) => a + b, 0) / validRows.length : 0;

    return {
      totalCredits,
      totalQualityPoints,
      cgpa: Number(cgpa.toFixed(2)),
      averageGradePoint: Number(averageGradePoint.toFixed(2)),
    };
  }, [rows]);

  const isHome = location.pathname === '/calculator';
  const isTools = location.pathname === '/tools';

  return (
    <div className="min-h-screen bg-transparent text-slate-900 transition-colors duration-300 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} openInfo={() => setIsInfoOpen(true)} />
        
        {/* Navigation Bar only on root or tools */}
        {(isHome || isTools) && (
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/60 bg-white/70 px-4 py-3 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-2 text-white">
                <BookOpen size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">CGPA Studio</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/calculator" className={`rounded-full px-4 py-2 text-sm font-medium transition ${isHome ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'}`}>
                Calculator
              </Link>
              <Link to="/tools" className={`rounded-full px-4 py-2 text-sm font-medium transition ${isTools ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'}`}>
                Tools
              </Link>
            </div>
          </nav>
        )}

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/calculator" element={<CalculatorPage subjectCount={subjectCount} rows={rows} onCountChange={handleSubjectCountChange} onRowChange={updateRow} onReset={resetCalculator} metrics={metrics} currentSemester={currentSemester} onSemesterChange={setCurrentSemester} />} />
            <Route path="/tools" element={<SemesterPlanner />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sandbox" element={<QuickCalculator />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings theme={theme} setTheme={setTheme} /></ProtectedRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>

      <AnimatePresence>
        {isInfoOpen && <GradeInfoModal onClose={() => setIsInfoOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;