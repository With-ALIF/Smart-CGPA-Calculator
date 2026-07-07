import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/auth';
import { supabase } from '../services/supabase';
import { User, Mail, Save, Loader } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ full_name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      supabase.from('users').select('*').eq('id', user.id).single().then(({ data, error }) => {
        if (!error && data) {
          setProfile({
            full_name: data.full_name || '',
            email: data.email || user.email
          });
        }
        setLoading(false);
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const { error } = await updateProfile({
      full_name: profile.full_name
    });

    setSaving(false);
    if (error) {
      setMessage('Failed to update profile.');
    } else {
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader size={40} className="animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">User Profile</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage your personal information and preferences</p>
          </div>
        </div>

        {message && (
          <div className={`mb-6 rounded-xl p-4 text-sm ${message.includes('successfully') ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Mail size={16} /> Email Address
            </label>
            <input 
              type="email" 
              readOnly
              value={profile.email}
              className="w-full cursor-not-allowed rounded-xl border-0 bg-slate-100 px-4 py-3 text-slate-500 shadow-inner ring-1 ring-inset ring-slate-200/60 dark:bg-slate-800/80 dark:text-slate-400 dark:ring-slate-700"
            />
            <p className="mt-1 text-xs text-slate-500">Email cannot be changed.</p>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <User size={16} /> Full Name
            </label>
            <input 
              type="text" 
              required
              value={profile.full_name}
              onChange={(e) => setProfile({...profile, full_name: e.target.value})}
              className="w-full rounded-xl border-0 bg-slate-100/50 px-4 py-3 text-slate-700 placeholder-slate-400 shadow-inner ring-1 ring-inset ring-slate-200/60 focus:bg-white focus:ring-2 focus:ring-brand-500 dark:bg-slate-800/50 dark:text-slate-100 dark:ring-slate-700 dark:focus:bg-slate-800"
              placeholder="John Doe"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 font-medium text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 disabled:opacity-70"
            >
              {saving ? <Loader size={20} className="animate-spin" /> : <Save size={20} />}
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}
