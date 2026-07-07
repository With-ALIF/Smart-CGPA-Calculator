import { Info, Moon, Sparkles, Sun } from 'lucide-react';

function Header({ theme, toggleTheme, openInfo }) {
  return (
    <header className="mb-6 rounded-[32px] border border-white/70 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 p-6 text-white shadow-2xl shadow-violet-500/20 backdrop-blur-xl dark:border-slate-800/80">
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
          <button onClick={toggleTheme} className="rounded-full border border-white/30 bg-white/15 p-2.5 transition hover:bg-white/25">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
