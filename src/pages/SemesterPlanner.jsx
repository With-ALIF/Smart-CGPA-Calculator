import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PlannerRoot from '../components/planner/PlannerRoot';
import { useAuth } from '../context/AuthContext';
import { getSemesters } from '../services/database';
import { Loader } from 'lucide-react';

export default function SemesterPlanner() {
  const { user } = useAuth();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getSemesters(user.id).then(({ data, error }) => {
        if (!error && data) {
          setInitialData(data);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader size={40} className="animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PlannerRoot initialCloudData={initialData} />
    </motion.section>
  );
}
