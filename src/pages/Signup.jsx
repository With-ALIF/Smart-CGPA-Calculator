import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signUp } from '../services/auth';
import { UserPlus, Loader, Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Signup successful! You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center py-12">
      <div className="w-full max-w-md p-8 rounded-3xl border border-white/60 bg-white/70 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white">
            <UserPlus size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Create Account</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Join to enable cloud sync for your CGPA.</p>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {errorMsg}
          </div>
        )}
        
        {successMsg && (
          <div className="mb-4 rounded-xl bg-green-50 p-4 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border-0 bg-slate-100/50 px-4 py-3 text-slate-700 placeholder-slate-400 shadow-inner ring-1 ring-inset ring-slate-200/60 focus:bg-white focus:ring-2 focus:ring-brand-500 dark:bg-slate-800/50 dark:text-slate-100 dark:ring-slate-700 dark:focus:bg-slate-800"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-0 bg-slate-100/50 px-4 py-3 text-slate-700 placeholder-slate-400 shadow-inner ring-1 ring-inset ring-slate-200/60 focus:bg-white focus:ring-2 focus:ring-brand-500 dark:bg-slate-800/50 dark:text-slate-100 dark:ring-slate-700 dark:focus:bg-slate-800"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-0 bg-slate-100/50 pl-4 pr-11 py-3 text-slate-700 placeholder-slate-400 shadow-inner ring-1 ring-inset ring-slate-200/60 focus:bg-white focus:ring-2 focus:ring-brand-500 dark:bg-slate-800/50 dark:text-slate-100 dark:ring-slate-700 dark:focus:bg-slate-800"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 font-medium text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 disabled:opacity-70"
          >
            {loading ? <Loader size={20} className="animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account? <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-400">Log in</Link>
        </p>
      </div>
    </motion.section>
  );
}
