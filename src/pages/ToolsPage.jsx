import { motion } from 'framer-motion';
import PlannerRoot from '../components/planner';

function ToolsPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PlannerRoot />
    </motion.section>
  );
}

export default ToolsPage;

