import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun } from 'lucide-react';

export default function Settings({ theme, setTheme }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg">
          <SettingsIcon size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
          <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">Appearance</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`flex items-center justify-center gap-2 rounded-xl p-4 transition ${theme === 'light' ? 'bg-brand-100 text-brand-600 ring-2 ring-brand-500 dark:bg-brand-900/40 dark:text-brand-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800'}`}
            >
              <Sun size={20} /> Light
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`flex items-center justify-center gap-2 rounded-xl p-4 transition ${theme === 'dark' ? 'bg-brand-100 text-brand-600 ring-2 ring-brand-500 dark:bg-brand-900/40 dark:text-brand-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800'}`}
            >
              <Moon size={20} /> Dark
            </button>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
