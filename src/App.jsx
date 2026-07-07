import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import GradeInfoModal from './components/GradeInfoModal';
import Footer from './components/Footer';
import { gradeScale, defaultRows, createEmptyRows } from './data/grades';
import CalculatorPage from './pages/CalculatorPage';
import ToolsPage from './pages/ToolsPage';

const STORAGE_KEY = 'cgpa-calculator-state';

function App() {
  const [subjectCount, setSubjectCount] = useState(5);
  const [rows, setRows] = useState(defaultRows(5));
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.subjectCount) setSubjectCount(parsed.subjectCount);
        if (parsed.rows) setRows(parsed.rows);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ subjectCount, rows }));
  }, [subjectCount, rows]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('cgpa-theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('cgpa-theme', theme);
  }, [theme]);

  const handleSubjectCountChange = (count) => {
    setSubjectCount(count);
    setRows(createEmptyRows(count));
  };

  const updateRow = (index, key, value) => {
    setRows((prev) => prev.map((row, rowIndex) => (rowIndex === index ? { ...row, [key]: value } : row)));
  };

  const resetCalculator = () => {
    setSubjectCount(5);
    setRows(defaultRows(5));
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

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-transparent text-slate-900 transition-colors duration-300 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} openInfo={() => setIsInfoOpen(true)} />
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
            <Link to="/" className={`rounded-full px-4 py-2 text-sm font-medium transition ${isHome ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'}`}>
              Calculator
            </Link>
            <Link to="/tools" className={`rounded-full px-4 py-2 text-sm font-medium transition ${!isHome ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'}`}>
              Tools
            </Link>
          </div>
        </nav>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<CalculatorPage subjectCount={subjectCount} rows={rows} onCountChange={handleSubjectCountChange} onRowChange={updateRow} onReset={resetCalculator} metrics={metrics} />} />
            <Route path="/tools" element={<ToolsPage />} />
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