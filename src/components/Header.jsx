import { Info, Moon, Sun, User, LogOut, LayoutDashboard, CalendarClock, Settings, History } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logOut } from '../services/auth';

function Header({ theme, toggleTheme, openInfo }) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="mb-6 rounded-[32px] border border-white/70 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 p-6 text-white shadow-2xl shadow-violet-500/20 backdrop-blur-xl dark:border-slate-800/80 relative z-50">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">CGPA Studio</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={openInfo} className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium transition hover:bg-white/25">
            <Info size={16} />
            Info
          </button>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium transition hover:bg-white/25"
              >
                <User size={16} />
                Menu
              </button>
              
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                    <User size={16} /> Profile
                  </Link>
                  <Link to="/history" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                    <History size={16} /> History
                  </Link>
                  <Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                    <Settings size={16} /> Settings
                  </Link>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium transition hover:bg-white/25">
              Log In
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}

export default Header;
